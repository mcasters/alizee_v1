import useSWR from "swr";

import Layout from "@/components/layout/layout";
import type { Post } from "../../interfaces";
import PostListComponent from "@/components/actualites/PostList";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PostPage() {
  const { data, error, isLoading } = useSWR<Post[]>("/api/post", fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <Layout>
      <h1>Actualités</h1>
      <ul>
        {data.map((p) => (
          <PostListComponent key={p.id} post={p} />
        ))}
      </ul>
    </Layout>
  );
}
