import React from "react";
import CreatePost from "../features/posts/components/NewPosts/CreatePost";

/**
 * it imports the CreatePost component from the features/posts/components/NewPosts directory.
 * This component is responsible for rendering the form to create a new post.
 * It is a functional component that uses React and TypeScript.
 *
 * @returns {JSX.Element}
 * @description This component renders the new post page.
 */

const NewPost: React.FC = () => {
  return (
    <div>
      <CreatePost />
    </div>
  );
};

export default NewPost;
