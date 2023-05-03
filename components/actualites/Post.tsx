import React from "react";
import { Post } from "../../interfaces";
import AlbumComponent from "@/components/actualites/Album";
import Image from "next/image";

const PostComponent: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <article>
      <h1>{post.title}</h1>
      <Image
        src={`/images/actu/${post.images[0].filename}`}
        width={100}
        height={100}
        alt={`Alizée Roussel - ${post.title}`}
      />
      <time>{new Date(post.date).toLocaleDateString()}</time>
      <p>{post.content}</p>
      <div>
        <AlbumComponent images={post.images} title={post.title} />
      </div>
    </article>
  );
};

export default PostComponent;
