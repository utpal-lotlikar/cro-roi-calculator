import MissedRevenue from "@/components/missed-revenue";

export default function Home() {
  return (
    <main className="max-w-md mx-auto" suppressHydrationWarning={true}>
      <MissedRevenue />
    </main>
  );
}
