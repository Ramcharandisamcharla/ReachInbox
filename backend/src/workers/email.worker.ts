import { Worker } from "bullmq";
import nodemailer from "nodemailer";
import { redisConfig } from "../config/redis";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS
  }
});

new Worker(
  "email-queue",
  async job => {
    const { recipient, subject, body } = job.data;
    await transporter.sendMail({
      from: "ReachInbox <test@reachinbox.com>",
      to: recipient,
      subject,
      text: body
    });
    console.log("Sent email to", recipient);
  },
  { connection: redisConfig, concurrency: 5 }
);