import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";

export function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <>
      <MobileHeader lang={lang} dict={dict} />
      <Sidebar lang={lang} dict={dict} />
    </>
  );
}
