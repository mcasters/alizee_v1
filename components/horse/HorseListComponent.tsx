import Link from "next/link";
import type { Horse } from "@/interfaces/index";
import Image from "next/image";
import { getDirnameFromTitle } from "@/utils/common/post";

type PostProps = {
  horse: Horse;
};

export default function HorseListComponent({ horse }: PostProps) {
  const imageDirname = getDirnameFromTitle(horse.name);
  const path = `/images/chevaux/${imageDirname}`;

  return (
    <li>
      <Link href="/chevaux/[id]" as={`/chevaux/${horse.id}`}>
        {horse.name}
      </Link>
      <time>{new Date(horse.dateOfBirth).toLocaleDateString()}</time>
      {horse.mainImage && (
        <Image
          src={`${path}/${horse.mainImage.filename}`}
          width={horse.mainImage.width}
          height={horse.mainImage.height}
          alt={`Alizée Roussel - ${horse.name}`}
        />
      )}
    </li>
  );
}
