// import nodemailer from "nodemailer";
// import User from "@/models/userModel";
// import bcrypt from "bcryptjs";

// export const sendEmail = async ({ email, emailType, userId }: any) => {
//   try {
//     // create a hashed token
//     const hashedToken = await bcrypt.hash(userId.toString(), 10);

//     // store token + expiry in DB (same as your original logic)
//     if (emailType === "VERIFY") {
//       await User.findByIdAndUpdate(userId, {
//         verifyToken: hashedToken,
//         verifyTokenExpiry: Date.now() + 3600000, // 1 hour
//       });
//     } else if (emailType === "RESET") {
//       await User.findByIdAndUpdate(userId, {
//         forgotPasswordToken: hashedToken,
//         forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
//       });
//     }

//     // Keep DOMAIN like: http://localhost:3000 (no trailing slash)
//     const domain = process.env.DOMAIN || "http://localhost:3000";

//     // If you don't have reset page yet, keep it verifyemail for now
//     // Change to "/resetpassword" later when you build reset UI.
//     const actionPath = emailType === "VERIFY" ? "/verifyemail" : "/verifyemail";
//     const actionUrl = `${domain}${actionPath}?token=${hashedToken}`;

//     const transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: "90fc164c3a4d65",
//         pass: "9f81779c937aff",
//         // TODO: move these to .env
//       },
//     });

//     const title = emailType === "VERIFY" ? "Verify your email" : "Reset your password";
//     const subtitle =
//       emailType === "VERIFY"
//         ? "Confirm your email address to activate your account."
//         : "Use the link below to reset your password.";
//     const buttonText = emailType === "VERIFY" ? "Verify email" : "Reset password";

//     const mailOptions = {
//       from: "SithumbuddhikaJ@gmail.com",
//       to: email,
//       subject: title,
//       html: `
//       <div style="margin:0;padding:0;background:#f6f7fb;font-family:Inter,Arial,Helvetica,sans-serif;color:#0f172a;">
//         <div style="max-width:560px;margin:0 auto;padding:36px 16px;">
          
//           <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:22px;">
            
//             <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
//               <div style="width:40px;height:40px;border-radius:12px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;">
//                 <span style="font-size:18px;">✉️</span>
//               </div>
//               <div>
//                 <div style="font-size:18px;font-weight:700;line-height:1.2;">${title}</div>
//                 <div style="font-size:13px;color:#475569;margin-top:2px;">${subtitle}</div>
//               </div>
//             </div>

//             <div style="height:1px;background:#eef2f7;margin:14px 0;"></div>

//             <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:#0f172a;">
//               Click the button below. This link expires in <b>1 hour</b>.
//             </p>

//             <a href="${actionUrl}"
//                style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;
//                       padding:11px 16px;border-radius:12px;font-size:14px;font-weight:700;">
//               ${buttonText}
//             </a>

//             <p style="margin:16px 0 8px;font-size:12px;line-height:1.6;color:#64748b;">
//               If the button doesn’t work, copy and paste this link:
//             </p>

//             <div style="word-break:break-all;background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;padding:12px;font-size:12px;color:#0f172a;">
//               ${actionUrl}
//             </div>

//             <p style="margin:14px 0 0;font-size:12px;line-height:1.6;color:#64748b;">
//               If you didn’t request this, you can ignore this email.
//             </p>
//           </div>

//           <div style="text-align:center;margin-top:14px;font-size:12px;color:#94a3b8;">
//             © ${new Date().getFullYear()} • Lanka Deals
//           </div>
//         </div>
//       </div>
//       `,
//     };

//     const mailresponse = await transport.sendMail(mailOptions);
//     return mailresponse;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };


import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // store token + expiry in DB
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

    // Keep DOMAIN like: http://localhost:3000 (no trailing slash)
    const domain = process.env.DOMAIN || "http://localhost:3000";

    // VERIFY -> /verifyemail , RESET -> /resetpassword
    const actionPath = emailType === "VERIFY" ? "/verifyemail" : "/resetpassword";
    const actionUrl = `${domain}${actionPath}?token=${hashedToken}`;

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "90fc164c3a4d65",
        pass: "9f81779c937aff",
        // TODO: move these to .env
      },
    });

    const title = emailType === "VERIFY" ? "Verify your email" : "Reset your password";
    const subtitle =
      emailType === "VERIFY"
        ? "Confirm your email address to activate your account."
        : "Use the link below to reset your password.";
    const buttonText = emailType === "VERIFY" ? "Verify email" : "Reset password";

    const mailOptions = {
      from: "SithumbuddhikaJ@gmail.com",
      to: email,
      subject: title,
      html: `
      <div style="margin:0;padding:0;background:#f6f7fb;font-family:Inter,Arial,Helvetica,sans-serif;color:#0f172a;">
        <div style="max-width:560px;margin:0 auto;padding:36px 16px;">
          
          <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:22px;">
            
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
              <div style="width:40px;height:40px;border-radius:12px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;">
                <span style="font-size:18px;">✉️</span>
              </div>
              <div>
                <div style="font-size:18px;font-weight:700;line-height:1.2;">${title}</div>
                <div style="font-size:13px;color:#475569;margin-top:2px;">${subtitle}</div>
              </div>
            </div>

            <div style="height:1px;background:#eef2f7;margin:14px 0;"></div>

            <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:#0f172a;">
              Click the button below. This link expires in <b>1 hour</b>.
            </p>

            <a href="${actionUrl}"
               style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;
                      padding:11px 16px;border-radius:12px;font-size:14px;font-weight:700;">
              ${buttonText}
            </a>

            <p style="margin:16px 0 8px;font-size:12px;line-height:1.6;color:#64748b;">
              If the button doesn’t work, copy and paste this link:
            </p>

            <div style="word-break:break-all;background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;padding:12px;font-size:12px;color:#0f172a;">
              ${actionUrl}
            </div>

            <p style="margin:14px 0 0;font-size:12px;line-height:1.6;color:#64748b;">
              If you didn’t request this, you can ignore this email.
            </p>
          </div>

          <div style="text-align:center;margin-top:14px;font-size:12px;color:#94a3b8;">
            © ${new Date().getFullYear()} • Rajapaksha Brothers
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
