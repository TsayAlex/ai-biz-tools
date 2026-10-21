import { Resend } from "resend";
import { NextResponse } from "next/server";
import { readBoundedFormData, SubmissionTooLargeError, InvalidSubmissionBodyError, validateSubmissionFields } from "../../../lib/submitValidation.js";


export async function POST(request) {
  try {
    const formData = await readBoundedFormData(request);

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

    const validationError = validateSubmissionFields({toolName, website, audience, problem});
    if (validationError) {
      return new NextResponse(validationError.message, { status: validationError.status });
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
    if (error instanceof SubmissionTooLargeError)
      return new NextResponse("Submission is too large.", { status: 413 });
    if (error instanceof InvalidSubmissionBodyError)
      return new NextResponse("Invalid form body.", { status: 400 });
    console.error("Submission error:", error);

    return new NextResponse(
      "Something went wrong. Please try again later.",
      { status: 500 }
    );
  }
}
