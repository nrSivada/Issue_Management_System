import { useState } from "react";
import api from "../services/api";

interface Props {
  onIssueCreated: () => void;
}

const IssueForm = ({
  onIssueCreated,
}: Props) => {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("MEDIUM");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await api.post("/issues", {
        title,
        description,
        priority,
      });

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");

      onIssueCreated();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-lg p-4 mb-6"
    >
      <h2 className="text-2xl font-bold mb-4">
        Create Issue
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="border p-2 w-full mb-3"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        className="border p-2 w-full mb-3"
        required
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
        className="border p-2 w-full mb-3"
      >
        <option value="LOW">LOW</option>
        <option value="MEDIUM">
          MEDIUM
        </option>
        <option value="HIGH">HIGH</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Issue
      </button>
    </form>
  );
};

export default IssueForm;