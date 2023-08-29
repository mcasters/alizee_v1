import React, { useState } from "react";

import { Horse } from "@/interfaces/index";
import DayPickerComponent from "@/components/form/daypicker/DayPickerComponent";
import ImageForm from "@/components/form/imageForm/ImageForm";
import s from "../form.module.css";

interface HorseFormProps {
  formRef: React.MutableRefObject<null>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  horse?: Horse;
  isToSell: boolean;
}
export default function HorseForm({
  formRef,
  onSubmit,
  horse,
  isToSell,
}: HorseFormProps) {
  const [name, setName] = useState<string>(horse?.name || "");
  const [sex, setSex] = useState<string>(horse?.sex || "");
  const [colour, setColour] = useState<string>(horse?.colour || "");
  const [breed, setBreed] = useState<string>(horse?.breed || "");
  const [breeder, setBreeder] = useState<string>(horse?.breeder || "");
  const [dateOfBirth, setDateOfBirth] = useState<Date>(
    horse?.dateOfBirth ? new Date(horse?.dateOfBirth) : new Date()
  );
  const [height, setHeight] = useState<number>(horse?.height || 0);
  const [sire, setSire] = useState<string>(horse?.sire || "");
  const [dam, setDam] = useState<string>(horse?.dam || "");
  const [damSire, setDamSire] = useState<string>(horse?.damSire || "");
  const [description, setDescription] = useState<string>(
    horse?.description || ""
  );
  const [owner, setOwner] = useState<string>(horse?.owner || "");
  const [price, setPrice] = useState<string>(horse?.price || "");

  const handleDayChange = (date: any) => {
    setDateOfBirth(date);
  };

  return (
    <form ref={formRef} className={s.form} onSubmit={onSubmit}>
      <h2>{horse ? "Modifier un cheval" : "Ajouter un cheval"}</h2>
      {horse && <input type="hidden" name="id" value={horse.id} />}
      <input type="hidden" name="isToSell" value={String(isToSell)} />
      <input
        autoFocus
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        name="name"
        type="text"
        value={name}
        required
      />
      {!isToSell && (
        <input
          onChange={(e) => setOwner(e.target.value)}
          placeholder="Owner"
          name="owner"
          type="text"
          value={owner}
        />
      )}
      <input
        onChange={(e) => setSex(e.target.value)}
        placeholder="Sex"
        name="sex"
        type="text"
        value={sex}
        required
      />
      <input
        onChange={(e) => setColour(e.target.value)}
        placeholder="Colour"
        name="colour"
        type="text"
        value={colour}
        required
      />
      <input
        onChange={(e) => setBreed(e.target.value)}
        placeholder="Breed"
        name="breed"
        type="text"
        value={breed}
        required
      />
      <input
        onChange={(e) => setBreeder(e.target.value)}
        placeholder="Breeder"
        name="breeder"
        type="text"
        value={breeder}
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
        required
      />
      {isToSell && (
        <input
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          name="price"
          type="text"
          value={price}
        />
      )}
      <input
        onChange={(e) => setSire(e.target.value)}
        placeholder="Sire"
        name="sire"
        type="text"
        value={sire}
        required
      />
      <input
        onChange={(e) => setDam(e.target.value)}
        placeholder="Dam"
        name="dam"
        type="text"
        value={dam}
        required
      />
      <input
        onChange={(e) => setDamSire(e.target.value)}
        placeholder="Dam sire"
        name="damSire"
        type="text"
        value={damSire}
        required
      />
      <textarea
        cols={80}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        name="description"
        rows={10}
        value={description}
      />
      <ImageForm item={horse ? horse : null} />
      <div>
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
