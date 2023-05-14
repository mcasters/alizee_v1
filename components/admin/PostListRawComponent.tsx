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
  const [mainImageFilename, setMainImageFilename] = useState<string>("");
  const [hasAlbum, setHasAlbum] = useState<boolean>(false);

  useEffect(() => {
    if (post.images.length > 0) {
      post.images.forEach((image) => {
        if (image.isMain) setMainImageFilename(image.filename);
        else if (!hasAlbum) setHasAlbum(true);
      });
    }
  });

  const openUpdate = () => {};

  return (
    <ul className={s.item}>
      <Link
        href="/admin/update/[pid]"
        as={`/admin/update/${post.id}`}
        className={s.linkUpdate}
      >
        <li>{post.title}</li>
        <li>{format(new Date(post.date), POST.FORMAT_DATE)}</li>
        <li>
          <span>Thumbnail : </span>
          {mainImageFilename !== "" ? <FiCheck /> : <FiX />}
        </li>
        <li>Album photo : {hasAlbum ? <FiCheck /> : <FiX />}</li>
      </Link>
      <li>
        <PostDeleteButton postId={post.id} />
      </li>
    </ul>
  );
}

export default PostListRawComponent;
