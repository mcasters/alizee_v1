import Layout from "@/components/layout/layout";
import DraftComponent from "@/components/admin/Draft";
import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";
import React from "react";
import { Tag } from "interfaces";

export const getServerSideProps: GetServerSideProps = async () => {
  const tags = await prisma.tag.findMany();
  return {
    props: {
      tags,
    },
  };
};

const Admin: React.FC<{ tags: Tag[] }> = (props) => {
  return (
    <Layout>
      <DraftComponent tags={props.tags} />
    </Layout>
  );
};

export default Admin;
