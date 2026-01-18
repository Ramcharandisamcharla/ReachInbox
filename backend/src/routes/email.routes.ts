import { Router } from "express";
import { emailQueue } from "../queues/email.queue";

const router = Router();

router.post("/schedule", async (req, res) => {
  const { recipient, subject, body, scheduledAt } = req.body;
  const delay = new Date(scheduledAt).getTime() - Date.now();

  await emailQueue.add("send-email", { recipient, subject, body }, { delay });
  res.json({ message: "Email scheduled" });
});

export default router;