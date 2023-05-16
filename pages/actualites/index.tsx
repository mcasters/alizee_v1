import React from "react";
import { GetServerSideProps } from "next";

import prisma from "@/lib/prisma";
import Layout from "@/components/layout/layout";
import ItemComponent from "@/components/actualites/ItemComponent";
import { Post } from "@/interfaces/index";

export type PostProps = {
  posts: [Post];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await prisma.post.findMany({
    include: {
      mainImage: {
        select: { filename: true },
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

const PostListPage = ({ posts }: PostProps) => (
  <Layout>
    <h1>Actualités</h1>
    <ul>
      {posts &&
        posts.map((post) => <ItemComponent key={post.id} post={post} />)}
    </ul>
  </Layout>
);

export default PostListPage;
