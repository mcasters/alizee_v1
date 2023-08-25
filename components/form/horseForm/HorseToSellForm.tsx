import React, { useState } from "react";

import { HorseToSell } from "@/interfaces/index";
import s from "../form.module.css";
import DayPickerComponent from "@/components/form/daypicker/DayPickerComponent";
import ImageForm from "@/components/form/imageForm/ImageForm";

interface HorseFormProps {
  formRef: React.MutableRefObject<null>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  horse?: HorseToSell;
}
export default function HorseToSellForm(props: HorseFormProps) {
  const [name, setName] = useState<string>(props.horse?.name || "");
  const [breed, setBreed] = useState<string>(props.horse?.breed || "");
  const [price, setPrice] = useState<string>(props.horse?.price || "");
  const [sex, setSex] = useState<string>(props.horse?.sex || "");
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
      <h2>
        {props.horse
          ? "Modifier un cheval à vendre"
          : "Ajouter un cheval à vendre"}
      </h2>
      {props.horse && <input type="hidden" name="id" value={props.horse.id} />}
      <input
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        name="name"
        type="text"
        value={name}
      />
      <input
        onChange={(e) => setBreed(e.target.value)}
        placeholder="Breed"
        name="breed"
        type="text"
        value={breed}
      />
      <input
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        name="price"
        type="text"
        value={price}
      />
      <input
        onChange={(e) => setSex(e.target.value)}
        placeholder="Sex"
        name="sex"
        type="text"
        value={sex}
      />
      <input
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
        onChange={(e) => setHeight(parseInt(e.target.value))}
        placeholder="Height"
        name="height"
        type="number"
        value={height}
      />
      <input
        onChange={(e) => setSire(e.target.value)}
        placeholder="Sire"
        name="sire"
        type="text"
        value={sire}
      />
      <input
        onChange={(e) => setDam(e.target.value)}
        placeholder="Dam"
        name="dam"
        type="text"
        value={dam}
      />
      <input
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
      <ImageForm item={props.horse || null} />
      <div className={s.separate}>
        <input
          disabled={
            !name || !dateOfBirth || !sex || !colour || !height || !price
          }
          type="submit"
          value="Enregistrer"
        />
        <input type="reset" />
      </div>
    </form>
  );
}
