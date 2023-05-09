import React from "react";
import { GetServerSideProps } from "next";

import Layout from "@/components/layout/layout";
import type { Post } from "@/interfaces/index";
import PostComponent from "@/components/actualites/Post";
import prisma from "@/lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await prisma.post.findUnique({
    where: {
      id: Number(params?.pid) || -1,
    },
    include: {
      images: {
        select: { filename: true, width: true, height: true },
      },
      tags: {
        select: { tag: true },
      },
    },
  });
  const post = JSON.parse(JSON.stringify(res));
  return {
    props: {
      ...post,
    },
  };
};

const PostPage: React.FC<Post> = (props) => {
  return (
    <Layout>
      <PostComponent post={props} />
    </Layout>
  );
};

export default PostPage;
