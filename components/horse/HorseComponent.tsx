import React from "react";
import Image from "next/image";

import { Horse } from "@/interfaces/index";
import { getPath } from "@/utils/commonUtils";
import Slider from "@/components/image/Slider";
import s from "./HorseComponent.module.css";

interface Props {
  horse: Horse;
  isToSell: boolean;
}
export default function HorseComponent({ horse, isToSell }: Props) {
  const path = getPath(horse);

  return (
    <section className={s.section}>
      <figure className={s.figure}>
        <Image
          src={`${path}/${horse.mainImage.filename}`}
          fill
          alt={horse.name}
        />
      </figure>
      <article id={`${horse.id}`} className={s.article}>
        <h1>{horse.name}</h1>
        <p className={s.info}>
          {horse.sex} {horse.colour.toLowerCase()}, {horse.breed},{" "}
          {horse.height} cm, {horse.sex === "jument" ? "née en " : "né en "}
          <time>{new Date(horse.dateOfBirth).getFullYear()}.</time>
          <br />
          <br />
          Par {horse.sire} et {horse.dam} par {horse.damSire}.
          {horse.breeder && (
            <>
              <br />
              <br />
              Éleveur : {horse.breeder}
            </>
          )}
          {!isToSell && horse.owner && (
            <>
              <br /> Propriétaire : {horse.owner}
            </>
          )}
          {isToSell && (
            <>
              <br />
              <br />
              <br /> Prix : {horse.price}
            </>
          )}
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
