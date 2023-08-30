import React, { useState } from "react";
import { Option, Post } from "@/interfaces/index";
import DayPickerComponent from "@/components/admin/form/daypicker/DayPickerComponent";
import Dropdown from "@/components/admin/form/dropdown/dropdown";
import ImageForm from "@/components/admin/form/imageForm/ImageForm";
import s from "../form.module.css";

type PostFormProps = {
  formRef: React.MutableRefObject<null>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  post?: Post;
};
function PostForm(props: PostFormProps) {
  const [title, setTitle] = useState<string>(props.post?.title || "");
  const [content, setContent] = useState<string>(props.post?.content || "");
  const [date, setDate] = useState<Date>(
    props.post?.date ? new Date(props.post?.date) : new Date()
  );

  const handleDayChange = (date: any) => {
    setDate(date);
  };

  return (
    <form ref={props.formRef} className={s.form} onSubmit={props.onSubmit}>
      <h2>{props.post ? "Modifier un post" : "Ajouter un post"}</h2>
      {props.post && <input type="hidden" name="id" value={props.post.id} />}
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
      <ImageForm item={props.post ? props.post : null} />
      <div>
        <input
          disabled={!title || !content || !date}
          type="submit"
          value="Enregistrer"
        />
        <input type="reset" />
      </div>
    </form>
  );
}

export default PostForm;
