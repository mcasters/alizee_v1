import React from "react";
import { GetServerSideProps } from "next";

import Layout from "@/components/layout/layout";
import type { Post } from "@/interfaces/index";
import PostComponent from "@/components/post/PostComponent";
import prisma from "@/lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      mainImage: {
        select: { filename: true, width: true, height: true },
      },
      images: {
        select: { filename: true, width: true, height: true },
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

const PostPage = (props: Post) => {
  return (
    <Layout>
      <PostComponent post={props} />
    </Layout>
  );
};

export default PostPage;
