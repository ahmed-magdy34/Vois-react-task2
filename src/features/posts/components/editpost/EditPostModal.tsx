import React, { useEffect, useRef, useState } from "react";
import styles from "./EditPostModal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePostSDK } from "../../../../services/apiPosts";
import { Post } from "../../postTypes";

/**
 * * EditPostModal component allows the user to edit a post's title and content.
 * * It uses the useMutation hook from react-query to handle the update of the post.
 * * * It also uses the useRef hook to manage the dialog element.
 * * When the modal is open, it displays a form with fields for title and content.
 *  * * When the form is submitted, it validates the inputs and calls the updatePostSDK function to update the post.
 * * After successful update, it invalidates the posts query and closes the modal.
 * * @component
 * * @param {Post} post - The post object to be edited.
 * * @param {boolean} showModal - Flag to control the visibility of the modal.
 * * @param {function} setShowModal - Function to set the visibility of the modal.
 * * @returns {JSX.Element} - A modal dialog for editing a post.
 */

interface EditPostModalProps {
  post: Post;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  post,
  showModal,
  setShowModal,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  console.log("post", post);
  const [newTitle, setNewTitle] = useState<string>(post?.title);
  const [newContent, setNewContent] = useState<string>(post?.content);

  const segments = post && post.name ? post.name.split("/") : [];
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

  const { mutate, isPending } = useMutation<
    boolean,
    Error,
    { title: string; content: string }
  >({
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
            maxLength={10}
            id="title"
            defaultValue={post?.title}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <input
            type="text"
            name="content"
            id="content"
            maxLength={50}
            defaultValue={post?.content}
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
