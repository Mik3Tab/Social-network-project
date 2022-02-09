const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "pruebanodemailer3@gmail.com",
    pass: "holita123*",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
module.exports = transporter;
