import React, { useState } from "react";

import { Horse } from "@/interfaces/index";
import s from "../form.module.css";
import DayPickerComponent from "@/components/form/daypicker/DayPickerComponent";
import ImageForm from "@/components/form/imageForm/ImageForm";

interface HorseFormProps {
  formRef: React.MutableRefObject<null>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  horse?: Horse;
}
function HorseForm(props: HorseFormProps) {
  const [name, setName] = useState<string>(props.horse?.name || "");
  const [owner, setOwner] = useState<string>(props.horse?.owner || "");
  const [sex, setsex] = useState<string>(props.horse?.sex || "");
  const [colour, setColour] = useState<string>(props.horse?.colour || "");
  const [dateOfBirth, setDateOfBirth] = useState<Date>(
    props.horse?.dateOfBirth ? new Date(props.horse?.dateOfBirth) : new Date()
  );
  const [height, setHeight] = useState<number>(props.horse?.height || 0);
  const [sire, setSire] = useState<string>(props.horse?.sire || "");
  const [dam, setDam] = useState<string>(props.horse?.dam || "");
  const [damSire, setDamSire] = useState<string>(props.horse?.damSire || "");
  const [description, setDescription] = useState<string>(
    props.horse?.description || ""
  );

  const handleDayChange = (date: any) => {
    setDateOfBirth(date);
  };

  return (
    <form ref={props.formRef} className={s.form} onSubmit={props.onSubmit}>
      <h2>{props.horse ? "Modifier un cheval" : "Ajouter un cheval"}</h2>
      {props.horse && <input type="hidden" name="id" value={props.horse.id} />}
      <input
        autoFocus
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        name="name"
        type="text"
        value={name}
      />
      <input
        autoFocus
        onChange={(e) => setOwner(e.target.value)}
        placeholder="Owner"
        name="owner"
        type="text"
        value={owner}
      />
      <input
        autoFocus
        onChange={(e) => setsex(e.target.value)}
        placeholder="Sex"
        name="sex"
        type="text"
        value={sex}
      />
      <input
        autoFocus
        onChange={(e) => setColour(e.target.value)}
        placeholder="Colour"
        name="colour"
        type="text"
        value={colour}
      />
      <DayPickerComponent
        handleDayChange={handleDayChange}
        alreadyDay={dateOfBirth}
        fieldName="dateOfBirth"
      />
      <input
        autoFocus
        onChange={(e) => setHeight(parseInt(e.target.value))}
        placeholder="Height"
        name="height"
        type="number"
        value={height}
      />
      <input
        autoFocus
        onChange={(e) => setSire(e.target.value)}
        placeholder="Sire"
        name="sire"
        type="text"
        value={sire}
      />
      <input
        autoFocus
        onChange={(e) => setDam(e.target.value)}
        placeholder="Dam"
        name="dam"
        type="text"
        value={dam}
      />
      <input
        autoFocus
        onChange={(e) => setDamSire(e.target.value)}
        placeholder="Dam sire"
        name="damSire"
        type="text"
        value={damSire}
      />
      <textarea
        cols={80}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        name="description"
        rows={10}
        value={description}
      />
      <ImageForm item={props.horse ? props.horse : null} />
      <div className={s.separate}>
        <input
          disabled={
            !name || !description || !dateOfBirth || !sex || !colour || !height
          }
          type="submit"
          value="Enregistrer"
        />
        <input type="reset" />
      </div>
    </form>
  );
}

export default HorseForm;
