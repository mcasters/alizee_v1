import Link from "next/link";
import type { Post } from "../../interfaces";
import Image from "next/image";

type PostProps = {
  post: Post;
};

export default function ItemListComponent({ post }: PostProps) {
  return (
    <li>
      <Link href="/actualites/[pid]" as={`/actualites/${post.id}`}>
        {post.title}
      </Link>
      <time>{new Date(post.date).toLocaleDateString()}</time>
      <Image
        src={`/images/actu/${post.images[0].filename}`}
        width={100}
        height={100}
        alt={`Alizée Roussel - ${post.title}`}
      />
    </li>
  );
}
