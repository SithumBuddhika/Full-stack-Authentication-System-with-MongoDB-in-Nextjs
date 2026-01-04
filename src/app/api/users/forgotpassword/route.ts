import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    // Important: don't leak whether email exists (security best practice)
    // Still return success even if user not found.
    if (!user) {
      return NextResponse.json({
        message: "If an account exists, a reset link has been sent.",
        success: true,
      });
    }

    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
      message: "If an account exists, a reset link has been sent.",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
