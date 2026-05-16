import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email Service Error:', error);
  } else {
    console.log('📧 Email Service is ready to send messages');
  }
});


export const sendWelcomeEmail = async (email: string, name: string) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a; color: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #111111; border: 1px solid #222222; border-radius: 24px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); padding: 40px; text-align: center; }
        .content { padding: 40px; line-height: 1.6; }
        h1 { margin: 0; font-size: 28px; font-weight: 800; }
        p { color: #a1a1aa; font-size: 16px; }
        .button { display: inline-block; padding: 16px 32px; background-color: #6366f1; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: bold; margin-top: 24px; }
        .footer { padding: 24px; text-align: center; font-size: 12px; color: #52525b; border-top: 1px solid #222222; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to SAAS Starter! 🚀</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>We're thrilled to have you on board! You've just taken the first step towards supercharging your workflow with our premium SaaS starter kit.</p>
          <p>Your account is now active and you can start exploring your dashboard right away.</p>
          <a href="http://localhost:5173/dashboard" class="button">Go to Dashboard</a>
          <p style="margin-top: 32px;">If you have any questions, feel free to reply to this email.</p>
          <p>Best regards,<br>The SAAS Starter Team</p>
        </div>
        <div class="footer">
          &copy; 2026 SAAS Starter Pack. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"SAAS Starter" <noreply@saasstarter.com>',
      to: email,
      subject: 'Welcome to SAAS Starter! 🚀',
      html: htmlTemplate,
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // Don't throw error to prevent blocking the signup process
  }
};
