import Hero from '@/components/HeroComponents/Hero';
import FeaturesClient from '@/components/HomeComponents/FeaturesClient';
import StatsClient from '@/components/HomeComponents/StatsClient';
import { checkUser } from "@/lib/checkUser";

export default async function HomePage() {
  const user = await checkUser();
  
  let dashboardRoute = null;
  if (user) {
    if (user.role === 'ADMIN') dashboardRoute = '/admin';
    else if (user.role === 'TEACHER') dashboardRoute = '/teacher';
    else dashboardRoute = '/portal';
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full flex flex-col items-center overflow-hidden">
        <Hero dashboardRoute={dashboardRoute} />
        <FeaturesClient />
        <StatsClient />
      </main>
    </div>
  );
}