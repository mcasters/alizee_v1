import { GrDocumentUpdate } from "react-icons/gr";

import useModal from "@/components/form/modal/useModal";
import Modal from "@/components/form/modal/Modal";
import { Horse } from "@/interfaces/index";
import HorseForm from "@/components/form/horseForm/HorseForm";
import React, { useRef } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import s from "@/components/admin/common/ListComponent.module.css";

type props = {
  horse: Horse;
};
export default function UpdateButton({ horse }: props) {
  const form = useRef(null);
  const { isOpen, toggle } = useModal();
  const { mutate } = useSWRConfig();
  const api = "/api/horse/update";
  const apiToUpdate = "/api/horse";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(form.current);
      fetch(api, { method: "POST", body: formData }).then((res) => {
        if (res.ok) {
          toast("Cheval modifié");
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
        <HorseForm
          horse={horse}
          formRef={form}
          onSubmit={handleSubmit}
          isToSell={horse.isToSell}
        />
      </Modal>
    </>
  );
}
