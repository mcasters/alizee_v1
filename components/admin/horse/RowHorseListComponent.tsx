import React from "react";
import { FiCheck, FiX } from "react-icons/fi";

import s from "@/components/admin/common/ListComponent.module.css";
import { Horse, HorseToSell } from "@/interfaces/index";
import useModal from "@/components/form/modal/useModal";
import Modal from "@/components/form/modal/Modal";
import DeleteHorseButton from "@/components/admin/horse/DeleteHorseButton";
import UpdateHorseComponent from "@/components/admin/horse/UpdateHorseComponent";

interface RawListProps {
  isToSell: boolean;
  horse: Horse | HorseToSell;
}

export default function RowHorseListComponent({
  horse,
  isToSell,
}: RawListProps) {
  const { isOpen, toggle } = useModal();

  return (
    <ul className={s.item}>
      <button onClick={() => toggle()} className={s.linkUpdate}>
        <li>
          <span className={s.name}>{horse.name}</span>
        </li>
        <li>
          <span>Thumbnail : </span>
          {horse.mainImage ? <FiCheck /> : <FiX />}
        </li>
        <li>Album photo : {horse.images.length > 0 ? <FiCheck /> : <FiX />}</li>
      </button>
      <li>
        <DeleteHorseButton id={horse.id} isToSell={isToSell} />
      </li>
      <Modal isOpen={isOpen} toggle={toggle}>
        <UpdateHorseComponent horse={horse} isToSell={isToSell} />
      </Modal>
    </ul>
  );
}
