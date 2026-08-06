# AI Lead Scoring Tool

## Project Overview

AI Lead Scoring Tool is a simple AI-inspired web application built with Next.js and TypeScript. It helps sales teams evaluate potential leads based on company information and budget.

## Technologies Used

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Zod

## Tool Name

scoreLead

## Tool Schema

Input:

- name (string)
- company (string)
- industry (string)
- budget (number)

## Return Shape

```ts
{
  leadName: string;
  company: string;
  industry: string;
  score: number;
  priority: "High" | "Medium" | "Low";
  recommendation: string;
}
```

## Features

- Lead scoring
- Tool lifecycle states
- Success state
- Error state
- Responsive UI

## Installation

```bash
npm install
npm run dev
```

## Folder Structure

```
src/
 ├── app/
 ├── components/
 └── tools/
```

## Future Improvements

- Connect with a real AI model
- Save lead history
- Authentication
- Database integration