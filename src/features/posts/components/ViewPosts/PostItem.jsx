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

const PostItem = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (path) => deletePostAPI(path, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  return (
    <li className={styles.cardItem}>
      <h4 className={styles.title}>{post?.fields?.title?.stringValue}</h4>
      <p className={styles.content}> {post?.fields?.content?.stringValue}</p>
      <p className={styles.timestamp}>
        {formatTimestamp(post?.fields?.createdAt?.timestampValue)}
      </p>
      <p className={styles.meta}>By:{post?.fields?.email?.stringValue}</p>
      {email === post?.fields?.email?.stringValue && (
        <RiChatDeleteLine
          onClick={() => mutate(post?.name)}
          className={styles.deleteIcon}
        />
      )}
      {email === post?.fields?.email?.stringValue && (
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
