import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getPostsAPI } from "../../../../services/apiPosts";
import { useDispatch } from "react-redux";
import { updatePosts } from "../../postSlice";
import styles from "./PostList.module.css";
import PostItem from "./PostItem";

const PostList = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsAPI,
  });
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(updatePosts(data));
    }
  }, [data, isSuccess, dispatch]);
  if (isLoading) {
    return <p>Loading posts....</p>;
  }
  if (isError) {
    return <p>Error fetching posts</p>;
  }
  if (data?.length === 0) {
    return <p>No posts yet</p>;
  }
  return (
    <ul className={styles.ulGrid}>
      {data?.map((post) => (
        <PostItem key={post.fields.id.stringValue} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
