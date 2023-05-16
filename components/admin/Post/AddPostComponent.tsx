import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

import { Option } from "@/interfaces/index";
import { useSWRConfig } from "swr";
import PostForm from "@/components/form/postForm/PostForm";
import { Post } from "@/interfaces/index";

interface Props {
  tags: Option[];
}

const AddPostComponent = ({ tags }: Props) => {
  const [published, setPublished] = useState<boolean>(true);
  const form = useRef(null);
  const { mutate } = useSWRConfig();
  const post: Post = {
    id: 0,
    title: "",
    content: "",
    date: "",
    createdAt: "",
    updatedAt: "",
    tags: [{ label: "", id: 0 }],
    published: false,
    viewCount: "",
    mainImage: undefined,
    images: [],
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
      <PostForm formRef={form} onSubmit={submit} options={tags} />
    </>
  );
};

export default AddPostComponent;
