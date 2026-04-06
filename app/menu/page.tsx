import { DrinksMenuGrid } from "@/components/drinks-menu-grid";
import { Reveal } from "@/components/reveal";
import { getDrinkMenuCategories } from "@/lib/drinks-menu";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const menuCategories = await getDrinkMenuCategories();

  return (
    <div className="section-shell space-y-10 py-10 pb-24 lg:py-16">
      <div className="page-intro">
        <p className="section-kicker">Meniu</p>
        <h1 className="section-title">Meniu</h1>
      </div>

      <div className="space-y-12">
        {menuCategories.map((category, index) => (
          <Reveal key={category.key} delay={index * 0.03}>
            <DrinksMenuGrid category={category} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
