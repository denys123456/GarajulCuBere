"use client";

import Image from "next/image";
import { useState } from "react";

const sources = ["/pics/logo.png", "/pics/logo.jpg", "/pics/logo.jpeg", "/pics/logo.svg"];

type BrandLogoProps = {
  size?: "sm" | "md";
};

export function BrandLogo({ size = "md" }: BrandLogoProps) {
  const [index, setIndex] = useState(0);

  return (
    <div
      className={
        size === "sm"
          ? "relative h-10 w-10 overflow-hidden rounded-xl"
          : "relative h-12 w-12 overflow-hidden rounded-xl"
      }
    >
      <Image
        src={sources[index]}
        alt="Garajul cu Bere logo"
        fill
        sizes={size === "sm" ? "40px" : "48px"}
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
