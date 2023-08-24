import React from "react";
import { GetServerSideProps } from "next";

import prisma from "@/lib/prisma";
import Layout from "@/components/layout/layout";
import { Horse } from "@/interfaces/index";
import HorseToSellListComponent from "@/components/horse-to-sell/HorseToSellListComponent";

export type PostProps = {
  horses: [Horse];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await prisma.horseToSell.findMany({
    include: {
      mainImage: {
        select: { filename: true, height: true, width: true },
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

export default function HorseToSellListPage({ horses }: PostProps) {
  return (
    <Layout>
      <h1>Chevaux à vendre</h1>
      <ul>
        {horses &&
          horses.map((horse) => (
            <HorseToSellListComponent key={horse.id} horse={horse} />
          ))}
      </ul>
    </Layout>
  );
}
