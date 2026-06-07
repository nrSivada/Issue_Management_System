import { useState } from "react";
import api from "../services/api";

interface Props {
  issueId: string;
  onCommentAdded: () => void;
}

const CommentForm = ({
  issueId,
  onCommentAdded,
}: Props) => {
  const [content, setContent] =
    useState("");

  const addComment = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await api.post(
        `/issues/${issueId}/comments`,
        { content }
      );

      setContent("");

      onCommentAdded();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={addComment}
      className="mt-4"
    >
      <textarea
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        placeholder="Add comment..."
        className="border p-2 w-full rounded"
        required
      />

      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;