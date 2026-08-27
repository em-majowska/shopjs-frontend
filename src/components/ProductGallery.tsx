"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type TProductGallery = {
  images: string[];
  title: string;
};

const ProductGallery = ({ images, title }: TProductGallery) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const width = container.clientWidth;

    container.scrollTo({ left: width * index, behavior: "smooth" });
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const handleImageLoading = (i: number) => {
    setLoadedImages((prev) => ({ ...prev, [i]: true }));
  };

  return (
    <div className="group relative w-full flex-1">
      <div
        ref={scrollRef}
        className="border-border shadow-lift flex aspect-square w-full snap-x snap-mandatory scrollbar-none overflow-hidden overflow-x-auto rounded-xl border"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="snap-centere relative aspect-square w-full shrink-0 snap-always"
          >
            {!loadedImages[i] && (
              <div className="text-muted-foreground absolute inset-0 flex items-center justify-center">
                <BiLoaderCircle className="size-12 animate-spin" />
              </div>
            )}
            <Image
              src={img}
              alt={`${title} - image ${i + 1}`}
              width="530"
              height="530"
              className="fade-up h-full w-full object-contain"
              priority={i === 0}
              onLoad={() => handleImageLoading(i)}
            />
          </div>
        ))}
      </div>

      {images.length > 0 && (
        <>
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Image précédente"
              className="bg-card/80 text-foreground border-border hover:bg-card absolute top-1/2 left-3 -translate-y-1/2 rounded-full border p-2 backdrop-blur-sm transition-all"
            >
              <LuChevronLeft className="size-5" />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Image suivante"
              className="bg-card/80 text-foreground border-border hover:bg-card absolute top-1/2 right-3 -translate-y-1/2 rounded-full border p-2 backdrop-blur-sm transition-all"
            >
              <LuChevronRight className="size-5" />
            </button>
          )}

          <div className="bg-accent absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-sm">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === i
                    ? "bg-accent-foreground w-5"
                    : "bg-accent-foreground/50 w-2"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGallery;
