import Link from "next/link";
import type { Post } from "../../interfaces";

type PostProps = {
  post: Post;
};

export default function PostListComponent({ post }: PostProps) {
  return (
    <li>
      <Link href="/actualites/[pid]" as={`/actualites/${post.id}`}>
        {post.title}
      </Link>
      <time>{new Date(post.date).toLocaleDateString()}</time>
    </li>
  );
}
