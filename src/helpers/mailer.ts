import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // store token + expiry in DB (same logic as your original)
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    }

    // IMPORTANT: keep DOMAIN like "http://localhost:3000" (no trailing slash)
    const domain = process.env.DOMAIN || "http://localhost:3000";

    // If you don't have reset page yet, this still works (link will go to verifyemail)
    // Change "/verifyemail" to "/resetpassword" later when you create that page.
    const actionPath = emailType === "VERIFY" ? "/verifyemail" : "/verifyemail";
    const actionUrl = `${domain}${actionPath}?token=${hashedToken}`;

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "90fc164c3a4d65",
        pass: "9f81779c937aff",
        // TODO: move these credentials to .env
      },
    });

    const mailOptions = {
      from: "SithumbuddhikaJ@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
      <div style="margin:0;padding:0;background:#0b1220;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:600px;margin:0 auto;padding:28px 16px;">
          
          <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.10);border-radius:18px;padding:24px;">
            
            <div style="display:flex;align-items:center;gap:12px;">
              <div style="width:44px;height:44px;border-radius:14px;background:rgba(255,255,255,0.10);display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.10);">
                <span style="color:#ffffff;font-size:18px;">✉️</span>
              </div>
              <div>
                <div style="color:#ffffff;font-size:18px;font-weight:700;line-height:1.2;">
                  ${emailType === "VERIFY" ? "Verify your email address" : "Reset your password"}
                </div>
                <div style="color:rgba(255,255,255,0.70);font-size:13px;margin-top:4px;">
                  ${
                    emailType === "VERIFY"
                      ? "Activate your account by confirming your email."
                      : "Use the button below to reset your password."
                  }
                </div>
              </div>
            </div>

            <div style="height:1px;background:rgba(255,255,255,0.10);margin:18px 0;"></div>

            <p style="color:rgba(255,255,255,0.80);font-size:14px;line-height:1.6;margin:0 0 16px;">
              Click the button below to ${
                emailType === "VERIFY" ? "verify your email" : "reset your password"
              }. This link will expire in <b>1 hour</b>.
            </p>

            <a href="${actionUrl}"
              style="display:inline-block;text-decoration:none;background:linear-gradient(90deg,#06b6d4,#6366f1);color:#ffffff;font-weight:700;font-size:14px;padding:12px 18px;border-radius:12px;">
              ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
            </a>

            <p style="color:rgba(255,255,255,0.70);font-size:12px;line-height:1.6;margin:16px 0 6px;">
              If the button doesn’t work, copy and paste this link into your browser:
            </p>

            <div style="word-break:break-all;background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.10);padding:12px;border-radius:12px;color:#ffffff;font-size:12px;">
              ${actionUrl}
            </div>

            <p style="color:rgba(255,255,255,0.55);font-size:12px;line-height:1.6;margin:16px 0 0;">
              If you didn’t request this, you can safely ignore this email.
            </p>

          </div>

          <div style="text-align:center;color:rgba(255,255,255,0.45);font-size:12px;margin-top:14px;">
            © ${new Date().getFullYear()} • Lanka Deals
          </div>
        </div>
      </div>
      `,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
