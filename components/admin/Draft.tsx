import Router from "next/router";
import React, { useState } from "react";

import s from "@/styles/Draft.module.css";
import Dropdown from "../form/dropdown/dropdown";
import { Tag, Option } from "@/interfaces/index";
import DayPickerComponent from "../form/daypicker/DayPickerComponent";
import {
  dropDownOptionsToTags,
  tagsToDropDownOptions,
} from "../../utils_client/formUtils";
import ImageForm from "../form/imageForm/ImageForm";

const DraftComponent: React.FC<{ tags: Tag[] }> = ({ tags }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [published, setPublished] = useState<boolean>(true);
  const [images, setImages] = useState<File[]>([]);
  const [draftTags, setDraftTags] = useState<Tag[]>();

  const handleDayChange = (date: any) => {
    setDate(date);
  };

  const handleSelectedTags = (selectedOptions: Option[]) => {
    setDraftTags(dropDownOptionsToTags(selectedOptions));
  };

  const handleImage = (fileTab: File[]) => {
    setImages(fileTab);
  };

  return (
    <>
      <form
        encType="multipart/form-data"
        method="post"
        action="/api/post/file"
        className={s.form}
      >
        <h1>Create Draft</h1>
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
        <Dropdown
          placeHolder="Tags..."
          options={tagsToDropDownOptions(tags)}
          isMulti
          isSearchable
          handleValues={handleSelectedTags}
        />
        <ImageForm isMulti handleImages={handleImage} />
        <input
          disabled={!content || !title || !date}
          type="submit"
          value={published ? "Publier" : "Enregistrer le Brouillon"}
        />
        <a
          className={s.black}
          href="components/admin#"
          onClick={() => Router.push("/")}
        >
          or Cancel
        </a>
      </form>
    </>
  );
};

export default DraftComponent;
