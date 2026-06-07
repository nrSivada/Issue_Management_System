import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

import type { Issue } from "../types/issue";
import type { Comment } from "../types/comment";

import Comments from "../components/Comments";
import CommentForm from "../components/CommentForm";

import type { Analysis } from "../types/analysis";
import AnalysisCard from "../components/AnalysisCard";

import { Link } from "react-router-dom";

const IssueDetails = () => {
  const { id } = useParams();

  const [issue, setIssue] =
    useState<Issue | null>(null);

  const [status, setStatus] =
    useState("");

  const [comments, setComments] =
    useState<Comment[]>([]);

    const [analysis, setAnalysis] =
  useState<Analysis | null>(null);

const [loadingAnalysis, setLoadingAnalysis] =
  useState(false);

  const fetchIssue = async () => {
    try {
      const response =
        await api.get(`/issues/${id}`);

      setIssue(response.data);
      setStatus(response.data.status);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get(
        `/issues/${id}/comments`
      );

      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const generateAnalysis = async () => {
  try {
    setLoadingAnalysis(true);

    const response =
      await api.post(
        `/issues/${id}/analyze`
      );

    setAnalysis(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingAnalysis(false);
  }
};

  const updateStatus = async () => {
    try {
      await api.patch(
        `/issues/${id}`,
        {
          status,
        }
      );

      fetchIssue();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteIssue = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this issue?"
  );

  if (!confirmed) return;

  try {
    await api.delete(`/issues/${id}`);

    window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchIssue();
    fetchComments();
  }, [id]);

  if (!issue) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link
          to="/"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          ← Back
        </Link>
        </div>

      <h1 className="text-3xl font-bold mb-4">
        {issue.title}
      </h1>
      

      <p className="mb-4">
        {issue.description}
      </p>

      <div className="flex gap-3 mb-6">
        <span className="px-3 py-1 bg-blue-100 rounded">
          {issue.status}
        </span>

        <span className="px-3 py-1 bg-red-100 rounded">
          {issue.priority}
        </span>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">
          Update Status
        </h2>


        <div className="flex gap-3">
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border p-2 rounded"
          >
            <option value="OPEN">
              OPEN
            </option>

            <option value="IN_PROGRESS">
              IN_PROGRESS
            </option>

            <option value="RESOLVED">
              RESOLVED
            </option>
          </select>

          <button
            onClick={updateStatus}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
      <div className="mt-6">
  <button
    onClick={deleteIssue}
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Delete Issue
  </button>
</div>

      <Comments comments={comments} />

      <CommentForm
        issueId={id!}
        onCommentAdded={fetchComments}
      />

      <div className="mt-8">
  <button
    onClick={generateAnalysis}
    disabled={loadingAnalysis}
    className="bg-purple-600 text-white px-4 py-2 rounded"
  >
    {loadingAnalysis
      ? "Generating..."
      : "Generate AI Analysis"}
  </button>
</div>

{analysis && (
  <AnalysisCard
    analysis={analysis}
  />
)}
    </div>
  );
};

export default IssueDetails;