import { redirect } from "next/navigation";

export default function MealDetailRedirect() {
  redirect("/dashboard/history");
}
