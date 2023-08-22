import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";

import { Option } from "@/interfaces/index";
import PostForm from "@/components/form/postForm/PostForm";
import { Post } from "@/interfaces/index";

interface UpdateProps {
  post: Post;
  tags: Option[];
}

const UpdatePostComponent = (props: UpdateProps) => {
  const form = useRef(null);
  const { mutate } = useSWRConfig();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current && confirm("Tu confirmes ?")) {
      const formData = new FormData(form.current);
      fetch("/api/post/update", { method: "POST", body: formData }).then(
        (res) => {
          if (res.ok) {
            toast("Post modifié");
            mutate("/api/post");
          } else toast("Erreur à l'enregistrement");
        }
      );
    }
  };

  return (
    <PostForm
      formRef={form}
      onSubmit={submit}
      options={props.tags}
      post={props.post}
    />
  );
};

export default UpdatePostComponent;
