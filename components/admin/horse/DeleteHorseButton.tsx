import s from "@/components/admin/common/ListComponent.module.css";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";

type props = {
  id: number;
};
export default function DeleteHorseButton({ id }: props) {
  const { mutate } = useSWRConfig();
  const handleDelete = async () => {
    if (confirm("Sûr de vouloir supprimer ?")) {
      fetch(`/api/horse/delete/${id}`).then((res) => {
        if (res.ok) {
          toast("Cheval effacé");
          mutate("/api/horse");
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
