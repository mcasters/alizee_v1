import Link from "next/link";
import type { Post } from "@/interfaces/index";
import Image from "next/image";
import { getDirnameFromTitle } from "@/utils/common/post";

type PostProps = {
  post: Post;
};

export default function ItemComponent({ post }: PostProps) {
  return (
    <li>
      <Link href="/actualites/[id]" as={`/actualites/${post.id}`}>
        {post.title}
      </Link>
      <time>{new Date(post.date).toLocaleDateString()}</time>
      {post.mainImage && (
        <Image
          src={`/images/actu/${getDirnameFromTitle(post.title)}/${
            post.mainImage.filename
          }`}
          width={100}
          height={100}
          alt={`Alizée Roussel - ${post.title}`}
        />
      )}
    </li>
  );
}
