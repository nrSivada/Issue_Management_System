import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import IssueList from "../components/IssueList";

import type { Issue } from "../types/issue";

const Dashboard = () => {
  const [issues, setIssues] = useState<
    Issue[]
  >([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [priorityFilter, setPriorityFilter] =
    useState("ALL");

  const fetchIssues = async () => {
    try {
      const response =
        await api.get("/issues");

      setIssues(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const filteredIssues = issues.filter(
    (issue) => {
      const matchesSearch =
        issue.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "ALL" ||
        issue.status === statusFilter;

      const matchesPriority =
        priorityFilter === "ALL" ||
        issue.priority ===
          priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    }
  );

  const totalIssues = issues.length;

  const openIssues =
    issues.filter(
      (i) => i.status === "OPEN"
    ).length;

  const resolvedIssues =
    issues.filter(
      (i) => i.status === "RESOLVED"
    ).length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">
          Issue Dashboard
        </h1>

        <Link
          to="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Issue
        </Link>
      </div>

    
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold">
            Total Issues
          </h3>

          <p className="text-3xl font-bold">
            {totalIssues}
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold">
            Open Issues
          </h3>

          <p className="text-3xl font-bold">
            {openIssues}
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold">
            Resolved Issues
          </h3>

          <p className="text-3xl font-bold">
            {resolvedIssues}
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search issues..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-2 rounded flex-1"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="border p-2 rounded"
        >
          <option value="ALL">
            All Status
          </option>

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

        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(
              e.target.value
            )
          }
          className="border p-2 rounded"
        >
          <option value="ALL">
            All Priority
          </option>

          <option value="LOW">
            LOW
          </option>

          <option value="MEDIUM">
            MEDIUM
          </option>

          <option value="HIGH">
            HIGH
          </option>
        </select>
      </div>

      <IssueList
        issues={filteredIssues}
      />
    </div>
  );
};

export default Dashboard;