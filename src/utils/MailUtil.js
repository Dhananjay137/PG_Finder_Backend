const mailer = require("nodemailer")
require("dotenv").config()

const mailSend = async (to,subject,text,html) => {
  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to:to,
    subject:subject,
    text:text,
    html:html,
  }

  // const mailResponse = await transpoter.sendMail(mailOptions)
  // console.log(mailResponse)
  // return mailResponse
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