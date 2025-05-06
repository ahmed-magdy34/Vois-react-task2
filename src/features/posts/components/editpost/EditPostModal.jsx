import React, { useEffect, useRef, useState } from "react";
import styles from "./EditPostModal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePostSDK } from "../../../../services/apiPosts";

const EditPostModal = ({ post, showModal, setShowModal }) => {
  const dialogRef = useRef(null);
  const [newTitle, setNewTitle] = useState(post?.fields?.title?.stringValue);
  const [newContent, setNewContent] = useState(
    post?.fields?.content?.stringValue
  );

  const segments = post?.name.split("/");
  const docId = segments[segments.length - 1];

  useEffect(() => {
    if (dialogRef.current) {
      if (showModal) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [showModal]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (updatedData) => updatePostSDK(docId, updatedData),

    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      alert("post updated successfully");
    },
    onError: (error) => {
      console.error("Update error:", error);
      alert("Failed to update post.");
    },
  });

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTitle || !newContent) {
      setShowModal(false);
      console.log(newContent, newTitle);
      return;
    }
    mutate({ title: newTitle, content: newContent });
    setShowModal(false);
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.modalHeader}>
        <h2>Edit Post</h2>
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleCancel}
        >
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit} method="dialog">
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            maxLength="10"
            id="title"
            defaultValue={post?.fields?.title?.stringValue}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <input
            type="text"
            name="content"
            id="content"
            maxLength="50"
            defaultValue={post?.fields?.content?.stringValue}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isPending}
          >
            Submit
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default EditPostModal;
