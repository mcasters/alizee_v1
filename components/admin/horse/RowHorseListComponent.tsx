import React from "react";
import { FiCheck, FiX } from "react-icons/fi";

import { Horse } from "@/interfaces/index";
import useModal from "@/components/form/modal/useModal";
import Modal from "@/components/form/modal/Modal";
import DeleteHorseButton from "@/components/admin/horse/DeleteHorseButton";
import UpdateHorseComponent from "@/components/admin/horse/UpdateHorseComponent";
import AddAchievementButton from "@/components/admin/Achievement/AchievementButton";
import s from "@/components/admin/common/ListComponent.module.css";

interface RawListProps {
  horse: Horse;
}

export default function RowHorseListComponent({ horse }: RawListProps) {
  const { isOpen, toggle } = useModal();

  return (
    <ul className={s.item}>
      <button onClick={() => toggle()} className={s.linkUpdate}>
        <li>
          <span className={s.name}>{horse.name}</span>
        </li>
        <li>Thumbnail : {horse.mainImage ? <FiCheck /> : <FiX />}</li>
        <li>Album photo : {horse.images.length > 0 ? <FiCheck /> : <FiX />}</li>
      </button>
      <li></li>
      <li>
        <DeleteHorseButton id={horse.id} />
      </li>
      <li>
        <AddAchievementButton horse={horse} />
      </li>
      <Modal isOpen={isOpen} toggle={toggle}>
        <UpdateHorseComponent horse={horse} />
      </Modal>
    </ul>
  );
}
