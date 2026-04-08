import { getCurrentUser } from "@/lib/auth";
import { GalleryPageClient } from "@/components/gallery-page-client";
import { getGalleryItems } from "@/lib/gallery-store";

export default async function GalleryPage() {
  const [galleryItems, user] = await Promise.all([getGalleryItems(), getCurrentUser()]);
  const items = galleryItems.map((item) => ({
    ...item,
    url: item.image
  }));

  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="page-intro">
        <p className="section-kicker">Galerie</p>
        <h1 className="section-title">Galerie</h1>
      </div>
      <GalleryPageClient initialItems={items} isAdmin={user?.role === "ADMIN"} />
    </div>
  );
}
