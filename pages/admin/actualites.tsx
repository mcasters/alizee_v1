import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

import Layout from "@/components/layout/layout";
import AddPostComponent from "@/components/admin/Post/AddPostComponent";
import prisma from "@/lib/prisma";
import AccessDenied from "@/components/auth/access-denied";
import { Option } from "@/interfaces/index";
import ListPostComponent from "@/components/admin/Post/ListPostComponent";
import AdminNav from "@/components/layout/AdminNav";

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
      <ListPostComponent />
      <AddPostComponent tags={tags} />
    </Layout>
  );
}
