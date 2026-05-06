import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[11px] tracking-[0.25em] uppercase text-zinc-400 mb-4">
        404
      </p>
      <h1 className="text-[16px] md:text-[18px] font-light tracking-[0.04em] mb-8">
        Page not found
      </h1>
      <Link
        href="/ko"
        className="text-[12px] tracking-[0.15em] lowercase text-zinc-900 hover:text-zinc-500 transition-colors border-b border-zinc-300 pb-0.5"
      >
        ← projects
      </Link>
    </div>
  );
}
