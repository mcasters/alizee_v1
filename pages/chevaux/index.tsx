import React from "react";
import { GetServerSideProps } from "next";

import prisma from "@/lib/prisma";
import Layout from "@/components/layout/layout";
import HorseListComponent from "@/components/horse/HorseListComponent";
import { Horse } from "@/interfaces/index";

export type PostProps = {
  horses: [Horse];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await prisma.horse.findMany({
    include: {
      mainImage: {
        select: { filename: true },
      },
    },
  });
  const horses = JSON.parse(JSON.stringify(res));
  return {
    props: {
      horses,
    },
  };
};

export default function HorseListPage({ horses }: PostProps) {
  return (
    <Layout>
      <h1>Chevaux</h1>
      <ul>
        {horses &&
          horses.map((horse) => (
            <HorseListComponent key={horse.id} horse={horse} />
          ))}
      </ul>
    </Layout>
  );
}
