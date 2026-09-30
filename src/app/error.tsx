"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="wrap" style={{ paddingTop: 64, paddingBottom: 64 }}>
      <h1>Products are unavailable</h1>
      <p>The catalog could not be loaded from the product service.</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
