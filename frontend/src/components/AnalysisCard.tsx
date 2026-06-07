import type { Analysis } from "../types/analysis";

interface Props {
  analysis: Analysis;
}

const AnalysisCard = ({
  analysis,
}: Props) => {
  return (
    <div className="mt-8 border rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">
        AI Analysis
      </h2>

      <div className="mb-4">
        <h3 className="font-semibold">
          Summary
        </h3>

        <p>{analysis.summary}</p>
      </div>

      <div>
        <h3 className="font-semibold">
          Recommendation
        </h3>

        <p>{analysis.recommendation}</p>
      </div>
    </div>
  );
};

export default AnalysisCard;