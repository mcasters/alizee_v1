import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

import { Option } from "@/interfaces/index";
import { useSWRConfig } from "swr";
import PostForm from "@/components/form/postForm/PostForm";

type AddPostProps = {
  tags: Option[];
};

const AddPostComponent = (props: AddPostProps) => {
  const form = useRef(null);
  const { mutate } = useSWRConfig();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(form.current);
      fetch("/api/post/add", { method: "POST", body: formData }).then((res) => {
        if (res.ok) {
          toast("Post publié");
          mutate("/api/post");
        } else toast("Erreur à l'enregistrement");
      });
    }
  };

  return <PostForm formRef={form} onSubmit={submit} options={props.tags} />;
};

export default AddPostComponent;
