import { FaAward } from "react-icons/fa";

import useModal from "@/components/form/modal/useModal";
import Modal from "@/components/form/modal/Modal";
import s from "@/components/admin/common/ListComponent.module.css";
import { Horse } from "@/interfaces/index";
import AchievementComponent from "@/components/admin/Achievement/AchievementComponent";

type props = {
  horse: Horse;
};
export default function AchievementsButton({ horse }: props) {
  const { isOpen, toggle } = useModal();

  return (
    <>
      <button onClick={() => toggle()} className={s.iconButton}>
        <FaAward />
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <AchievementComponent horse={horse} />
      </Modal>
    </>
  );
}
