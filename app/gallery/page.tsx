import { GalleryGrid } from "@/components/gallery-grid";
import { Reveal } from "@/components/reveal";
import { galleryItems } from "@/lib/seed-data";

export default function GalleryPage() {
  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="page-intro">
        <p className="section-kicker">Gallery</p>
        <h1 className="section-title">Moments framed with more breathing room</h1>
        <p className="text-base leading-8 text-ink/68">
          A lighter, quieter gallery presentation that keeps the focus on atmosphere and detail.
        </p>
      </div>
      <Reveal className="mt-10">
        <GalleryGrid items={[...galleryItems]} />
      </Reveal>
    </div>
  );
}
