import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";

import HorseForm from "@/components/form/horseForm/HorseForm";
import { Horse } from "@/interfaces/index";

interface UpdateProps {
  horse: Horse;
}

export default function UpdateHorseComponent({ horse }: UpdateProps) {
  const form = useRef(null);
  const { mutate } = useSWRConfig();
  const api = "/api/horse/update";
  const apiToUpdate = "/api/horse";

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
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
    <HorseForm
      formRef={form}
      onSubmit={submit}
      horse={horse}
      isToSell={horse.isToSell}
    />
  );
}
