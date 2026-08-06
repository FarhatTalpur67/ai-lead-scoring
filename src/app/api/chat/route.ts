import { scoreLead, scoreLeadSchema } from "@/tools/scoreLead";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData = scoreLeadSchema.parse(body);

    const result = await scoreLead(validatedData);

    return Response.json({
      success: true,
      tool: "scoreLead",
      data: result,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          success: false,
          error: "Invalid input data",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: false,
        error: "Tool execution failed",
      },
      { status: 500 }
    );
  }
}