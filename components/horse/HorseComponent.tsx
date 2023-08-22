import React from "react";
import Image from "next/image";

import { Horse } from "@/interfaces/index";
import AlbumComponent from "@/components/common/AlbumComponent";
import { getDirnameFromTitle } from "@/utils/common/post";

interface Props {
  horse: Horse;
}
export default function HorseComponent({ horse }: Props) {
  const mainImageFilename = horse.mainImage?.filename || "";
  const albumsImages = horse.images;
  const imageDirname = getDirnameFromTitle(horse.name);
  const path = `/images/chevaux/${imageDirname}`;

  return (
    <article>
      <h1>{horse.name}</h1>
      {mainImageFilename !== "" && (
        <Image
          src={`${path}/${mainImageFilename}`}
          width={horse.mainImage.width}
          height={horse.mainImage.height}
          alt={`Alizée Roussel - ${horse.name}`}
        />
      )}
      <time>{new Date(horse.dateOfBirth).toLocaleDateString()}</time>
      <p>{horse.description}</p>
      <div>
        {albumsImages.length > 0 && (
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
