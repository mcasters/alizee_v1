import React, { useState } from "react";

import { Horse } from "@/interfaces/index";
import s from "../form.module.css";

interface Props {
  formRef: React.MutableRefObject<null>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  horse: Horse;
}
export default function AchievementForm(props: Props) {
  const [year, setYear] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  return (
    <form ref={props.formRef} className={s.form} onSubmit={props.onSubmit}>
      <h2>Ajouter un palmarès à {props.horse.name}</h2>
      <input type="hidden" name="horseId" value={props.horse.id} />
      <input
        autoFocus
        onChange={(e) => setYear(Number(e.target.value))}
        placeholder="Year"
        name="year"
        type="text"
        value={year}
        required
      />
      <input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        name="title"
        type="text"
        value={title}
        required
      />
      <input
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        name="location"
        type="text"
        value={location}
        required
      />
      <input
        disabled={!year || !location || !title}
        type="submit"
        value="Enregistrer"
      />
      <input type="reset" />
    </form>
  );
}
