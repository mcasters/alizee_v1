import React, { useState } from "react";
import { Option, Post } from "@/interfaces/index";
import s from "@/styles/Draft.module.css";
import DayPickerComponent from "@/components/form/daypicker/DayPickerComponent";
import Dropdown from "@/components/form/dropdown/dropdown";
import ImageForm from "@/components/form/imageForm/ImageForm";

interface PostFormProps {
  formRef: React.MutableRefObject<null>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  options: Option[];
  post?: Post;
}
function PostForm(props: PostFormProps) {
  const [title, setTitle] = useState<string>(props.post?.title || "");
  const [content, setContent] = useState<string>(props.post?.content || "");
  const [date, setDate] = useState<Date>(
    props.post?.date ? new Date(props.post?.date) : new Date()
  );

  if (props.post) {
  }
  const handleDayChange = (date: any) => {
    setDate(date);
  };

  return (
    <form ref={props.formRef} className={s.form} onSubmit={props.onSubmit}>
      <h2>{props.post ? "Modifier un post" : "Ajouter un post"}</h2>
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
        fieldName="date"
      />
      <textarea
        cols={80}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        name="content"
        rows={10}
        value={content}
      />
      <label htmlFor="published">Publier</label>
      <Dropdown
        placeHolder="Tags..."
        options={props.options}
        isMulti
        isSearchable
        selectedValues={props.post?.tags || []}
      />
      <ImageForm />
      <input
        disabled={!title || !content || !date}
        type="submit"
        value="Enregistrer"
      />
      <input type="reset" />
    </form>
  );
}

export default PostForm;
