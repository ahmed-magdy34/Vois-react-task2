import React, { use } from "react";
import styles from "./PostItem.module.css";
import { formatTimestamp } from "../../../../utils/helpers";
import { RiChatDeleteLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import {
  QueryClient,
  useMutation,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePostAPI } from "../../../../services/apiPosts";

const PostItem = ({ post }) => {
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
    </li>
  );
};

export default PostItem;
