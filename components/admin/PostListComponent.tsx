import useSWR from "swr";

import s from "./PostListComponent.module.css";
import PostListRawComponent from "@/components/admin/PostListRawComponent";
import LoadingDots from "@/components/loading-dots";
import { Post } from "@/interfaces/index";

const PostListComponent = () => {
  const { data, error, isLoading } = useSWR("/api/post", (apiURL: string) =>
    fetch(apiURL).then((res) => res.json())
  );
  if (error) return <div>failed to load</div>;

  return (
    <div className={s.listContainer}>
      <h2>Liste de posts</h2>
      <div className={s.postList}>
        {isLoading && <LoadingDots />}
        {data &&
          data.map((post: Post) => {
            return <PostListRawComponent key={post.id} post={post} />;
          })}
      </div>
    </div>
  );
};

export default PostListComponent;
