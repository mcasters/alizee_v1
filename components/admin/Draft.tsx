import Router from "next/router";
import React, { useState } from "react";
import s from "@/styles/Draft.module.css";
import Dropdown from "@/components/form/dropdown";
import { Tag } from "../../interfaces";

const DraftComponent: React.FC<{ tags: Tag[] }> = ({ tags }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [published, setPublished] = useState(false);
  const [images, setImages] = useState("");
  const [draftTags, setDraftTags] = useState("");

  console.log(tags);
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, date, content, published, images, tags: draftTags };
      await fetch(`/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={submitData} className={s.form}>
        <h1>Create Draft</h1>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
        />
        <input
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
          type="text"
          value={date}
        />
        <textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
        />
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        <Dropdown placeHolder="Select..." options={tags} isMulti isSearchable />
        <input
          disabled={!content || !title || !date}
          type="submit"
          value="Create"
        />
        <a className={s.black} href="#" onClick={() => Router.push("/")}>
          or Cancel
        </a>
      </form>
    </>
  );
};

export default DraftComponent;
