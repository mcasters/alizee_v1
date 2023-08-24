import React from "react";
import Image from "next/image";

import { HorseToSell } from "@/interfaces/index";
import AlbumComponent from "@/components/common/AlbumComponent";
import { getPath } from "@/utils/commonUtils";

interface Props {
  horse: HorseToSell;
}
export default function HorseToSellComponent({ horse }: Props) {
  const path = getPath(horse);

  return (
    <article>
      <h1>{horse.name}</h1>
      {horse.mainImage && (
        <Image
          src={`${path}/${horse.mainImage.filename}`}
          width={horse.mainImage.width}
          height={horse.mainImage.height}
          alt={`Alizée Roussel - ${horse.name}`}
        />
      )}
      <time>{new Date(horse.dateOfBirth).toLocaleDateString()}</time>
      <p>{horse.description}</p>
      <p>{horse.price}</p>
      <div>
        {horse.images && (
          <AlbumComponent
            images={horse.images}
            path={path}
            title={horse.name}
          />
        )}
      </div>
    </article>
  );
}
