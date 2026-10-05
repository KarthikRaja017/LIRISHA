import type { Metadata } from "next";
import { SiteNavbar } from "@/components/smartphoto/SiteNavbar";
import { SiteFooter } from "@/components/smartphoto/SiteFooter";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";
import { CustomCursor } from "@/components/smartphoto/CustomCursor";

export const metadata: Metadata = {
  title: "Real Estate Sky Replacement & Twilight Services | SmartPHOTOeditors",
  description:
    "Swap dull grey skies for bright blue skies or dramatic golden hour sunsets. Day to dusk virtual twilight conversions that captivate real estate buyers.",
};

export default function SkyReplacementPage() {
  return (
    <div className="relative min-h-screen bg-white">
      <CustomCursor />
      <SiteNavbar />
      <main className="main-section">
        <SubServiceDetailContent
          categorySlug="real-estate"
          subServiceSlug="sky-replacement"
          title="Sky Replacement & Twilight Conversion"
          tagline="Day-to-Dusk Sunset Conversions & Radiant Blue Sky Replacements"
          description="Never let cloudy weather ruin a scheduled listing photoshoot. We swap overexposed white or dreary overcast skies with radiant blue sunny skies or moody dusk twilights, adjusting ground lighting, window warmth, and outdoor lamps accordingly."
          beforeSrc="https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Sky-Replacement/001-before-525x.webp"
          afterSrc="https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Sky-Replacement/001-after-525x.webp"
          features={[
            "Day to dusk virtual twilight conversion",
            "Interior and exterior warm lighting turn-on simulation",
            "Fine tree foliage edge masking with zero halo",
            "Sunset, golden hour, and clear blue sky library options",
            "Water reflection mirroring for lakes and pools",
            "12-hour turnaround"
          ]}
        />
        <SiteFooter />
      </main>
    </div>
  );
}
