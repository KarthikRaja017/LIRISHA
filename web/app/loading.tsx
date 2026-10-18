import { BrandLoader } from '@/components/ui/BrandLoader';

export default function Loading() {
  return (
    <BrandLoader
      fullScreen
      size="lg"
      message="Loading LIRISHA..."
      // subMessage="Connecting to live database"
    />
  );
}
