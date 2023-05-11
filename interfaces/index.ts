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
  published: string;
  images: [Image];
  tags: [Option];
  viewCount: string;
};

export type Image = {
  id: number;
  filename: string;
  width: number;
  height: number;
  isMain: boolean;
  postId: string;
  post: Post;
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
  HORSE_TO_SELL: "horse-to-sell",
};

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
