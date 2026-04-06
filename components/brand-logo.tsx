"use client";

import Image from "next/image";
import { useState } from "react";

const sources = ["/pics/logo.png", "/pics/logo.jpg", "/pics/logo.jpeg", "/pics/logo.svg"];

type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
};

export function BrandLogo({ size = "md" }: BrandLogoProps) {
  const [index, setIndex] = useState(0);

  const sizeClass =
    size === "sm"
      ? "h-12 w-12 rounded-2xl"
      : size === "lg"
        ? "h-20 w-20 rounded-[1.75rem]"
        : "h-14 w-14 rounded-2xl";

  const imageSize = size === "sm" ? "48px" : size === "lg" ? "80px" : "56px";

  return (
    <div className={`relative overflow-hidden ${sizeClass}`}>
      <Image
        src={sources[index]}
        alt="Garajul cu Bere logo"
        fill
        sizes={imageSize}
        className="object-contain"
        onError={() => {
          if (index < sources.length - 1) {
            setIndex(index + 1);
          }
        }}
      />
    </div>
  );
}
