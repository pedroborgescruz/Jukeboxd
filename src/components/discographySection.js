"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 7;

export default function DiscographySection({ items }) {
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [items]);

  const maxPage = pageCount - 1;

  useEffect(() => {
    if (page > maxPage) setPage(maxPage);
  }, [page, maxPage]);

  const slice = useMemo(() => {
    const start = page * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page]);

  const rangeStart = items.length === 0 ? 0 : page * PAGE_SIZE + 1;
  const rangeEnd = Math.min((page + 1) * PAGE_SIZE, items.length);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        {slice.map((item) => (
          <div key={item.releaseId} className="flex gap-4 items-center">
            <Link href={`/albums/${item.releaseId}`}>
              <img
                src={item.coverUrl}
                className="w-16 h-16 object-cover border border-gray-600 rounded"
                alt=""
              />
            </Link>
            <div>
              <p className="text-primary font-bold text-sm">
                <Link href={`/albums/${item.releaseId}`}>{item.title}</Link>
              </p>
              <p className="text-gray-500 text-sm">{item.dateLabel}</p>
            </div>
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="flex flex-col gap-3 pt-2 border-t border-gray-400/60">
          <p className="text-xs text-gray-500 text-center">
            Showing {rangeStart}–{rangeEnd} of {items.length}
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page <= 0}
              className="text-sm font-semibold text-jukeboxd px-3 py-1.5 rounded border border-gray-600 disabled:opacity-40 disabled:pointer-events-none hover:bg-black/5"
            >
              Previous
            </button>
            <span className="text-xs text-gray-600 tabular-nums">
              Page {page + 1} / {pageCount}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
              disabled={page >= maxPage}
              className="text-sm font-semibold text-jukeboxd px-3 py-1.5 rounded border border-gray-600 disabled:opacity-40 disabled:pointer-events-none hover:bg-black/5"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
