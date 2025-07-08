import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import nodemailer from 'nodemailer';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting middleware
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many contact form submissions, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Email transporter setup
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App password, not regular password
    },
  });
};

// Validation middleware
const validateContactForm = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .escape()
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .escape()
    .withMessage('Subject must be less than 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .escape()
    .withMessage('Message must be between 10 and 2000 characters'),
];

// Contact form endpoint
router.post('/contact', contactLimiter, validateContactForm, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Create transporter
    const transporter = createTransporter();
    console.log("ENV CHECK:", process.env.EMAIL_USER, process.env.EMAIL_PASS);
    // Verify transporter configuration
    await transporter.verify();

    // Email to you (notification)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject || 'New Message from ' + name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; margin-bottom: 20px; text-align: center;">New Contact Form Submission</h2>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 10px 0; color: #374151;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0; color: #374151;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
              <p style="margin: 10px 0; color: #374151;"><strong>Subject:</strong> ${subject || 'N/A'}</p>
            </div>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
              <p style="margin-bottom: 10px; color: #374151; font-weight: bold;">Message:</p>
              <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <a href="mailto:${email}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reply to ${name}</a>
            </div>
          </div>
        </div>
      `,
    };

    // Auto-reply to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thanks for reaching out! - Ashish Bakshi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; margin-bottom: 20px;">Hi ${name}!</h2>
            <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
              Thank you for your message! I've received your inquiry and will get back to you within 24 hours.
            </p>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; color: #6b7280; font-style: italic;">Your message:</p>
              <p style="color: #374151; margin: 10px 0; white-space: pre-wrap;">"${message}"</p>
            </div>
            <p style="color: #374151; line-height: 1.6;">
              I'm excited to learn more about your project and discuss how we can work together!
            </p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #374151; margin: 0;">Best regards,<br><strong>Ashish Bakshi</strong></p>
              <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">Full Stack Developer</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    res.json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Send different error messages based on error type
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Email service configuration error. Please try again later.'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again or contact me directly.'
    });
  }
});

export default router;
