import nodemailer from "nodemailer";
import dotenv from "dotenv";

// .env path configration
dotenv.config({ path: "./.env" });

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

let sendMail = (mailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      return info;
    }
  });
};

export default sendMail;
