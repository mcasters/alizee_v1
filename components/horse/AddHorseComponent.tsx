import React, { useRef } from "react";
import toast from "react-hot-toast";

import { useSWRConfig } from "swr";
import HorseForm from "@/components/form/horseForm/HorseForm";

export default function AddHorseComponent() {
  const form = useRef(null);
  const { mutate } = useSWRConfig();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(form.current);
      fetch("/api/horse/add", { method: "POST", body: formData }).then(
        (res) => {
          if (res.ok) {
            toast("Cheval ajouté");
            mutate("/api/horse");
          } else toast("Erreur à l'enregistrement");
        }
      );
    }
  };

  return <HorseForm formRef={form} onSubmit={submit} />;
}
