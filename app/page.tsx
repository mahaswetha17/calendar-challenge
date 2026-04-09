import CalendarWidget from "@/components/CalendarWidget";

export default function Home() {
  return (
    // This container centers your calendar on the screen and gives it a nice background
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <CalendarWidget />
    </main>
  );
}