import React, { use, useState } from "react";
import styles from "./PostItem.module.css";
import { formatTimestamp } from "../../../../utils/helpers";
import { RiChatDeleteLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { TiEdit } from "react-icons/ti";
import {
  QueryClient,
  useMutation,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePostAPI } from "../../../../services/apiPosts";
import EditPostModal from "../editpost/EditPostModal";
import { Post } from "../../postTypes";
import { RootState } from "../../../../store/store";

/**postItem component
 *
 * * PostItem component displays a single post with its details.
 * It allows the user to delete or edit the post if they are the author.
 * It uses the useMutation hook from react-query to handle the deletion of the post.
 * It also uses the useSelector hook from react-redux to get the current user's email and token.
 * takes a post object as a prop and displays its title, content, timestamp, and author email.
 * It also displays a delete icon and an edit icon if the current user is the author of the post.
 * When the delete icon is clicked, it calls the deletePostAPI function to delete the post.
 * When the edit icon is clicked, it opens a modal to edit the post.
 * @component
 * @param {Post} post - The post object to be displayed.
 * @returns {JSX.Element} - A list item containing the post details and action icons.
 * @example
 * const post = {
 *   id: 1,
 *  title: "Post Title",
 *
 * content: "Post content goes here.",
 *
 * createdAt: "2023-10-01T12:00:00Z",
 * email: "ahmed@example.com"
 *   url: "https://example.com/image.jpg",
 */

interface PostItemProps {
  post: Post;
}
const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const email = useSelector((state: RootState) => state.auth.email);
  const token = useSelector((state: RootState) => state.auth.token);
  const queryClient = useQueryClient();
  const { mutate } = useMutation<boolean, Error, string>({
    mutationFn: (path: string) => deletePostAPI(path, token!),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  return (
    <li className={styles.cardItem}>
      {post?.url && <img src={post?.url} alt="post-img" />}{" "}
      <h4 className={styles.title}>{post?.title}</h4>
      <p className={styles.content}> {post?.content}</p>
      <p className={styles.timestamp}>{formatTimestamp(post?.createdAt)}</p>
      <p className={styles.meta}>By:{post?.email}</p>
      {email === post?.email && (
        <RiChatDeleteLine
          onClick={() => mutate(post?.name)}
          className={styles.deleteIcon}
        />
      )}
      {email === post?.email && (
        <TiEdit
          onClick={() => setShowModal(true)}
          className={styles.editIcon}
        />
      )}
      <EditPostModal
        showModal={showModal}
        setShowModal={setShowModal}
        post={post}
      />
    </li>
  );
};

export default PostItem;
