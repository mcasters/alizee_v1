import React from "react";
import Image from "next/image";

import { Horse } from "@/interfaces/index";
import { getPath } from "@/utils/commonUtils";
import s from "./HorseComponent.module.css";
import Slider from "@/components/image/Slider";

interface Props {
  horse: Horse;
}
export default function HorseComponent({ horse }: Props) {
  const path = getPath(horse);

  return (
    <section className={s.section}>
      <figure className={s.figure}>
        <img src={`/${horse.name}.jpeg`} />
      </figure>
      <article id={`${horse.id}`} className={s.article}>
        <h1>{horse.name}</h1>
        <p className={s.info}>
          {horse.sex} {horse.colour.toLowerCase()}, {horse.height} cm,{" "}
          {horse.sex === "jument" ? "née le " : "né en "}
          <time>{new Date(horse.dateOfBirth).getFullYear()}</time>, appartenant
          à {horse.owner}. <br />
          <br />
          Par {horse.sire} et {horse.dam} par {horse.damSire}
        </p>
        {horse.mainImage && (
          <Image
            src={`${path}/${horse.mainImage.filename}`}
            width={horse.mainImage.width}
            height={horse.mainImage.height}
            alt={horse.name}
            className={s.mainImage}
          />
        )}

        <p className={s.description}>{horse.description}</p>
        <div>
          {horse.images && (
            <Slider images={horse.images} path={path} alt={horse.name} />
          )}
        </div>
      </article>
    </section>
  );
}
