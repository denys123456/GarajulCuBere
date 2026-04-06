import { MenuCarousel } from "@/components/menu-carousel";
import { menuCategories } from "@/lib/menu-data";

export default function MenuPage() {
  return (
    <div className="section-shell space-y-10 py-10 pb-24 lg:py-16">
      <div className="max-w-3xl space-y-4">
        <p className="section-kicker">Digital Menu</p>
        <h1 className="section-title">A menu built like a product, not a poster</h1>
        <p className="text-sm leading-8 text-white/60">
          Fiecare categorie este gândită ca un slider dedicat. Glisează, trage și explorează oferta exact așa cum ar
          trebui să arate un meniu premium într-un spațiu modern.
        </p>
      </div>

      <div className="space-y-12">
        {menuCategories.map((category) => (
          <MenuCarousel key={category.title} category={category} />
        ))}
      </div>
    </div>
  );
}
