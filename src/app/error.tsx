"use client";
export default function GlobalError({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Something went wrong: {error.message}</p>
    </div>
  );
}
