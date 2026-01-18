import { EmailJob } from "../types/email";

export default function EmailTable({ data }: { data: EmailJob[] }) {
  if (!data.length) return <p className="text-gray-500">No emails</p>;

  return (
    <table className="w-full border mt-2">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Recipient</th>
          <th className="p-2 text-left">Subject</th>
          <th className="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(e => (
          <tr key={e.id} className="border-t">
            <td className="p-2">{e.recipient}</td>
            <td className="p-2">{e.subject}</td>
            <td className="p-2 text-center">{e.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
