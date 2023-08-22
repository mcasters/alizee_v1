import useSWR from "swr";

import s from "@/components/admin/common/ListComponent.module.css";
import LoadingDots from "@/components/loading-dots";
import { Horse } from "@/interfaces/index";
import RowHorseListComponent from "@/components/admin/horse/RowHorseListComponent";

export default function HorseListComponent() {
  const {
    data: horses,
    error,
    isLoading,
  } = useSWR("/api/horse", (apiURL: string) =>
    fetch(apiURL).then((res) => res.json())
  );

  if (error) return <div>failed to load</div>;

  return (
    <div className={s.listContainer}>
      <h2>Liste des chevaux</h2>
      <div className={s.list}>
        {isLoading && <LoadingDots />}
        {horses &&
          horses.map((horse: Horse) => {
            return <RowHorseListComponent key={horse.id} horse={horse} />;
          })}
      </div>
    </div>
  );
}
