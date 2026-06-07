import type { Comment } from "../types/comment";

interface Props {
  comments: Comment[];
}

const Comments = ({ comments }: Props) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Comments
      </h2>

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="border rounded p-3 mb-2"
          >
            <p>{comment.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;