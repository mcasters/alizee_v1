import useSWR from "swr";
import { useRouter } from "next/router";

import Layout from "@/components/layout/layout";
import type { Post, ResponseError } from "../../interfaces";
import PostComponent from "@/components/actualites/Post";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PostPage() {
  const { query } = useRouter();
  const { data, error, isLoading } = useSWR<Post, ResponseError>(
    () => (query.pid ? `/api/post/${query.pid}` : null),
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <Layout>
      <PostComponent post={data} />
    </Layout>
  );
}
