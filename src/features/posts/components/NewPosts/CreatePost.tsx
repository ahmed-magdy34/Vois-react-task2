import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { createPostAPI } from "../../../../services/apiPosts";
import { useSelector } from "react-redux";
import styles from "./CreatePost.module.css";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../store/store";

interface CreatePostData {
  title: string;
  content: string;
  url: string;
}
type CreatePostResponse = any;
const CreatePost = () => {
  const [titleInput, setTitleInput] = useState<string>("");
  const [contentInput, setContentInput] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const [titleErr, setTitleErr] = useState<boolean>(false);
  const [contentErr, setContentErr] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const email = useSelector((state: RootState) => state.auth.email);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (newPost: CreatePostData) =>
      createPostAPI(newPost, token!, email!),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
      navigate("/posts");
    },
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasErrors = false;
    if (!titleInput) {
      hasErrors = true;
      setTitleErr(true);
    }
    if (!contentInput) {
      hasErrors = true;
      setContentErr(true);
    }
    if (!hasErrors) {
      const newPost = {
        title: titleInput,
        content: contentInput,
        url: imageUrl,
      };
      mutate(newPost);
      setTitleInput("");
      setContentInput("");
    }
  };

  return (
    <form onSubmit={(e) => onSubmitHandler(e)} className={styles.formContainer}>
      <h1 className={styles.h1}>Add Post</h1>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          maxLength={10}
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
        {titleErr && <p className={styles.error}>Title is required</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <input
          type="text"
          id="content"
          name="content"
          maxLength={50}
          value={contentInput}
          onChange={(e) => setContentInput(e.target.value)}
        />
        {contentErr && <p className={styles.error}>Content is required</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="image">Image</label>
        <input
          type="url"
          name="image"
          id="image"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <button className={styles.submitButton}>Submit</button>
    </form>
  );
};

export default CreatePost;
