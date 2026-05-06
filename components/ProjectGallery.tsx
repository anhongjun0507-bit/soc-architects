"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/data/projects";

const SWIPE_THRESHOLD = 50;

export function ProjectGallery({
  images,
  alt,
}: {
  images: ProjectImage[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        return;
      }
      if (images.length <= 1) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, open, prev, next]);

  useEffect(() => {
    if (!open) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
    };
  }, [open]);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) prev();
    else next();
  };

  if (images.length === 0) return null;

  const current = images[index];

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-label="View fullscreen"
          className="block w-full bg-zinc-50 cursor-zoom-in select-none"
        >
          <Image
            src={current.src}
            alt={`${alt} ${index + 1}`}
            width={current.width}
            height={current.height}
            sizes="(max-width: 1040px) 100vw, 1040px"
            className="w-full h-auto block pointer-events-none"
            priority
          />
        </button>

        {images.length > 1 && (
          <div className="mt-3 md:mt-4 flex items-center justify-between text-[11px] tracking-[0.15em] text-zinc-500 lowercase">
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
            <div className="flex gap-5">
              <button
                type="button"
                onClick={prev}
                className="py-1 -my-1 hover:text-black transition-colors"
              >
                prev
              </button>
              <button
                type="button"
                onClick={next}
                className="py-1 -my-1 hover:text-black transition-colors"
              >
                next
              </button>
            </div>
          </div>
        )}

        {images.length > 1 && (
          <div className="mt-4 md:mt-5 grid grid-cols-5 sm:grid-cols-8 md:grid-cols-12 gap-1.5">
            {images.map((thumb, i) => (
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
                  src={thumb.src}
                  alt=""
                  width={thumb.width}
                  height={thumb.height}
                  sizes="80px"
                  className="w-full h-full object-cover block"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            style={{
              top: "calc(env(safe-area-inset-top, 0px) + 12px)",
              right: "calc(env(safe-area-inset-right, 0px) + 12px)",
            }}
            className="absolute md:top-6 md:right-6 z-20 w-12 h-12 md:w-10 md:h-10 flex items-center justify-center text-white/70 hover:text-white text-[24px] md:text-[20px] leading-none"
          >
            ✕
          </button>

          <div className="relative w-full h-full flex items-center justify-center px-2 md:px-12 py-12 select-none">
            <Image
              key={current.src}
              src={current.src}
              alt={`${alt} ${index + 1}`}
              width={current.width}
              height={current.height}
              sizes="100vw"
              className="max-w-full max-h-full w-auto h-auto object-contain pointer-events-none"
              priority
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous"
                className="hidden md:block absolute left-0 top-0 h-full w-1/4 cursor-w-resize focus:outline-none"
              />
              <button
                type="button"
                onClick={next}
                aria-label="Next"
                className="hidden md:block absolute right-0 top-0 h-full w-1/4 cursor-e-resize focus:outline-none"
              />
              <div
                style={{
                  bottom:
                    "calc(env(safe-area-inset-bottom, 0px) + 16px)",
                }}
                className="absolute left-0 right-0 text-center text-white/70 text-[11px] tabular-nums tracking-[0.15em] lowercase"
              >
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
