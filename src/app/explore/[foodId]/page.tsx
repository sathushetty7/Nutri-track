import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VERIFIED_FOOD_DATABASE } from "@/lib/database/foodDatabase";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function FoodDetailPage({
  params,
}: {
  params: Promise<{ foodId: string }>;
}) {
  const { foodId } = await params;
  const food = VERIFIED_FOOD_DATABASE.find(
    (item) => item.id === foodId || item.name.toLowerCase().replace(/\s+/g, "-") === foodId
  );

  if (!food) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F1]">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 space-y-6">
        <Link href="/dashboard/recipes">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
            Back to Recipes & Foods
          </Button>
        </Link>

        <Card className="border border-[#E2E8E2]">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#A8BFA5] uppercase tracking-wider block">
                  {food.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173F35]">
                  {food.name}
                </h1>
                <p className="text-xs text-[#78847C] mt-1">
                  Standard serving: {food.defaultUnit} (~{food.gramsPerUnit}g)
                </p>
              </div>

              <Badge variant="verified" size="md">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Reference
              </Badge>
            </div>

            <div className="grid grid-cols-4 gap-3 p-4 bg-[#F8F7F1] rounded-2xl border border-[#EDF2EC] text-center">
              <div>
                <span className="text-[10px] text-[#78847C] font-semibold uppercase block">Energy</span>
                <span className="text-lg font-bold text-[#173F35]">{food.caloriesPer100g}</span>
                <span className="text-[10px] text-[#78847C] block">kcal / 100g</span>
              </div>
              <div>
                <span className="text-[10px] text-[#78847C] font-semibold uppercase block">Protein</span>
                <span className="text-lg font-bold text-[#245B48]">{food.proteinPer100g}g</span>
                <span className="text-[10px] text-[#78847C] block">per 100g</span>
              </div>
              <div>
                <span className="text-[10px] text-[#78847C] font-semibold uppercase block">Carbs</span>
                <span className="text-lg font-bold text-[#78847C]">{food.carbsPer100g}g</span>
                <span className="text-[10px] text-[#78847C] block">per 100g</span>
              </div>
              <div>
                <span className="text-[10px] text-[#78847C] font-semibold uppercase block">Fat</span>
                <span className="text-lg font-bold text-[#D97706]">{food.fatPer100g}g</span>
                <span className="text-[10px] text-[#78847C] block">per 100g</span>
              </div>
            </div>

            <div className="text-xs text-[#78847C]">
              <strong>Common Name Variations:</strong> {food.aliases.join(", ")}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
