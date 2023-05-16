import { Image, Post } from "@/interfaces/index";

export const getDirnameFromTitle = (title: string) => {
  return title
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
