export type User = {
  id: number;
  email: string;
  isAdmin: boolean;
};

export type Post = {
  type: string;
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
  type: string;
  id: number;
  name: string;
  owner: string | null;
  sex: string;
  colour: string;
  dateOfBirth: Date;
  breed: string;
  breeder: string | null;
  price: string | null;
  height: number;
  sire: string;
  dam: string;
  damSire: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  mainImage: Image;
  images: Image[];
  achievements: Achievement[];
  isToSell: boolean;
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

export type Achievement = {
  type: string;
  id: number;
  year: number;
  title: string;
  location: string;
};

export const DataType = {
  POST: "post",
  HORSE: "horse",
  HORSE_TO_SELL: "post-to-sell",
};
