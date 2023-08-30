import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";

import s from "@/components/admin/common/ListComponent.module.css";

type props = {
  id: number;
};
export default function DeleteHorseButton({ id }: props) {
  const { mutate } = useSWRConfig();
  const api = "/api/horse/delete";
  const apiToUpdate = "/api/horse";
  const handleDelete = async () => {
    if (confirm("Sûr de vouloir supprimer ?")) {
      fetch(`${api}/${id}`).then((res) => {
        if (res.ok) {
          toast("Cheval effacé");
          mutate(apiToUpdate);
        } else toast("Erreur à la suppression");
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={s.iconButton}
      aria-label="Supprimer"
    >
      <FiTrash2 />
    </button>
  );
}
