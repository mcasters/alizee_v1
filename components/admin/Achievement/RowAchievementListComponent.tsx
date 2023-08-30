import React from "react";
import { FiTrash2 } from "react-icons/fi";

import { Achievement } from "@/interfaces/index";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import s from "@/components/admin/common/ListComponent.module.css";

interface Props {
  achievement: Achievement;
}

export default function RowAchievementListComponent({ achievement }: Props) {
  const { mutate } = useSWRConfig();
  const api = "/api/achievement/delete";
  const apiToUpdate = "/api/horse";

  const handleDelete = async () => {
    if (confirm("Sûr de vouloir supprimer ?")) {
      fetch(`${api}/${achievement.id}`).then((res) => {
        if (res.ok) {
          toast("Résultat effacé");
          mutate(apiToUpdate);
        } else toast("Erreur à la suppression");
      });
    }
  };

  console.log(achievement);

  return (
    <ul className={s.item}>
      <li>{achievement.year}</li>
      <li>{achievement.title}</li>
      <li>{achievement.location}</li>
      <li>
        <button onClick={handleDelete} className={s.iconButton}>
          <FiTrash2 />
        </button>
      </li>
    </ul>
  );
}
