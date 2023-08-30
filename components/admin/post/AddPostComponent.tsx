import React, { useRef } from "react";
import toast from "react-hot-toast";

import { Option } from "@/interfaces/index";
import { useSWRConfig } from "swr";
import PostForm from "@/components/admin/form/postForm/PostForm";

const AddPostComponent = () => {
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

  return <PostForm formRef={form} onSubmit={submit} />;
};

export default AddPostComponent;
