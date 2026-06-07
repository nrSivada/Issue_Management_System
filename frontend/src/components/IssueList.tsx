import type { Issue } from "../types/issue";
import { Link } from "react-router-dom";

interface IssueListProps {
  issues: Issue[];
}

const IssueList = ({
  issues,
}: IssueListProps) => {
  if (issues.length === 0) {
    return (
      <div className="mt-6 text-center">
        <p className="text-gray-500">
          No issues found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 mt-6">
      {issues.map((issue) => (
        <Link
          to={`/issues/${issue.id}`}
          key={issue.id}
        >
          <div className="border rounded-lg p-4 shadow hover:bg-gray-50 transition">
            <h2 className="text-xl font-semibold">
              {issue.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {issue.description}
            </p>

            <div className="flex gap-3 mt-4">
              <span className="px-3 py-1 bg-blue-100 rounded">
                {issue.status}
              </span>

              <span className="px-3 py-1 bg-red-100 rounded">
                {issue.priority}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default IssueList;