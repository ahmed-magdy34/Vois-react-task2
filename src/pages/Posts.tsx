import React from "react";
import PostList from "../features/posts/components/ViewPosts/PostList";

/**
 * Posts component renders the list of posts.
 * It uses the PostList component to display the posts.
 * This component is responsible for handling the display of posts.
 * It is a functional component that uses React and TypeScript.
 * it is the page where users can view all posts.
 *
 * @returns {JSX.Element}
 */

const Posts: React.FC = () => {
  return (
    <div>
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};

export default Posts;
