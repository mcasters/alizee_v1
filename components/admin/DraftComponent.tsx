import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

import s from "@/styles/Draft.module.css";
import Dropdown from "../form/dropdown/dropdown";
import { Option } from "@/interfaces/index";
import DayPickerComponent from "../form/daypicker/DayPickerComponent";
import ImageForm from "../form/imageForm/ImageForm";
import { useSWRConfig } from "swr";

interface Props {
  tags: Option[];
}

const DraftComponent = ({ tags }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [published, setPublished] = useState<boolean>(true);
  const form = useRef(null);
  const { mutate } = useSWRConfig();

  const handleDayChange = (date: any) => {
    setDate(date);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(form.current);
      fetch("/api/post/add", { method: "POST", body: formData }).then((res) => {
        if (res.ok) {
          toast(published ? "Post publié" : "Brouillon enregistré");
          mutate("/api/post");
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  return (
    <>
      <form ref={form} className={s.form} onSubmit={submit}>
        <h2>Créer un post</h2>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          name="title"
          type="text"
          value={title}
        />
        <DayPickerComponent
          handleDayChange={handleDayChange}
          alreadyDay={date}
        />
        <textarea
          cols={80}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          name="content"
          rows={10}
          value={content}
        />
        <input
          id="published"
          type="checkbox"
          name="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          style={{ width: "initial", marginRight: "10px" }}
        />
        <label htmlFor="published">Publier</label>
        <Dropdown placeHolder="Tags..." options={tags} isMulti isSearchable />
        <ImageForm />
        <input
          disabled={!content || !title || !date}
          type="submit"
          value={published ? "Publier" : "Enregistrer le Brouillon"}
        />
        <input type="reset" />
      </form>
    </>
  );
};

export default DraftComponent;
