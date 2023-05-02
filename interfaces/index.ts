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
  tags: [string];
  viewCount: string;
};

export type Image = {
  id: number;
  filename: string;
  width: number;
  height: number;
  postId: string;
  post: Post;
};

export type Tag = {
  id: number;
  tag: string;
  post: [Post];
};

export type ResponseError = {
  message: string;
};
