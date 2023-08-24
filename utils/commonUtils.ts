import { Post, Horse, HorseToSell } from "@/interfaces/index";
const isHorse = (i: Horse | Post | HorseToSell): boolean => "name" in i;
const isHorseToSell = (i: Horse | Post | HorseToSell): boolean => "price" in i;

export const getDirnameFromString = (name: string) => {
  return name
    .toLowerCase()
    .split(" " || "'")
    .join("_")
    .replace(/[`~!@#$%^&*()|+\-=?;:",.<>\{\}\[\]\\\/]/gi, "")
    .replace(/à/gi, "a")
    .replace(/é/gi, "e")
    .replace(/è/gi, "e")
    .replace(/ê/gi, "e")
    .replace(/ù/gi, "u")
    .replace(/ç/gi, "c");
};

export const getDirname = (item: Horse | Post | HorseToSell) => {
  const name = isHorse(item) ? item.name : item.title;
  return getDirnameFromString(name);
};

export const getPath = (item: Horse | Post | HorseToSell) => {
  if (!isHorse(item)) return `/images/actu/${getDirname(item)}`;
  if (isHorseToSell(item))
    return `/images/chevaux-a-vendre/${getDirname(item)}`;
  return `/images/chevaux/${getDirname(item)}`;
};
