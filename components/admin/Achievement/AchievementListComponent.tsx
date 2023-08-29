import { Horse, HorseToSell } from "@/interfaces/index";
import s from "@/components/admin/common/ListComponent.module.css";
import RowAchievementListComponent from "@/components/admin/Achievement/RowAchievementListComponent";

interface Props {
  horse: Horse | HorseToSell;
}
export default function AchievementListComponent({ horse }: Props) {
  const title = "Palmarès";

  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <div className={s.list}>
        {horse.achievements &&
          horse.achievements.map((achievement) => {
            return (
              <RowAchievementListComponent
                key={achievement.id}
                achievement={achievement}
              />
            );
          })}
      </div>
    </div>
  );
}
