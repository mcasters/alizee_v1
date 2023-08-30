import { Post, Horse } from "@/interfaces/index";
export const getIsHorse = (i: Horse | Post): boolean => "name" in i;

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
  const name = getIsHorse(item) ? item.name : item.title;
  return getDirnameFromString(name);
};

export const getPath = (item: Horse | Post) => {
  if (getIsHorse(item)) return `/images/chevaux/${getDirname(item)}`;
  return `/images/actu/${getDirname(item)}`;
};
