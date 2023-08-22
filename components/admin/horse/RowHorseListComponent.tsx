import React from "react";
import { FiCheck, FiX } from "react-icons/fi";

import s from "@/components/admin/common/ListComponent.module.css";
import { Horse } from "@/interfaces/index";
import useModal from "@/components/form/modal/useModal";
import Modal from "@/components/form/modal/Modal";
import DeleteHorseButton from "@/components/admin/horse/DeleteHorseButton";
import UpdateHorseComponent from "@/components/admin/horse/UpdateHorseComponent";

interface RawListProps {
  horse: Horse;
}

export default function RowHorseListComponent(props: RawListProps) {
  const { isOpen, toggle } = useModal();

  return (
    <ul className={s.item}>
      <button onClick={() => toggle()} className={s.linkUpdate}>
        <li>
          <span className={s.name}>{props.horse.name}</span>
        </li>
        <li>
          <span>Thumbnail : </span>
          {props.horse.mainImage ? <FiCheck /> : <FiX />}
        </li>
        <li>
          Album photo : {props.horse.images.length > 0 ? <FiCheck /> : <FiX />}
        </li>
      </button>
      <li>
        <DeleteHorseButton id={props.horse.id} />
      </li>
      <Modal isOpen={isOpen} toggle={toggle}>
        <UpdateHorseComponent horse={props.horse} />
      </Modal>
    </ul>
  );
}
