import { Post } from "@/interfaces/index";
import s from "./PostListComponent.module.css";
import PostListRawComponent from "@/components/admin/PostListRawComponent";

interface Props {
  posts: Post[];
}

const PostListComponent = ({ posts }: Props) => {
  return (
    <div className={s.listContainer}>
      <h2>Liste de posts</h2>
      <div className={s.postList}>
        {posts &&
          posts.map((post) => {
            return <PostListRawComponent key={post.id} post={post} />;
          })}
      </div>
    </div>
  );
};

export default PostListComponent;
