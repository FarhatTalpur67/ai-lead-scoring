type ToolStatusCardProps = {
  status: "streaming" | "input" | "success" | "error";
  message: string;
};

export default function ToolStatusCard({
  status,
  message,
}: ToolStatusCardProps) {
  const styles = {
    streaming: "bg-blue-100 text-blue-700",
    input: "bg-yellow-100 text-yellow-700",
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
  };

  const titles = {
    streaming: "Processing Tool Input",
    input: "Input Received",
    success: "Tool Completed",
    error: "Tool Failed",
  };

  return (
    <div className={`mt-4 rounded-lg p-4 ${styles[status]}`}>
      <h3 className="font-bold">
        {titles[status]}
      </h3>

      <p className="mt-1">
        {message}
      </p>
    </div>
  );
}