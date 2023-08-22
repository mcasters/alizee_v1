import React from "react";
import { GetServerSideProps } from "next";

import Layout from "@/components/layout/layout";
import type { Horse } from "@/interfaces/index";
import prisma from "@/lib/prisma";
import HorseComponent from "@/components/horse/HorseComponent";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await prisma.horse.findUnique({
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
  const horse = JSON.parse(JSON.stringify(res));
  return {
    props: {
      ...horse,
    },
  };
};

export default function HorsePage(props: Horse) {
  return (
    <Layout>
      <HorseComponent horse={props} />
    </Layout>
  );
}
