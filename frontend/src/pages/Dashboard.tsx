import { useEffect, useState } from "react";
import { api } from "../services/api";
import { EmailJob } from "../types/email";
import EmailTable from "../components/EmailTable";
import ComposeModal from "../components/ComposeModal";
import Header from "../components/Header";

export default function Dashboard() {
  const [scheduled, setScheduled] = useState<EmailJob[]>([]);
  const [sent, setSent] = useState<EmailJob[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api.get<EmailJob[]>("/emails/scheduled").then((res) => setScheduled(res.data));
    api.get<EmailJob[]>("/emails/sent").then((res) => setSent(res.data));
  }, []);

  return (
    <div>
      <Header />

      <div className="p-6">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Compose New Email
        </button>

        <h2 className="mt-6 font-semibold">Scheduled Emails</h2>
        <EmailTable data={scheduled} />

        <h2 className="mt-6 font-semibold">Sent Emails</h2>
        <EmailTable data={sent} />

        {open && <ComposeModal onClose={() => setOpen(false)} />}
      </div>
    </div>
  );
}