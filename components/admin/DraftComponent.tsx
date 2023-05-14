import Router from "next/router";
import React, { useState } from "react";

import s from "@/styles/Draft.module.css";
import Dropdown from "../form/dropdown/dropdown";
import { Option, Post } from "@/interfaces/index";
import DayPickerComponent from "../form/daypicker/DayPickerComponent";
import ImageForm from "../form/imageForm/ImageForm";

interface Props {
  tags: Option[];
}

const DraftComponent = ({ tags }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [published, setPublished] = useState<boolean>(true);

  const handleDayChange = (date: any) => {
    setDate(date);
  };

  return (
    <>
      <form
        encType="multipart/form-data"
        method="post"
        action="/api/post/add"
        className={s.form}
      >
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
        <ImageForm isMulti />
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
