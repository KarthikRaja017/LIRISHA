import type { Metadata } from "next";
import { SiteNavbar } from "@/components/smartphoto/SiteNavbar";
import { SiteFooter } from "@/components/smartphoto/SiteFooter";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";
import { CustomCursor } from "@/components/smartphoto/CustomCursor";

export const metadata: Metadata = {
  title: "E-Commerce Product Image Editing Services | SmartPHOTOeditors",
  description:
    "Marketplace-compliant product image editing for Amazon, eBay, Shopify, and Walmart. Pure white background, drop shadow creation, and color matching.",
};

export default function EcommerceEditingPage() {
  return (
    <div className="relative min-h-screen bg-white">
      <CustomCursor />
      <SiteNavbar />
      <main className="main-section">
        <SubServiceDetailContent
          categorySlug="ecommerce"
          subServiceSlug="ecommerce-image-editing"
          title="E-Commerce Product Image Editing"
          tagline="Amazon, eBay & Shopify Compliant Product Imagery with Pure White Backgrounds & Natural Shadows"
          description="Online shoppers make purchasing decisions in seconds based entirely on visual quality. We optimize your product catalogs to meet and exceed the stringent technical requirements of Amazon, Shopify, Walmart, and Google Shopping. From dust and scratch removal to dimensional drop shadow creation and standardized aspect ratios, we make your catalog stand out."
          beforeSrc="https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Product/002-before.webp"
          afterSrc="https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Product/002-after.webp"
          features={[
            "Pure RGB (255,255,255) Amazon white background",
            "Natural drop, cast, and mirror reflection shadow generation",
            "True-to-life Pantone and fabric color matching",
            "Fingerprint, dust speck, and specular glare cleanup",
            "Consistent margin alignment (85% frame fill ratio)",
            "High-resolution 2000px zoom capability"
          ]}
        />
        <SiteFooter />
      </main>
    </div>
  );
}
