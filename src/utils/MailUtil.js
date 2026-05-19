// FORCE NODE TO PREFER IPV4
const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');

const mailer = require("nodemailer")
const path = require('path');
const hbs = require("nodemailer-express-handlebars").default || require("nodemailer-express-handlebars");

require("dotenv").config()

const mailSend = async (to,subject,templateName,context) => {
  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  transporter.use('compile', hbs({
    viewEngine: {
      extName: '.html',
      partialsDir: path.resolve('./src/templates/'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./src/templates/'),
    extName: '.html',
  }));

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to:to,
    subject:subject,
    template: templateName,
    context: context
  }

  try {
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", mailResponse.messageId);
    return mailResponse;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = mailSend