import s from "./PostListComponent.module.css";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";

type props = {
  id: number;
};
function DeletePostButton({ id }: props) {
  const { mutate } = useSWRConfig();
  const handleDelete = async () => {
    if (confirm("Sûr de vouloir supprimer ?")) {
      fetch(`/api/post/delete/${id}`).then((res) => {
        if (res.ok) {
          toast("Post effacé");
          mutate("/api/post");
        } else toast("Erreur à la suppression");
      });
    }
  };

  return (
    <button onClick={handleDelete} className={s.trash}>
      <FiTrash2 />
    </button>
  );
}

export default DeletePostButton;
