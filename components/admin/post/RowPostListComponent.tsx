import React from "react";
import { format } from "date-fns";
import { FiCheck, FiX } from "react-icons/fi";

import s from "@/components/admin/common/ListComponent.module.css";
import { Post } from "@/interfaces/index";
import POST from "@/constants/post";
import DeletePostButton from "@/components/admin/post/DeletePostButton";
import UpdatePostButton from "./UpdatePostButton";

interface Props {
  post: Post;
}

function RowPostListComponent({ post }: Props) {
  return (
    <ul className={s.item}>
      <li>
        <span className={s.title}>{post.title}</span> -{" "}
        {format(new Date(post.date), POST.FORMAT_DATE)} (Thumbnail :{" "}
        {post.mainImage ? <FiCheck /> : <FiX />} Album photo :{" "}
        {post.images.length > 0 ? <FiCheck /> : <FiX />})
      </li>
      <li>
        <UpdatePostButton post={post} />
      </li>
      <li>
        <DeletePostButton id={post.id} />
      </li>
    </ul>
  );
}

export default RowPostListComponent;
