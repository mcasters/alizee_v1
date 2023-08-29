import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";

import { Horse } from "@/interfaces/index";
import AchievementForm from "@/components/form/AchievementForm/AchievementForm";
import AchievementListComponent from "./AchievementListComponent";

interface Props {
  horse: Horse;
}

export default function AchievementComponent({ horse }: Props) {
  const form = useRef(null);
  const { mutate } = useSWRConfig();
  const api = "/api/achievement/add";
  const apiToUpdate = "/api/horse";

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(form.current);
      fetch(api, { method: "POST", body: formData }).then((res) => {
        if (res.ok) {
          toast("Palmarès ajouté");
          mutate(apiToUpdate);
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <>
      <AchievementListComponent horse={horse} />
      <AchievementForm formRef={form} onSubmit={submit} horse={horse} />;
    </>
  );
}
