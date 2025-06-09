import { WidgetsGrid } from "@/components";

export const metadata = {
  title: "Dashboard",
  description: "Información general del sistema",
};

export default function MainPage() {
  return (
    <div className="text-black p-2">
      <h1 className="mt-2 text-3xl">Dashboard</h1>
      <span className="text-xl">Información general</span>
      <WidgetsGrid />
    </div>
  );
}