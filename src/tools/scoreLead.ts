import { z } from "zod";

export const scoreLeadSchema = z.object({
  name: z.string().describe("Lead person's name"),
  company: z.string().describe("Lead company name"),
  industry: z.string().describe("Company industry"),
  budget: z.number().describe("Expected budget"),
});

export type LeadInput = z.infer<typeof scoreLeadSchema>;

export async function scoreLead(input: LeadInput) {
  const { name, company, industry, budget } = input;

  // Error State (FE-07 Requirement)
  if (budget < 0) {
    throw new Error("Budget cannot be negative.");
  }

  let score = 50;

  if (budget > 50000) {
    score += 30;
  } else if (budget > 10000) {
    score += 15;
  }

  const highValueIndustries = [
    "technology",
    "software",
    "finance",
  ];

  if (highValueIndustries.includes(industry.toLowerCase())) {
    score += 20;
  }

  if (score > 100) score = 100;

  let priority: "High" | "Medium" | "Low";

  if (score >= 80) {
    priority = "High";
  } else if (score >= 50) {
    priority = "Medium";
  } else {
    priority = "Low";
  }

  let recommendation = "";

  if (priority === "High") {
    recommendation = "Contact immediately for sales discussion.";
  } else if (priority === "Medium") {
    recommendation = "Follow up and collect more information.";
  } else {
    recommendation = "Add to nurturing campaign.";
  }

  return {
    leadName: name,
    company,
    industry,
    score,
    priority,
    recommendation,
  };
}