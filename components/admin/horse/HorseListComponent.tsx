import useSWR from "swr";

import s from "@/components/admin/common/ListComponent.module.css";
import LoadingDots from "@/components/loading-dots";
import { Horse } from "@/interfaces/index";
import RowHorseListComponent from "@/components/admin/horse/RowHorseListComponent";
import React from "react";

interface HorseListProps {
  isToSell: boolean;
}
export default function HorseListComponent({ isToSell }: HorseListProps) {
  const api = isToSell ? "/api/horse-to-sell" : "/api/horse";
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
        {horses &&
          horses.map((horse: Horse) => {
            return (
              <RowHorseListComponent
                key={horse.id}
                horse={horse}
                isToSell={isToSell}
              />
            );
          })}
      </div>
    </div>
  );
}
