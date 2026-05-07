import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";

const paragraphComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
};

export function ParagraphPortableText({
  value,
}: {
  value?: PortableTextBlock[] | null;
}) {
  if (!value || value.length === 0) return null;
  return <PortableText value={value} components={paragraphComponents} />;
}
