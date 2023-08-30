import useSWR from "swr";

import LoadingDots from "@/components/loading-dots";
import { Horse } from "@/interfaces/index";
import RowHorseListComponent from "@/components/admin/horse/RowHorseListComponent";
import React from "react";
import s from "@/components/admin/common/ListComponent.module.css";

interface HorseListProps {
  isToSell: boolean;
}
export default function HorseListComponent({ isToSell }: HorseListProps) {
  const api = "/api/horse";
  const title = isToSell ? "Liste des chevaux à vendre" : "Liste des chevaux";
  const {
    data: horses,
    error,
    isLoading,
  } = useSWR(api, (apiURL: string) => fetch(apiURL).then((res) => res.json()));

  if (error) return <div>failed to load</div>;

  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <div className={s.list}>
        {isLoading && <LoadingDots />}
        {isToSell &&
          horses &&
          horses
            .filter((horse: Horse) => horse.isToSell)
            .map((horse: Horse) => {
              return <RowHorseListComponent key={horse.id} horse={horse} />;
            })}
        {!isToSell &&
          horses &&
          horses
            .filter((horse: Horse) => !horse.isToSell)
            .map((horse: Horse) => {
              return <RowHorseListComponent key={horse.id} horse={horse} />;
            })}
      </div>
    </div>
  );
}
