import React from "react";
import { FiCheck, FiX } from "react-icons/fi";

import { Horse } from "@/interfaces/index";
import DeleteHorseButton from "@/components/admin/horse/DeleteHorseButton";
import AddAchievementButton from "@/components/admin/Achievement/AchievementButton";
import UpdateButton from "@/components/admin/horse/UpdateButton";
import s from "@/components/admin/common/ListComponent.module.css";

interface RawListProps {
  horse: Horse;
}

export default function RowHorseListComponent({ horse }: RawListProps) {
  return (
    <ul className={s.item}>
      <li>
        <span className={s.name}>{horse.name}</span> - (Thumbnail :{" "}
        {horse.mainImage ? <FiCheck /> : <FiX />}
        Album photo : {horse.images.length > 0 ? <FiCheck /> : <FiX />})
      </li>
      <li>
        <UpdateButton horse={horse} />
      </li>
      <li>
        <AddAchievementButton horse={horse} />
      </li>
      <li>
        <DeleteHorseButton id={horse.id} />
      </li>
    </ul>
  );
}
