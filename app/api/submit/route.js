import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const toolName = String(formData.get("toolName") || "").trim();
    const website = String(formData.get("website") || "").trim();
    const audience = String(formData.get("audience") || "").trim();
    const problem = String(formData.get("problem") || "").trim();

    const companyWebsite = String(
      formData.get("companyWebsite") || ""
    ).trim();

    // Honeypot spam protection
    if (companyWebsite) {
      return NextResponse.redirect(
        new URL("/submit/thanks", request.url),
        303
      );
    }

    // Required fields
    if (!toolName || !website || !audience || !problem) {
      return new NextResponse(
        "Please complete all required fields.",
        { status: 400 }
      );
    }

    // Website validation
    try {
      const parsedUrl = new URL(website);

      if (
        parsedUrl.protocol !== "http:" &&
        parsedUrl.protocol !== "https:"
      ) {
        throw new Error("Invalid protocol");
      }
    } catch {
      return new NextResponse(
        "Please enter a valid website URL.",
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY || !process.env.SUBMISSIONS_TO) {
      console.error("Missing Resend environment variables.");

      return new NextResponse(
        "Submission service is temporarily unavailable.",
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "AI Biz Tools <onboarding@resend.dev>",
      to: process.env.SUBMISSIONS_TO,
      subject: `New AI tool submission: ${toolName}`,
      text: `
New AI tool submission

Tool name:
${toolName}

Website:
${website}

Target audience:
${audience}

Problem solved:
${problem}
      `
    });

    if (error) {
      console.error("Resend error:", error);

      return new NextResponse(
        "Something went wrong. Please try again later.",
        { status: 500 }
      );
    }

    return NextResponse.redirect(
      new URL("/submit/thanks", request.url),
      303
    );
  } catch (error) {
    console.error("Submission error:", error);

    return new NextResponse(
      "Something went wrong. Please try again later.",
      { status: 500 }
    );
  }
}
