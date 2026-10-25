import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Pop Art & Artistic Effects | SmartPHOTOeditors",
  description: "Transform standard photographs into vibrant Andy Warhol-style pop art, comic book illustrations, and digital paintings.",
};

export default function PopArtPage() {
  return (
    <SubServiceDetailContent
      categorySlug="photoshop-services"
      subServiceSlug="pop-art"
      title="Pop Art & Artistic Stylization"
      tagline="Transform Photos into Vivid Andy Warhol-Style Pop Art, Comic Book Graphics & Digital Fine Art"
      description="Give your portraits, brand campaigns, and promotional merchandise an iconic visual flair. Our digital illustrators convert photographs into high-contrast halftone pop art, Lichtenstein comic styles, and expressive digital canvas paintings."
      features={[
        "Andy Warhol 4-panel screenprint stylization",
        "Vintage comic book Ben-Day dot shading",
        "Vector stencil & street art spray-paint effects",
        "High-saturation vibrant CMYK color grading",
        "Custom canvas texture & print emulation",
        "Ready-to-print poster & wall art resolution"
      ]}
    />
  );
}
