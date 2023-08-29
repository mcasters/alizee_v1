import React from "react";
import { FiTrash2 } from "react-icons/fi";

import { Achievement } from "@/interfaces/index";
import s from "@/components/admin/common/ListComponent.module.css";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";

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
          toast("Cheval effacé");
          mutate(apiToUpdate);
        } else toast("Erreur à la suppression");
      });
    }
  };

  return (
    <ul className={s.item}>
      <li>{achievement.year}</li>
      <li>{achievement.title}</li>
      <li>{achievement.location}</li>
      <li></li>
      <li>
        <button onClick={handleDelete}>
          <FiTrash2 />
        </button>
      </li>
    </ul>
  );
}
