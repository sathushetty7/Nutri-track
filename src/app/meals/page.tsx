import { redirect } from "next/navigation";

export default function MealsRedirect() {
  redirect("/dashboard/history");
}
