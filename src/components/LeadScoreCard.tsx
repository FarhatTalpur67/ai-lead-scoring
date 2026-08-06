type LeadScoreCardProps = {
  data: {
    leadName: string;
    company: string;
    industry: string;
    score: number;
    priority: "High" | "Medium" | "Low";
    recommendation: string;
  };
};

export default function LeadScoreCard({ data }: LeadScoreCardProps) {
  return (
    <div className="mt-6 rounded-xl border p-6 shadow-sm">
      <h2 className="text-xl font-bold">
        Lead Score Result
      </h2>

      <div className="mt-4 space-y-2">
        <p>
          <strong>Name:</strong> {data.leadName}
        </p>

        <p>
          <strong>Company:</strong> {data.company}
        </p>

        <p>
          <strong>Industry:</strong> {data.industry}
        </p>

        <p>
          <strong>Score:</strong> {data.score}/100
        </p>

        <p>
          <strong>Priority:</strong> {data.priority}
        </p>

        <p>
          <strong>Recommendation:</strong>{" "}
          {data.recommendation}
        </p>
      </div>
    </div>
  );
}