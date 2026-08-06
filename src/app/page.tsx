"use client";

import { useState } from "react";
import LeadScoreCard from "@/components/LeadScoreCard";
import ToolStatusCard from "@/components/ToolStatusCard";

type LeadResult = {
  leadName: string;
  company: string;
  industry: string;
  score: number;
  priority: "High" | "Medium" | "Low";
  recommendation: string;
};

type ToolStatus = "streaming" | "input" | "success" | "error";

export default function Home() {
  const [result, setResult] = useState<LeadResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toolStatus, setToolStatus] = useState<ToolStatus | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    setLoading(true);
    setError("");
    setResult(null);

    // State 1: Processing
    setToolStatus("streaming");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      company: formData.get("company"),
      industry: formData.get("industry"),
      budget: Number(formData.get("budget")),
    };

    try {
      // State 2: Input Available
      setToolStatus("input");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!json.success) {
        throw new Error(json.error);
      }

      // State 3: Output Available
      setResult(json.data);
      setToolStatus("success");

    } catch (err) {
      // State 4: Error
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );

      setToolStatus("error");

    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow">

        <h1 className="text-3xl font-bold">
          AI Lead Scoring Tool
        </h1>

        <p className="mt-2 text-gray-600">
          Enter lead information and get an AI-powered score.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >

          <input
            name="name"
            placeholder="Lead Name"
            required
            className="w-full rounded border p-3"
          />

          <input
            name="company"
            placeholder="Company Name"
            required
            className="w-full rounded border p-3"
          />

          <input
            name="industry"
            placeholder="Industry"
            required
            className="w-full rounded border p-3"
          />

          <input
            name="budget"
            type="number"
            placeholder="Budget"
            required
            className="w-full rounded border p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded bg-black px-5 py-3 text-white disabled:opacity-60"
          >
            {loading ? "Scoring..." : "Score Lead"}
          </button>

        </form>

        {toolStatus && (
          <ToolStatusCard
            status={toolStatus}
            message={
              toolStatus === "streaming"
                ? "Analyzing lead information..."
                : toolStatus === "input"
                ? "Lead data received successfully."
                : toolStatus === "success"
                ? "Lead scored successfully."
                : "Tool execution failed. Please try again."
            }
          />
        )}

        {error && (
          <div className="mt-5 rounded bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        {result && (
          <LeadScoreCard data={result} />
        )}

      </div>
    </main>
  );
}