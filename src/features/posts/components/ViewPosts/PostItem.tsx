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
