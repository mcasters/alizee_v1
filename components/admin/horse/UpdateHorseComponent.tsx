import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";

import HorseForm from "@/components/form/horseForm/HorseForm";
import { Horse, HorseToSell } from "@/interfaces/index";
import HorseToSellForm from "@/components/form/horseForm/HorseToSellForm";

interface UpdateProps {
  isToSell: boolean;
  horse: Horse | HorseToSell;
}

export default function UpdateHorseComponent({ isToSell, horse }: UpdateProps) {
  const form = useRef(null);
  const { mutate } = useSWRConfig();
  const api = isToSell ? "/api/horse-to-sell/update" : "/api/horse/update";
  const apiToUpdate = isToSell ? "/api/horse-to-sell" : "/api/horse";

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

  return isToSell ? (
    <HorseToSellForm formRef={form} onSubmit={submit} horse={horse} />
  ) : (
    <HorseForm formRef={form} onSubmit={submit} horse={horse} />
  );
}
