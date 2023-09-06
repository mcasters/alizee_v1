import React from "react";
import { GetServerSideProps } from "next";

import prisma from "@/lib/prisma";
import Layout from "@/components/layout/layout";
import PostResumeComponent from "@/components/post/PostResumeComponent";
import { Post } from "@/interfaces/index";
import s from "./post.module.css";

export type PostProps = {
  posts: [Post];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await prisma.post.findMany({
    orderBy: {
      date: "desc",
    },
    include: {
      mainImage: {
        select: { filename: true, width: true, height: true },
      },
    },
  });
  const posts = JSON.parse(JSON.stringify(res));
  return {
    props: {
      posts,
    },
  };
};

export default function PostListPage({ posts }: PostProps) {
  return (
    <Layout>
      <h1>Actualités</h1>
      <ul>
        {posts &&
          posts.map((post) => (
            <PostResumeComponent key={post.id} post={post} />
          ))}
      </ul>
    </Layout>
  );
}
