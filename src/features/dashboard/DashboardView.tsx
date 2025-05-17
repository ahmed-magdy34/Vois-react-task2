import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getPostsAPI } from "../../services/apiPosts";
import { useSelector } from "react-redux";
import PostItem from "../posts/components/ViewPosts/PostItem";
import styles from "./DashboardView.module.css";
import { RootState } from "../../store/store";
import { Post } from "../posts/postTypes";

const DashboardView = () => {
  const [filteredData, setFilteredData] = useState<Post[]>([]);
  const { data, isLoading, isError } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: getPostsAPI,
  });
  const email = useSelector((state: RootState) => state.auth.email);
  useEffect(() => {
    if (data) {
      setFilteredData(data?.filter((post: Post) => post?.email === email));
    }
  }, [data, email]);
  if (isLoading) {
    return <p>Loading posts...</p>;
  }
  if (isError) {
    return <p>Error fetching posts</p>;
  }
  if (filteredData.length === 0) {
    return <p>No posts added yet</p>;
  }
  return (
    <ul className={styles.ul}>
      <h4>No of your posts:{filteredData.length}</h4>
      {filteredData?.map((post) => (
        <PostItem key={post?.id} post={post} />
      ))}
    </ul>
  );
};

export default DashboardView;
