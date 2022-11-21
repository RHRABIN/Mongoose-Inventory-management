const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const client = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

module.exports.sendMailWithMailGun = async (data) => {
  const result = await client.messages.create(
    "sandbox5a78394f0b6b4c7fb84ab1b148e9e227.mailgun.org",
    {
      from: "Mailgun Sandbox <postmaster@sandbox5a78394f0b6b4c7fb84ab1b148e9e227.mailgun.org>",
      to: data.to,
      subject: data.subject,
      text: data.text,
    }
  );

  return result.id;
};
