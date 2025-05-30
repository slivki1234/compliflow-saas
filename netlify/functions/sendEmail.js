const nodemailer = require("nodemailer");

exports.handler = async function (event) {
  const { name, email } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_KEY,
    },
  });

  await transporter.sendMail({
    from: `"CompliFlow" <${process.env.BREVO_USER}>`,
    to: email,
    subject: "🚀 Danke für deine Bewerbung bei CompliFlow",
    html: `<p>Hi ${name},</p><p>Danke, dass du CompliFlow testest. Wir melden uns bald!</p>`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
