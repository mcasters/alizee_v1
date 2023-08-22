import React from "react";
import { GetServerSideProps } from "next";

import prisma from "@/lib/prisma";
import Layout from "@/components/layout/layout";
import PostListComponent from "@/components/post/PostListComponent";
import { Post } from "@/interfaces/index";

export type PostProps = {
  posts: [Post];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await prisma.post.findMany({
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
          posts.map((post) => <PostListComponent key={post.id} post={post} />)}
      </ul>
    </Layout>
  );
}
