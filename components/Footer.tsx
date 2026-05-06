export function Footer({ copyright }: { copyright: string }) {
  return (
    <footer
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 2rem)" }}
      className="px-6 pt-8 text-center text-[11px] tracking-[0.05em] text-zinc-500"
    >
      <p>{copyright}</p>
    </footer>
  );
}
