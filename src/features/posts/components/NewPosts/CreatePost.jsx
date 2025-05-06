import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { createPostAPI } from "../../../../services/apiPosts";
import { useSelector } from "react-redux";
import styles from "./CreatePost.module.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [contentErr, setContentErr] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (newPost) => createPostAPI(newPost, token, email),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
      navigate("/posts");
    },
  });
  const onSubmitHandler = (e) => {
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
          maxLength="10"
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
          maxLength="50"
          value={contentInput}
          onChange={(e) => setContentInput(e.target.value)}
        />
        {contentErr && <p className={styles.error}>Content is required</p>}
      </div>
      <button className={styles.submitButton}>Submit</button>
    </form>
  );
};

export default CreatePost;
