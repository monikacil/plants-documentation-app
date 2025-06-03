"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

type Props = ImageProps & {
  fallbackSrc?: string;
};

export default function ImageWithFallback({
                                            src,
                                            fallbackSrc = "/images/fallback.png",
                                            alt,
                                            ...rest
                                          }: Props) {
  const [error, setError] = useState(false);

  return (
    <Image
      onError={ () => {
        console.error("Image failed to load:", src);
        setError(true);
      } }
      src={ error ? fallbackSrc : src }
      priority={ true }
      alt={ alt }
      { ...rest }
    />
  );
}
