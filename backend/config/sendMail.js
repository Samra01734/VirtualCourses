import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD
  }
});

const sendMail = async (to, otp) => {
  try {

    const info = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: to,
      subject: "Reset your password",
      html: `<p>Your OTP for Password Reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
    });

    console.log("Mail sent:", info.response);

  } catch (error) {

    console.log("Mail error:", error);

  }
};

export default sendMail;