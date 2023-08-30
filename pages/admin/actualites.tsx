import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

import Layout from "@/components/layout/layout";
import AddPostComponent from "@/components/admin/post/AddPostComponent";
import prisma from "@/lib/prisma";
import AccessDenied from "@/components/auth/access-denied";
import { Option } from "@/interfaces/index";
import PostListComponent from "@/components/admin/post/PostListComponent";
import AdminNav from "@/components/layout/AdminNav";
import s from "@/pages/admin/admin.module.css";

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

export default function Actualites({ tags }: Props) {
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
      <AdminNav />
      <PostListComponent />
      <AddPostComponent tags={tags} />
    </Layout>
  );
}
