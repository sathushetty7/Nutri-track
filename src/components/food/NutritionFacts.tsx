import type { NutritionFacts as NutritionFactsType } from "@/types/nutrition";

export function NutritionFacts({ facts }: { facts: NutritionFactsType }) {
  return (
    <div className="grid grid-cols-4 gap-3 text-center">
      {Object.entries(facts).map(([label, value]) => (
        <div key={label} className="rounded-xl bg-[#E8F1E8] p-3 border border-[#d6e5d6]">
          <p className="text-lg font-bold text-[#173F35]">{String(value)}</p>
          <p className="text-xs capitalize text-[#78847C]">{label}</p>
        </div>
      ))}
    </div>
  );
}
