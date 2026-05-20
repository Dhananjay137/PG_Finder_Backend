const axios = require('axios');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

require("dotenv").config();

const mailSend = async (to, subject, templateName, context) => {
  try {
    // 1. Read existing HTML template file manually
    const templatePath = path.resolve(`./src/templates/${templateName}.html`);
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    
    // 2. Compile the template with Handlebars using your context data
    const compiledTemplate = handlebars.compile(templateSource);
    const htmlContent = compiledTemplate(context);

    // 3. Send the email via Brevo's HTTP API (Not blocked by Render)
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { 
          name: "PG Finder", 
          email: process.env.EMAIL_USER
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: htmlContent // Injected HTML string
      },
      {
        headers: {
          'accept': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
          'content-type': 'application/json'
        }
      }
    );

    console.log("Email sent successfully via Brevo API:", response.data.messageId);
    return response.data;
  } catch (error) {
    console.error("Error sending email via Brevo API:", error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = mailSend;
