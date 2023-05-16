import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

import Layout from "@/components/layout/layout";
import DraftComponent from "@/components/admin/DraftComponent";
import prisma from "@/lib/prisma";
import AccessDenied from "@/components/auth/access-denied";
import { Option } from "@/interfaces/index";
import PostListComponent from "@/components/admin/PostListComponent";

interface Props {
  tags: Option[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tags = await prisma.tag.findMany();

  return {
    props: {
      tags,
    },
  };
};

const Index = ({ tags }: Props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <DraftComponent tags={tags} />
      <PostListComponent />
    </Layout>
  );
};

export default Index;
