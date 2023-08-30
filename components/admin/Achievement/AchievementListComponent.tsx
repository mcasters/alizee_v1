import { Achievement, Horse } from "@/interfaces/index";
import s from "@/components/admin/common/ListComponent.module.css";
import RowAchievementListComponent from "@/components/admin/Achievement/RowAchievementListComponent";

interface Props {
  horse: Horse;
}
export default function AchievementListComponent({ horse }: Props) {
  const title = `Palmarès de ${horse.name}`;

  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <div className={s.list}>
        {horse.achievements &&
          horse.achievements.map((achievement: Achievement) => {
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
