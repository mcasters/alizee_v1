import { FiTrash2 } from "react-icons/fi";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import s from "@/components/admin/common/ListComponent.module.css";

type props = {
  id: number;
};
function DeletePostButton({ id }: props) {
  const { mutate } = useSWRConfig();
  const handleDelete = async () => {
    if (confirm("Sûr de vouloir supprimer ?")) {
      fetch(`/api/post/delete/${id}`).then((res) => {
        if (res.ok) {
          toast("Post supprimé");
          mutate("/api/post");
        } else toast("Erreur à la suppression");
      });
    }
  };

  return (
    <button onClick={handleDelete} className={s.iconButton}>
      <FiTrash2 />
    </button>
  );
}

export default DeletePostButton;
