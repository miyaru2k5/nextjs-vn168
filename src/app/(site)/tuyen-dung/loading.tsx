import { CareersHero } from '@/components/careers/careers-hero';
import { CareersListingSkeleton } from '@/components/careers/careers-card-skeleton';

export default function TuyenDungLoading() {
  return (
    <>
      <CareersHero />
      <CareersListingSkeleton />
    </>
  );
}
