import React from "react";
import Image from "next/image";

import { Post } from "@/interfaces/index";
import AlbumComponent from "../common/AlbumComponent";
import { getPath } from "@/utils/commonUtils";
import s from "./post.module.css";

interface Props {
  post: Post;
}
export default function PostComponent({ post }: Props) {
  const mainImageFilename = post.mainImage?.filename || "";
  const albumsImages = post.images;
  const path = getPath(post);

  return (
    <article className={s.postArticle}>
      <h1>{post.title}</h1>
      <time>Le {new Date(post.date).toLocaleDateString()}</time>
      {mainImageFilename !== "" && (
        <Image
          src={`${path}/${mainImageFilename}`}
          width={post.mainImage.width}
          height={post.mainImage.height}
          alt={`Alizée Roussel - ${post.title}`}
          className={s.mainImage}
        />
      )}
      <p>{post.content}</p>
      <div>
        {albumsImages.length > 0 && (
          <AlbumComponent images={post.images} path={path} title={post.title} />
        )}
      </div>
    </article>
  );
}
