import Layout from "@/components/layout/layout";
import DraftComponent from "@/components/admin/DraftComponent";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";
import React from "react";
import { Option, Post } from "@/interfaces/index";
import PostListComponent from "@/components/admin/PostListComponent";

interface Props {
  tags: Option[];
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tags = await prisma.tag.findMany();
  const posts = await prisma.post.findMany({
    include: {
      images: true,
      tags: true,
    },
  });

  return {
    props: {
      tags,
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};

const Update = ({ tags, posts }: Props) => {
  return (
    <Layout>
      <DraftComponent tags={tags} />
      <PostListComponent posts={posts} />
    </Layout>
  );
};

export default Update;
