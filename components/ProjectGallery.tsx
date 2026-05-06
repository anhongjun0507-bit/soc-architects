"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ProjectImage } from "@/data/projects";

export function ProjectGallery({
  images,
  alt,
}: {
  images: ProjectImage[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        setIndex((i) => (i + 1) % images.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length]);

  if (images.length === 0) return null;

  const current = images[index];
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div>
      <div className="relative bg-zinc-50">
        <Image
          src={current.src}
          alt={`${alt} ${index + 1}`}
          width={current.width}
          height={current.height}
          sizes="(max-width: 1040px) 100vw, 1040px"
          className="w-full h-auto block"
          priority
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-0 top-0 h-full w-1/2 cursor-w-resize focus:outline-none"
            />
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-0 top-0 h-full w-1/2 cursor-e-resize focus:outline-none"
            />
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex items-center justify-between text-[11px] tracking-[0.15em] text-zinc-500 lowercase">
          <span className="tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
          <div className="flex gap-5">
            <button
              type="button"
              onClick={prev}
              className="hover:text-black transition-colors"
            >
              prev
            </button>
            <button
              type="button"
              onClick={next}
              className="hover:text-black transition-colors"
            >
              next
            </button>
          </div>
        </div>
      )}

      {images.length > 1 && (
        <div className="mt-5 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-1.5">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Image ${i + 1}`}
              aria-current={i === index}
              className={`block aspect-square overflow-hidden bg-zinc-100 transition-opacity ${
                i === index
                  ? "opacity-100"
                  : "opacity-40 hover:opacity-80"
              }`}
            >
              <Image
                src={img.src}
                alt=""
                width={img.width}
                height={img.height}
                sizes="80px"
                className="w-full h-full object-cover block"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
