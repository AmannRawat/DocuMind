import { Show } from '@clerk/nextjs'
import LandingPage from '@/components/landing/LandingPage'
import DashboardController from '@/components/dashboard/DashboardController'

export default function Home() {
  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden">
      <Show when="signed-out">
        <LandingPage />
      </Show>
      <Show when="signed-in">
        <DashboardController />
      </Show>
    </div>
  );
}
