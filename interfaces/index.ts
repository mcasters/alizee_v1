export type User = {
  id: number;
  email: string;
  isAdmin: boolean;
};

export type Post = {
  id: number;
  title: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  published: boolean;
  tags: [Option];
  viewCount: string;
  mainImage: Image;
  images: Image[];
};

export type Horse = {
  id: number;
  name: string;
  owner: string;
  sex: string;
  colour: string;
  dateOfBirth: Date;
  height: number;
  sire: string;
  dam: string;
  damSire: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  mainImage: Image;
  images: Image[];
};

export type Image = {
  id: number;
  filename: string;
  width: number;
  height: number;
};

export type ResponseError = {
  message: string;
};

export type Option = {
  id: number;
  label: string;
};

export const DataType = {
  POST: "post",
  HORSE: "horse",
  HORSE_TO_SELL: "post-to-sell",
};

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
