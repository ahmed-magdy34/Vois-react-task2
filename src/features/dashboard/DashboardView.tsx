import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getPostsAPI } from "../../services/apiPosts";
import { useSelector } from "react-redux";
import PostItem from "../posts/components/ViewPosts/PostItem";
import styles from "./DashboardView.module.css";
import { RootState } from "../../store/store";
import { Post } from "../posts/postTypes";

/**dashboardView component
 * renders a list of posts created by the current user.
 * filters the posts based on the user's email.
 * utilizes the useQuery hook from react-query to fetch posts data.
 * uses the useSelector hook from react-redux to get the current user's email.
 * uses conditional rendering to display loading, error, or empty states.
 * returns a list of PostItem components for each post created by the user.
 * @component
 *
 * @returns {JSX.Element} - A list of posts created by the current user.
 */

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
