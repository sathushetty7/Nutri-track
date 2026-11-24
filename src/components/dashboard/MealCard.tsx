import type { Meal } from "@/types/nutrition";

export function MealCard({ meal }: { meal: Meal }) {
  return (
    <article className="rounded-2xl border border-[#E2E8E2] bg-white p-5 shadow-xs">
      <h3 className="font-semibold text-base text-[#173F35]">{meal.mealName}</h3>
      <p className="mt-2 text-sm text-[#78847C]">
        {(meal.items || []).map((food) => food.foodName).join(", ")}
      </p>
    </article>
  );
}
