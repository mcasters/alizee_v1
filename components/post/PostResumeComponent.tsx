import Link from "next/link";
import Image from "next/image";

import type { Post } from "@/interfaces/index";
import { getPath } from "@/utils/commonUtils";
import s from "./post.module.css";

type PostProps = {
  post: Post;
};

export default function PostResumeComponent({ post }: PostProps) {
  const path = getPath(post);

  return (
    <li className={s.resume}>
      <Link href="/actualites/[id]" as={`/actualites/${post.id}`}>
        {post.mainImage && (
          <Image
            src={`${path}/${post.mainImage.filename}`}
            width={post.mainImage.width}
            height={post.mainImage.height}
            alt={`Alizée Roussel - ${post.title}`}
          />
        )}

        <div className={s.resumeInfo}>
          <h2>{post.title}</h2>
          <time>Le {new Date(post.date).toLocaleDateString()}</time>
          <p>{post.content}</p>
        </div>
      </Link>
    </li>
  );
}
