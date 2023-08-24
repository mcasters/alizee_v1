import Link from "next/link";
import type { Post } from "@/interfaces/index";
import Image from "next/image";
import { getPath } from "@/utils/commonUtils";

type PostProps = {
  post: Post;
};

export default function PostListComponent({ post }: PostProps) {
  const path = getPath(post);

  return (
    <li>
      <Link href="/actualites/[id]" as={`/actualites/${post.id}`}>
        {post.title}
      </Link>
      <time>{new Date(post.date).toLocaleDateString()}</time>
      {post.mainImage && (
        <Image
          src={`${path}/${post.mainImage.filename}`}
          width={post.mainImage.width}
          height={post.mainImage.height}
          alt={`Alizée Roussel - ${post.title}`}
        />
      )}
    </li>
  );
}
