import React from "react";
import { GetServerSideProps } from "next";

import prisma from "@/lib/prisma";
import Layout from "@/components/layout/layout";
import ItemListComponent from "@/components/actualites/ItemList";
import { Post } from "../../interfaces";

export type PostProps = {
  posts: [Post];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await prisma.post.findMany({
    include: {
      images: {
        select: { filename: true, width: true, height: true },
      },
      tags: {
        select: { tag: true },
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

const PostListPage: React.FC<PostProps> = ({ posts }) => {
  return (
    <Layout>
      <h1>Actualités</h1>
      <ul>
        {posts.map((post) => (
          <ItemListComponent key={post.id} post={post} />
        ))}
      </ul>
    </Layout>
  );
};

export default PostListPage;
