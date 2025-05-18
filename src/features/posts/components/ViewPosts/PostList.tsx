import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getPostsAPI } from "../../../../services/apiPosts";
import { useDispatch } from "react-redux";
import { updatePosts } from "../../postSlice";
import styles from "./PostList.module.css";
import PostItem from "./PostItem";
import { Post } from "../../postTypes";

/**
 * postList component
 * uses the useQuery hook from react-query to fetch posts data.
 * It uses the useDispatch hook from react-redux to update the posts in the Redux store.
 * It handles loading, error, and empty states.
 * It returns a list of PostItem components for each post.
 * @component
 * @returns {JSX.Element} - A list of posts.
 */

const PostList: React.FC = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: getPostsAPI,
  });
  console.log(data);
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
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
