"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Notice = {
  id: string;
  slug: string;
  title: string;
  payload: Record<string, unknown>;
  publishedAt: string | null;
};

export function PublishedNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [message, setMessage] = useState("Loading published notices…");

  useEffect(() => {
    fetch("/api/public/content?type=notice")
      .then(async (response) => {
        if (!response.ok) throw new Error("Published notices are temporarily unavailable.");
        const result = await response.json();
        setNotices(result.items);
        setMessage(result.items.length ? "" : "There are no published notices.");
      })
      .catch(() => setMessage("Published notices are temporarily unavailable."));
  }, []);

  return notices.length ? (
    <ul className="published-notices">
      {notices.map((notice) => (
        <li key={notice.id}>
          <h3>{notice.title}</h3>
          {typeof notice.payload.summary === "string" ? <p>{notice.payload.summary}</p> : null}
          {typeof notice.payload.body === "string" ? <p>{notice.payload.body}</p> : null}
          {notice.publishedAt ? <time dateTime={notice.publishedAt}>{new Date(notice.publishedAt).toLocaleDateString()}</time> : null}
          {typeof notice.payload.href === "string" && notice.payload.href.startsWith("/api/public/documents/")
            ? <p><Link href={notice.payload.href}>Open related document</Link></p>
            : null}
        </li>
      ))}
    </ul>
  ) : <p role="status">{message}</p>;
}
