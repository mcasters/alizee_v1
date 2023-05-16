import React, { useState } from "react";
import { Option, Post } from "@/interfaces/index";
import s from "@/styles/Draft.module.css";
import DayPickerComponent from "@/components/form/daypicker/DayPickerComponent";
import Dropdown from "@/components/form/dropdown/dropdown";
import ImageForm from "@/components/form/imageForm/ImageForm";

function PostForm(props: {
  formRef: React.MutableRefObject<null>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  options: Option[];
  post?: Post;
}) {
  const [title, setTitle] = useState<string>(props.post?.title || "");
  const [content, setContent] = useState<string>(props.post?.content || "");
  const [date, setDate] = useState<Date>(
    props.post?.date ? new Date(props.post?.date) : new Date()
  );
  const [published, setPublished] = useState<boolean>(
    props.post?.published || false
  );

  if (props.post) {
  }
  const handleDayChange = (date: any) => {
    setDate(date);
  };

  return (
    <form ref={props.formRef} className={s.form} onSubmit={props.onSubmit}>
      <h2>Créer un post</h2>
      <input
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        name="title"
        type="text"
        value={title}
      />
      <DayPickerComponent handleDayChange={handleDayChange} alreadyDay={date} />
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
        options={props.options}
        isMulti
        isSearchable
        selectedValues={props.post?.tags || []}
      />
      <ImageForm />
      <input
        disabled={!title || !content || !date}
        type="submit"
        value={published ? "Publier" : "Enregistrer le Brouillon"}
      />
      <input type="reset" />
    </form>
  );
}

export default PostForm;
