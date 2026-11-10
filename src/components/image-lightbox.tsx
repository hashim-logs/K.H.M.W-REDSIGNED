"use client";

import Image from "next/image";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type LightboxImageData = {
  src: string;
  alt: string;
};

type LightboxContextValue = {
  openImage: (image: LightboxImageData) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function ImageLightboxProvider({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<LightboxImageData | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (image && dialog && !dialog.open) dialog.showModal();
  }, [image]);

  function closeLightbox() {
    dialogRef.current?.close();
  }

  return (
    <LightboxContext.Provider value={{ openImage: setImage }}>
      {children}
      <dialog
        className="image-lightbox"
        ref={dialogRef}
        aria-label={image ? `Image preview: ${image.alt}` : "Image preview"}
        onClick={(event) => {
          if (
            !(event.target instanceof Element) ||
            !event.target.closest(".image-lightbox__media, .image-lightbox__close")
          ) {
            closeLightbox();
          }
        }}
        onClose={() => setImage(null)}
      >
        {image ? (
          <div className="image-lightbox__content">
            <button
              className="image-lightbox__close"
              type="button"
              aria-label="Close image preview"
              onClick={closeLightbox}
              autoFocus
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="image-lightbox__media">
              <Image src={image.src} alt={image.alt} fill sizes="100vw" />
            </div>
            <p className="image-lightbox__caption">{image.alt}</p>
          </div>
        ) : null}
      </dialog>
    </LightboxContext.Provider>
  );
}

type LightboxImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  preload?: boolean;
  className?: string;
  imageClassName?: string;
};

export function LightboxImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  preload = false,
  className,
  imageClassName,
}: LightboxImageProps) {
  const lightbox = useContext(LightboxContext);

  if (!lightbox) {
    throw new Error("LightboxImage must be rendered inside ImageLightboxProvider.");
  }

  return (
    <button
      className={`lightbox-image${className ? ` ${className}` : ""}`}
      type="button"
      aria-label={`View larger image: ${alt}`}
      onClick={() => lightbox.openImage({ src, alt })}
    >
      <Image
        className={imageClassName}
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        preload={preload}
      />
    </button>
  );
}
