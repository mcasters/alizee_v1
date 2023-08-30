import RowPostListComponent from "@/components/admin/post/RowPostListComponent";
import { Option, Post } from "@/interfaces/index";
import s from "@/components/admin/common/ListComponent.module.css";
import useSWR from "swr";
import React from "react";
import LoadingDots from "@/components/loading-dots";

export default function PostListComponent() {
  const api = "/api/post";
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR(api, (apiURL: string) => fetch(apiURL).then((res) => res.json()));

  if (error) return <div>failed to load</div>;

  return (
    <div className={s.listContainer}>
      <h2>Liste des posts</h2>
      <div className={s.list}>
        {isLoading && <LoadingDots />}
        {posts &&
          posts.map((post: Post) => {
            return <RowPostListComponent key={post.id} post={post} />;
          })}
      </div>
    </div>
  );
}
