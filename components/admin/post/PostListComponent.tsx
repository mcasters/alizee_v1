import useSWR from "swr";

import RowPostListComponent from "@/components/admin/post/RowPostListComponent";
import LoadingDots from "@/components/loading-dots";
import { Post } from "@/interfaces/index";
import s from "@/components/admin/common/ListComponent.module.css";

export default function PostListComponent() {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR("/api/post", (apiURL: string) =>
    fetch(apiURL).then((res) => res.json())
  );
  const { data: tags } = useSWR("/api/post/tag", (apiURL: string) =>
    fetch(apiURL).then((res) => res.json())
  );

  if (error) return <div>failed to load</div>;

  return (
    <div className={s.listContainer}>
      <h2>Liste des posts</h2>
      <div className={s.list}>
        {isLoading && <LoadingDots />}
        {posts &&
          posts.map((post: Post) => {
            return (
              <RowPostListComponent key={post.id} post={post} tags={tags} />
            );
          })}
      </div>
    </div>
  );
}
