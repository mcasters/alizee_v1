import s from "./PostListComponent.module.css";
import { FiTrash2 } from "react-icons/fi";

function PostDeleteButton(props: { postId: number }) {
  return (
    <form method="post" action="/api/post/delete" className={s.deleteForm}>
      <input id="id" name="id" type="hidden" value={props.postId} />
      <button type="submit" className={s.trash}>
        <FiTrash2 />
      </button>
    </form>
  );
}

export default PostDeleteButton;
