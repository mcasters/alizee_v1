import { GrDocumentUpdate } from "react-icons/gr";
import React, { useRef } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/Modal";
import { Post } from "@/interfaces/index";
import HorseForm from "@/components/admin/form/horseForm/HorseForm";
import s from "@/components/admin/common/ListComponent.module.css";
import PostForm from "@/components/admin/form/postForm/PostForm";

type props = {
  post: Post;
};
export default function UpdatePostButton({ post }: props) {
  const form = useRef(null);
  const { isOpen, toggle } = useModal();
  const { mutate } = useSWRConfig();
  const api = "/api/post/update";
  const apiToUpdate = "/api/post";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(form.current);
      fetch(api, { method: "POST", body: formData }).then((res) => {
        if (res.ok) {
          toast("Post modifié");
          mutate(apiToUpdate);
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <>
      <button
        onClick={() => toggle()}
        className={s.iconButton}
        aria-label="Mise à jour"
      >
        <GrDocumentUpdate />
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <PostForm post={post} formRef={form} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
}
