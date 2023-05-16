import React from "react";
import Image from "next/image";

import { Post } from "@/interfaces/index";
import AlbumComponent from "./Album";
import { getDirnameFromTitle } from "@/utils/common/post";

interface Props {
  post: Post;
}
const PostComponent = ({ post }: Props) => {
  const mainImageFilename = post.mainImage?.filename || "";
  const albumsImages = post.images;
  const imageDirname = getDirnameFromTitle(post.title);

  return (
    <article>
      <h1>{post.title}</h1>
      {mainImageFilename !== "" && (
        <Image
          src={`/images/actu/${imageDirname}/${mainImageFilename}`}
          width={100}
          height={100}
          alt={`Alizée Roussel - ${post.title}`}
        />
      )}
      <time>{new Date(post.date).toLocaleDateString()}</time>
      <p>{post.content}</p>
      <div>
        {albumsImages.length > 0 && (
          <AlbumComponent
            images={post.images}
            dirname={imageDirname}
            title={post.title}
          />
        )}
      </div>
    </article>
  );
};

export default PostComponent;
