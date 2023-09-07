import { Post, Horse } from "@/interfaces/index";
export const isHorse = (i: Horse | Post): boolean =>
  Object.keys(i).includes("name");

export const getDirnameFromNameOrTitle = (name: string) => {
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

export const createItem = <T extends Horse | Post>(
  item: T
): T extends Horse ? Horse : Post => {
  return item as any;
};

export const getPath = (item: any) => {
  if (isHorse(item))
    return `/images/chevaux/${getDirnameFromNameOrTitle(item.name)}`;
  return `/images/actu/${getDirnameFromNameOrTitle(item.title)}`;
};
