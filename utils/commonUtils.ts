import { Post, Horse } from "@/interfaces/index";
const isHorse = (i: Horse | Post): boolean => "name" in i;

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

export const getDirname = (item: Horse | Post) => {
  const name = isHorse(item) ? item.name : item.title;
  return getDirnameFromString(name);
};

export const getPath = (item: Horse | Post) => {
  return isHorse(item)
    ? `/images/chevaux/${getDirname(item)}`
    : `/images/actu/${getDirname(item)}`;
};
