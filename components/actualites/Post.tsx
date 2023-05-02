import { Post } from "../../interfaces";

type PostProp = {
  post: Post;
};
export default function PostComponent({ post }: PostProp) {
  return (
    <article>
      <h1>{post.title}</h1>
      <time>{new Date(post.date).toLocaleDateString()}</time>
      <p>{post.content}</p>
    </article>
  );
}
