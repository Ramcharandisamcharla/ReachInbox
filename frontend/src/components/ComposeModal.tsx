import { useState } from "react";
import { api } from "../services/api";

export default function ComposeModal({ onClose }: { onClose: () => void }) {
  const [emails, setEmails] = useState<string[]>([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    file.text().then((text: string) => {
      setEmails(text.split(/\r?\n/).filter(Boolean));
    });
  };

  const schedule = async () => {
    for (const email of emails) {
      await api.post("/emails/schedule", {
        senderEmail: "test@ethereal.email",
        recipient: email,
        subject,
        body,
        scheduledAt: new Date(Date.now() + 60000),
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <input type="file" onChange={handleFile} />
        <p className="text-sm mt-1">{emails.length} emails detected</p>

        <input
          className="border w-full my-2 p-1"
          placeholder="Subject"
          onChange={e => setSubject(e.target.value)}
        />

        <textarea
          className="border w-full p-1"
          placeholder="Body"
          onChange={e => setBody(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={schedule}
            className="bg-blue-600 text-white px-3 py-1"
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}