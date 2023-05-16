import { Post } from "@/interfaces/index";
import s from "./PostListComponent.module.css";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiCheck, FiX } from "react-icons/fi";
import Link from "next/link";

import POST from "@/constants/post";
import { getDirnameFromTitle } from "@/utils/common/post";
import PostDeleteButton from "@/components/admin/PostDeleteButton";

interface Props {
  post: Post;
}

function PostListRawComponent({ post }: Props) {
  return (
    <ul className={s.item}>
      <Link
        href="/admin/update/[id]"
        as={`/admin/update/${post.id}`}
        className={s.linkUpdate}
      >
        <li>
          <span className={s.title}>{post.title}</span> -{" "}
          {format(new Date(post.date), POST.FORMAT_DATE)}
        </li>
        <li>
          <span>Thumbnail : </span>
          {post.mainImage ? <FiCheck /> : <FiX />}
        </li>
        <li>Album photo : {post.images.length > 0 ? <FiCheck /> : <FiX />}</li>
      </Link>
      <li>
        <PostDeleteButton id={post.id} />
      </li>
    </ul>
  );
}

export default PostListRawComponent;
