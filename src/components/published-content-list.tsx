"use client";

import { useEffect, useState } from "react";

type PublishedRecord = {
  id: string;
  title: string;
  payload: Record<string, unknown>;
  publishedAt: string | null;
  sourceReference: string | null;
};

export function PublishedContentList({
  type,
  emptyMessage,
}: {
  type: "event" | "faculty" | "programme" | "institutional";
  emptyMessage: string;
}) {
  const [records, setRecords] = useState<PublishedRecord[]>([]);
  const [message, setMessage] = useState("Loading published content…");

  useEffect(() => {
    fetch(`/api/public/content?type=${encodeURIComponent(type)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("Published content is temporarily unavailable.");
        const result = await response.json();
        setRecords(result.items);
        setMessage(result.items.length ? "" : emptyMessage);
      })
      .catch(() => setMessage("Published content is temporarily unavailable."));
  }, [emptyMessage, type]);

  return records.length ? (
    <ul className="published-notices">
      {records.map((record) => (
        <li key={record.id}>
          <h3>{record.title}</h3>
          {typeof record.payload.summary === "string" ? <p>{record.payload.summary}</p> : null}
          {typeof record.payload.body === "string" ? <p>{record.payload.body}</p> : null}
          {record.publishedAt ? <time dateTime={record.publishedAt}>{new Date(record.publishedAt).toLocaleDateString()}</time> : null}
          {record.sourceReference ? <p className="source-note">Source: {record.sourceReference}</p> : null}
        </li>
      ))}
    </ul>
  ) : <p role="status">{message}</p>;
}
