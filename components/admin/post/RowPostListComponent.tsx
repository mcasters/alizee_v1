import React from "react";
import { format } from "date-fns";
import { FiCheck, FiX } from "react-icons/fi";

import s from "@/components/admin/common/ListComponent.module.css";
import { Post, Option } from "@/interfaces/index";
import POST from "@/constants/post";
import DeletePostButton from "@/components/admin/post/DeletePostButton";
import UpdatePostComponent from "@/components/admin/post/UpdatePostComponent";
import useModal from "@/components/form/modal/useModal";
import Modal from "@/components/form/modal/Modal";

interface RawListProps {
  post: Post;
  tags: Option[];
}

function RowPostListComponent(props: RawListProps) {
  const { isOpen, toggle } = useModal();

  return (
    <ul className={s.item}>
      <button onClick={() => toggle()} className={s.linkUpdate}>
        <li>
          <span className={s.title}>{props.post.title}</span> -{" "}
          {format(new Date(props.post.date), POST.FORMAT_DATE)}
        </li>
        <li>
          <span>Thumbnail : </span>
          {props.post.mainImage ? <FiCheck /> : <FiX />}
        </li>
        <li>
          Album photo : {props.post.images.length > 0 ? <FiCheck /> : <FiX />}
        </li>
      </button>
      <li>
        <DeletePostButton id={props.post.id} />
      </li>
      <Modal isOpen={isOpen} toggle={toggle}>
        <UpdatePostComponent post={props.post} tags={props.tags} />
      </Modal>
    </ul>
  );
}

export default RowPostListComponent;
