export const dynamic = "force-dynamic";

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Optional: simple rate limit
let requests = [];
const WINDOW = 15 * 60 * 1000; // 15 mins
const LIMIT = 5;

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || name.length < 2 || !email || !message || message.length < 10) {
      return NextResponse.json(
        { success: false, message: "Invalid form input." },
        { status: 400 }
      );
    }

    // Rate limiting
    const now = Date.now();
    requests = requests.filter((t) => now - t < WINDOW);
    if (requests.length >= LIMIT) {
      return NextResponse.json(
        { success: false, message: "Too many submissions, try later." },
        { status: 429 }
      );
    }
    requests.push(now);

    // Create transporter ONCE here
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter (optional, just logs)
    await transporter.verify();
    console.log("Transporter verified successfully");

    // Send emails
    // const adminMail = {
    //   from: process.env.EMAIL_USER,
    //   to: process.env.EMAIL_USER,
    //   subject: `Portfolio Contact: ${subject || "New Message from " + name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Subject:</strong> ${subject || "N/A"}</p>
    //     <p><strong>Message:</strong></p>
    //     <pre>${message}</pre>
    //   `,
    // };
    const adminMail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📩 Portfolio Contact: ${subject || "New Message from " + name}`,
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; color: #333;">
      <h1 style="color: #4A90E2; margin-bottom: 10px;">New Contact Form Submission</h1>
      <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <pre style="background: #fff; padding: 10px; border-radius: 6px;">${message}</pre>
      </div>
      <p style="margin-top: 20px; font-size: 12px; color: #777;">
        Sent from your Portfolio Contact Form
      </p>
    </div>
  `,
    };

    const userMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "✅ Thanks for reaching out! - Ashish Bakshi",
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #4A90E2;">Hi ${name}!</h2>
      <p>Thank you for reaching out through my portfolio. I’ll get back to you within 24 hours.</p>
      <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <p><strong>Your Message:</strong></p>
        <pre style="background: #fff; padding: 10px; border-radius: 6px;">${message}</pre>
      </div>
      <p>Looking forward to connecting!<br>– Ashish Bakshi</p>
      <p style="margin-top: 20px; font-size: 12px; color: #777;">
        This is an automated message from Ashish Bakshi's portfolio.
      </p>
    </div>
  `,
    };

    await Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(userMail),
    ]);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! I’ll get back to you soon.",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to send message." },
      { status: 500 }
    );
  }
}
