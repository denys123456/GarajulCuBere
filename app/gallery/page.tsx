import { GalleryGrid } from "@/components/gallery-grid";
import { galleryItems } from "@/lib/seed-data";

export default function GalleryPage() {
  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="max-w-3xl space-y-4">
        <p className="section-kicker">Gallery</p>
        <h1 className="section-title">Premium atmosphere, framed in motion</h1>
        <p className="text-sm leading-8 text-white/60">
          O galerie întunecată, aerisită și cinematică, construită cu lightbox fullscreen și tranziții fluide.
        </p>
      </div>
      <div className="mt-10">
        <GalleryGrid items={[...galleryItems]} />
      </div>
    </div>
  );
}
