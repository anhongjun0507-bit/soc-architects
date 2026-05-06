export function Footer({ copyright }: { copyright: string }) {
  return (
    <footer className="px-6 py-8 text-center text-xs text-zinc-500">
      <p>{copyright}</p>
    </footer>
  );
}
