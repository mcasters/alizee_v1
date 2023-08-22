import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";

import HorseForm from "@/components/form/horseForm/HorseForm";
import { Horse } from "@/interfaces/index";

interface UpdateProps {
  horse: Horse;
}

export default function UpdateHorseComponent(props: UpdateProps) {
  const form = useRef(null);
  const { mutate } = useSWRConfig();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(form.current);
      fetch("/api/horse/update", { method: "POST", body: formData }).then(
        (res) => {
          if (res.ok) {
            toast("Cheval modifié");
            mutate("/api/horse");
          } else toast("Erreur à l'enregistrement");
        }
      );
    }
  };

  return <HorseForm formRef={form} onSubmit={submit} horse={props.horse} />;
}
