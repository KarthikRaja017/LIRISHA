import { ServiceCategory } from "@/types/content";

export const FALLBACK_SERVICES: ServiceCategory[] = [
  {
    "id": "ecommerce",
    "slug": "ecommerce",
    "name": "E-Commerce Product Image Editing",
    "tagline": "Marketplace-Ready Product Imagery that Drives Conversions & Sales",
    "shortDesc": "High-volume product photo retouching for Amazon, Shopify, eBay, and luxury online retailers with pure white backgrounds, natural shadows, and color accuracy.",
    "fullDesc": "LIRISHA delivers high-speed, high-volume e-commerce photo editing that meets strict marketplace guidelines. From pure white #FFFFFF Amazon backgrounds and soft drop shadows to multi-angle ghost mannequin composites, our dedicated production line processes thousands of SKUs daily with strict quality control.",
    "iconClass": "fa-solid fa-cart-shopping",
    "heroImage": "/images/homepage/product-editing.webp",
    "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-before-525x.webp",
    "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-after-525x.webp",
    "beforeAlt": "E-Commerce Product Before Retouching",
    "afterAlt": "E-Commerce Product After Retouching",
    "turnaroundTime": "12 - 24 Hours",
    "deliverables": [
      "High-Res JPEG",
      "Amazon Ready 2000x2000",
      "Transparent PNG",
      "Layered PSD"
    ],
    "keyBenefits": [
      "Amazon 85% frame rule compliance",
      "Consistent lighting across all catalog SKUs",
      "Pure white 255/255/255 RGB background",
      "Overnight batch capacity of 5,000+ images"
    ],
    "subServices": [
      {
        "id": "pure-white-background",
        "link": "/ecommerce/pure-white-background",
        "name": "Pure White Background (#FFFFFF)",
        "features": [
          "Amazon 85% frame rule compliance",
          "Clean edge halo elimination",
          "Multi-format export (WebP, JPG, transparent PNG)"
        ],
        "description": "Replace distracting backgrounds with clean Amazon, eBay, and Shopify compliant 255/255/255 pure white backgrounds."
      },
      {
        "id": "shadow-reflection-creation",
        "link": "/ecommerce/shadow-reflection-creation",
        "name": "Product Shadow & Reflection Creation",
        "features": [
          "Natural cast shadow placement",
          "Glossy mirror surface reflection",
          "Soft commercial drop shadow"
        ],
        "description": "Generate authentic natural cast shadows, soft drop shadows, or glossy mirror reflections for floating product realism."
      },
      {
        "id": "product-defect-cleanup",
        "link": "/ecommerce/product-defect-cleanup",
        "name": "Product Defect & Scratch Cleanup",
        "features": [
          "Micro scratch removal",
          "Fabric lint & thread cleanup",
          "Color vibrancy & metal polish"
        ],
        "description": "Digitally erase manufacturing imperfections, scratches, lint, dust specs, sensor spots, and fingerprint blemishes."
      },
      {
        "id": "ghost-mannequin-editing",
        "link": "/ecommerce/ghost-mannequin-editing",
        "name": "Apparel & Ghost Mannequin Editing",
        "features": [
          "Inner collar stitching",
          "3D depth restoration",
          "Symmetrical hem alignment"
        ],
        "description": "Merge neck, collar, and inner lining shots into invisible 3D hollow mannequin apparel presentation."
      }
    ]
  },
  {
    "id": "fashion",
    "slug": "fashion",
    "name": "Fashion & Apparel Editing",
    "tagline": "Flawless Fashion & Apparel Imagery for Lookbooks & Fashion Retailers",
    "shortDesc": "Transform studio apparel shots into stunning catalog assets with ghost mannequin neck joints, wrinkle removal, color matching, and editorial retouching.",
    "fullDesc": "LIRISHA offers specialized post-production for fashion brands, apparel manufacturers, and runway lookbooks. We smooth fabric wrinkles, align asymmetrical hems, create invisible mannequin composites, and match fabric colors precisely to physical dye lots.",
    "iconClass": "fa-solid fa-shirt",
    "heroImage": "/images/homepage/fashion.webp",
    "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-before-525x.webp",
    "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-after-525x.webp",
    "beforeAlt": "Fashion Garment Before Retouching",
    "afterAlt": "Fashion Garment After Retouching",
    "turnaroundTime": "12 - 24 Hours",
    "deliverables": [
      "High-Res JPEG",
      "E-Commerce Cropped WebP",
      "Layered PSD with Paths",
      "TIFF 300 DPI"
    ],
    "keyBenefits": [
      "Preserves authentic fabric texture and weave",
      "Accurate dye lot Pantone matching",
      "Symmetrical collar, hem, and cuff alignment",
      "High-volume overnight catalog turnaround"
    ],
    "subServices": [
      {
        "id": "ghost-mannequin-photo-editing",
        "link": "/fashion/ghost-mannequin-photo-editing",
        "name": "Ghost Mannequin / Neck Joint",
        "features": [
          "Seamless collar stitching",
          "3D hollow depth reconstruction",
          "Tag & brand label alignment"
        ],
        "description": "Remove plastic mannequins to produce realistic 3D hollow apparel presentations showing collars, tags, and inner linings."
      },
      {
        "id": "wrinkle-crease-smoothing",
        "link": "/fashion/wrinkle-crease-smoothing",
        "name": "Apparel Wrinkle & Crease Smoothing",
        "features": [
          "Texture-preserving iron effect",
          "Crease and fold removal",
          "Fabric drape harmonization"
        ],
        "description": "Iron out heavy wrinkles, studio creases, and fabric bunching while preserving natural cloth texture and weave."
      },
      {
        "id": "colorway-swatch-generation",
        "link": "/fashion/colorway-swatch-generation",
        "name": "Colorway & Fabric Swatch Generation",
        "features": [
          "Pantone color matching",
          "Pattern & print mapping",
          "Multi-colorway catalog batches"
        ],
        "description": "Transform one reference garment into multiple accurate colorway catalog options without re-shooting."
      },
      {
        "id": "high-end-fashion-retouching",
        "link": "/fashion/high-end-fashion-retouching",
        "name": "High-End Model & Fashion Retouching",
        "features": [
          "Frequency separation skin smoothing",
          "Hair stray flyaway elimination",
          "Magazine editorial color grading"
        ],
        "description": "Editorial frequency separation skin retouching, body shaping, hair flyaway removal, and haute couture color grading."
      }
    ]
  },
  {
    "id": "image-clipping",
    "slug": "image-clipping",
    "name": "Image Clipping & Masking",
    "tagline": "Pixel-Perfect Vector Clipping Paths & Complex Alpha Hair Masking",
    "shortDesc": "Handcrafted vector pen paths and alpha channel masks to isolate products, models, furniture, and complex objects from any background.",
    "fullDesc": "LIRISHA specializes in precision manual clipping paths and advanced hair masking. We never use automated shortcuts\u2014every edge is hand-traced using the Photoshop Pen Tool at 300% zoom, ensuring pin-sharp vector outlines and natural edge transparency.",
    "iconClass": "fa-solid fa-scissors",
    "heroImage": "/images/homepage/image-clipping.webp",
    "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-before-525x.webp",
    "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-after-525x.webp",
    "beforeAlt": "Image Before Clipping Path",
    "afterAlt": "Image After Clipping Path",
    "turnaroundTime": "12 - 24 Hours",
    "deliverables": [
      "Embedded Photoshop Paths",
      "Transparent PNG",
      "High-Res JPEG",
      "Layer Masked PSD"
    ],
    "keyBenefits": [
      "100% handcrafted Pen Tool vector curves",
      "Zero jagged edges or automated halos",
      "Complex multi-path isolation for color adjustments",
      "Capacity for 10,000+ paths daily"
    ],
    "subServices": [
      {
        "id": "clipping-path-services",
        "link": "/image-clipping/clipping-path-services",
        "name": "Handcrafted Vector Clipping Path",
        "features": [
          "100% manual Pen Tool paths",
          "Sub-pixel edge alignment",
          "Embedded Photoshop path layers"
        ],
        "description": "100% manual Pen Tool clipping paths with smooth vector bezier curves for sharp, crisp subject isolation."
      },
      {
        "id": "hair-masking",
        "link": "/image-clipping/hair-masking",
        "name": "Complex Hair & Fur Alpha Channel Masking",
        "features": [
          "Alpha channel luminance masking",
          "Fine strand edge recovery",
          "Zero edge color contamination"
        ],
        "description": "Preserve translucent flyaways, fine hair strands, furry animal edges, and fine fiber meshes with alpha channel isolation."
      },
      {
        "id": "car-image-clipping",
        "link": "/image-clipping/car-image-clipping",
        "name": "Automotive & Vehicle Image Clipping",
        "features": [
          "Windshield reflection cleanup",
          "Tire tread darkening & rim shine",
          "Showroom floor reflection matching"
        ],
        "description": "Clean isolation of vehicles, windshield tint balancing, tire cleaning, and modern showroom background replacement."
      },
      {
        "id": "tracing-image",
        "link": "/image-clipping/tracing-image",
        "name": "Raster to Vector Tracing Services",
        "features": [
          "Infinitely scalable vectors",
          "Clean bezier node optimization",
          "Print-ready CMYK output"
        ],
        "description": "Convert low-res pixelated logos, sketches, and illustrations into infinitely scalable vector AI, EPS, and SVG formats."
      },
      {
        "id": "product-image-clipping",
        "link": "/image-clipping/product-image-clipping",
        "name": "Precision Product Image Clipping",
        "features": [
          "Multi-path component isolation",
          "Hole & cutout transparency",
          "Transparent PNG batch delivery"
        ],
        "description": "Isolate multi-component hardware, furniture, consumer electronics, and complex machinery."
      }
    ]
  },
  {
    "id": "jewelry",
    "slug": "jewelry",
    "name": "Jewelry Photo Retouching",
    "tagline": "Captivating Luster, Gemstone Brilliance & Flawless Metal Polish",
    "shortDesc": "High-end luxury jewelry retouching with macro focus stacking, scratch removal, diamond sparkle enhancement, and gold reflection cleanup.",
    "fullDesc": "Jewelry photography is notoriously challenging due to reflective metals, micro-scratches, and shallow macro depth of field. LIRISHA's master jewelry retouchers polish metals to mirror-smooth perfection, enhance gemstone clarity and dispersion, and eliminate studio reflections.",
    "iconClass": "fa-solid fa-gem",
    "heroImage": "/images/homepage/jewelry.webp",
    "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-before-525x.webp",
    "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-after-525x.webp",
    "beforeAlt": "Jewelry Ring Before Retouching",
    "afterAlt": "Jewelry Ring After Retouching",
    "turnaroundTime": "12 - 24 Hours",
    "deliverables": [
      "High-Res TIFF 300 DPI",
      "Web-Optimized JPEG",
      "Transparent PNG",
      "Print Ready CMYK"
    ],
    "keyBenefits": [
      "Diamond and gemstone facet sparkle recovery",
      "Flawless elimination of dust, fingerprints, and micro-buff marks",
      "Natural gold, rose gold, and platinum luster",
      "Focus stacking alignment for edge-to-edge sharpness"
    ],
    "subServices": [
      {
        "id": "diamond-gemstone-enhancement",
        "link": "/jewelry/diamond-gemstone-enhancement",
        "name": "Diamond & Gemstone Sparkle Enhancement",
        "features": [
          "Facet clarity sharpening",
          "Color saturation & dispersion boost",
          "Dust & inclusion removal"
        ],
        "description": "Enhance brilliance, fire, and facets of diamonds, rubies, emeralds, and sapphires while removing dull reflections."
      },
      {
        "id": "metal-smoothing-polishing",
        "link": "/jewelry/metal-smoothing-polishing",
        "name": "Metal Smoothing, Polish & Reflection",
        "features": [
          "Camera reflection elimination",
          "High-gloss surface smoothing",
          "Authentic metal luster restoration"
        ],
        "description": "Polish gold, silver, rose gold, and platinum surfaces to eliminate camera reflections, scratches, and micro-buff marks."
      },
      {
        "id": "macro-focus-stacking",
        "link": "/jewelry/macro-focus-stacking",
        "name": "Macro Focus Stacking for Fine Jewelry",
        "features": [
          "Multi-focus plane alignment",
          "Corner-to-corner tack sharpness",
          "Zero macro optical distortion"
        ],
        "description": "Blend multiple macro focal planes into one pin-sharp image with edge-to-edge depth of field on intricate rings and necklaces."
      },
      {
        "id": "jewelry-shadow-creation",
        "link": "/jewelry/jewelry-shadow-creation",
        "name": "Jewelry Shadow & Background Creation",
        "features": [
          "Floating drop shadow",
          "Mirror glass reflection",
          "E-commerce luxury white background"
        ],
        "description": "Place luxury pieces on pure white, deep black, or marble textures with delicate drop shadows and mirror reflections."
      }
    ]
  },
  {
    "id": "lightroom-services",
    "slug": "lightroom-services",
    "name": "Lightroom Services & Batch Processing",
    "tagline": "High-Volume RAW Processing, Culling & Color Grading for Busy Studios",
    "shortDesc": "Fast, consistent RAW batch processing for wedding, portrait, and commercial photographers with custom preset application and exposure leveling.",
    "fullDesc": "Save hundreds of editing hours during peak wedding and event seasons. LIRISHA's Adobe Lightroom specialists handle your RAW catalogs with precision\u2014culling out blinks, leveling exposures across bursts, synchronizing white balance, and applying your signature color presets.",
    "iconClass": "fa-solid fa-sliders",
    "heroImage": "/images/homepage/lightroom.webp",
    "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-before-525x.webp",
    "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-after-525x.webp",
    "beforeAlt": "Raw Photo Before Lightroom Processing",
    "afterAlt": "Raw Photo After Lightroom Processing",
    "turnaroundTime": "12 - 24 Hours",
    "deliverables": [
      "Lightroom Catalog (.lrcat + Smart Previews)",
      "High-Res JPEGs",
      "XMP Sidecars",
      "Web Galley Ready"
    ],
    "keyBenefits": [
      "Overnight delivery for 1,000+ photo catalogs",
      "Exact replication of your custom photographer presets",
      "Skin tone harmonization across different lighting",
      "Significant reduction in post-production backlog"
    ],
    "subServices": [
      {
        "id": "photo-culling-selection",
        "link": "/lightroom-services/photo-culling-selection",
        "name": "Event & Wedding Photo Culling",
        "features": [
          "50-70% volume reduction",
          "Smart duplicate rating & flagging",
          "Focus & expression verification"
        ],
        "description": "Filter through thousands of photoshoot captures to eliminate blinks, duplicates, test shots, and out-of-focus frames."
      },
      {
        "id": "color-grading-white-balance",
        "link": "/lightroom-services/color-grading-white-balance",
        "name": "Color Grading & White Balance Sync",
        "features": [
          "Multi-camera color matching",
          "Mixed lighting temperature fix",
          "Film & cinematic tone grading"
        ],
        "description": "Harmonize skin tones, eliminate mixed ambient lighting casts, and synchronize consistent color across multi-camera shoots."
      },
      {
        "id": "exposure-leveling-matching",
        "link": "/lightroom-services/exposure-leveling-matching",
        "name": "Exposure Leveling & Dynamic Range",
        "features": [
          "Burst sequence exposure matching",
          "Highlight & shadow recovery",
          "Black & white point clipping fix"
        ],
        "description": "Balance highlights, midtones, and shadows across sequence bursts to ensure uniform album lighting and contrast."
      },
      {
        "id": "preset-profile-sync",
        "link": "/lightroom-services/preset-profile-sync",
        "name": "Preset Application & Profile Sync",
        "features": [
          "Custom .xmp preset application",
          "Fine-tuned exposure adaptation",
          "Batch catalog (.lrcat) delivery"
        ],
        "description": "Apply client-supplied custom Lightroom Presets (.xmp) with customized per-photo calibration and tuning."
      }
    ]
  },
  {
    "id": "photo-restoration",
    "slug": "photo-restoration",
    "name": "Photo Restoration & Repair",
    "tagline": "Breathe New Life into Damaged, Torn & Faded Vintage Photographs",
    "shortDesc": "Museum-grade digital photo restoration for antique prints, torn family heirlooms, water damage, silvering, and black & white colorization.",
    "fullDesc": "Preserve your cherished history. LIRISHA digitally restores cracked, faded, torn, and water-damaged photographs without touching your original print. We blend missing facial features, eliminate mildew spots, deepen contrast, and add vibrant, historically accurate color.",
    "iconClass": "fa-solid fa-clock-rotate-left",
    "heroImage": "/images/homepage/photo-restoration.webp",
    "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-before-525x.webp",
    "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-after-525x.webp",
    "beforeAlt": "Antique Damaged Photo Before Restoration",
    "afterAlt": "Antique Damaged Photo After Restoration",
    "turnaroundTime": "12 - 24 Hours",
    "deliverables": [
      "High-Res Archival TIFF",
      "Print Ready 300-600 DPI",
      "Web Shareable JPEG",
      "Before/After Composite"
    ],
    "keyBenefits": [
      "Tears, crease folds, and water stains completely erased",
      "Authentic period-accurate colorization",
      "Facial and architectural reconstruction of missing parts",
      "Archival print-ready resolution up to 600 DPI"
    ],
    "subServices": [
      {
        "id": "damaged-photo-repair",
        "link": "/photo-restoration/damaged-photo-repair",
        "name": "Torn, Creased & Water Damaged Repair",
        "features": [
          "Fold, crease & tear reconstruction",
          "Water stain & mold cleanup",
          "Missing border & facial reconstruction"
        ],
        "description": "Reconstruct missing pieces, repair tears, blend water damage stains, and remove heavy tape marks from family heirlooms."
      },
      {
        "id": "bw-photo-colorization",
        "link": "/photo-restoration/bw-photo-colorization",
        "name": "Vintage Black & White Photo Colorization",
        "features": [
          "Natural skin tone layering",
          "Period-accurate garment colors",
          "Eye & hair color precision"
        ],
        "description": "Add realistic, historically accurate color palettes to monochrome and sepia historical and family photographs."
      },
      {
        "id": "faded-contrast-recovery",
        "link": "/photo-restoration/faded-contrast-recovery",
        "name": "Faded Contrast & Detail Recovery",
        "features": [
          "Deep shadow contrast recovery",
          "Grain reduction & texture preserve",
          "High-resolution archival print ready"
        ],
        "description": "Restore deep rich blacks, crisp highlight details, and dynamic tonal range to silver gelatin and albumin prints."
      },
      {
        "id": "antique-portrait-restoration",
        "link": "/photo-restoration/antique-portrait-restoration",
        "name": "Antique Portrait & Heritage Restoration",
        "features": [
          "Silvering & solarization correction",
          "Emulsion crack repair",
          "Museum-grade digital preservation"
        ],
        "description": "Careful digital conservation of tintypes, daguerreotypes, and fragile glass plate negatives."
      }
    ]
  },
  {
    "id": "photoshop-services",
    "slug": "photoshop-services",
    "name": "Photoshop & Creative Services",
    "tagline": "Advanced Compositing, Focus Stacking & High-Impact Creative Manipulation",
    "shortDesc": "Expert Adobe Photoshop editing services: complex compositing, pop art, stock photo customization, vector conversions, and special effects.",
    "fullDesc": "When your project demands technical excellence beyond standard retouching, LIRISHA's senior Photoshop artists deliver. We execute seamless multi-image composites, perspective-correct object insertions, macro focus stacking, and advertising-grade creative visuals.",
    "iconClass": "fa-solid fa-paintbrush",
    "heroImage": "/images/homepage/photoshop.webp",
    "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-before-525x.webp",
    "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-after-525x.webp",
    "beforeAlt": "Image Before Photoshop Manipulation",
    "afterAlt": "Image After Photoshop Manipulation",
    "turnaroundTime": "12 - 24 Hours",
    "deliverables": [
      "Layered PSD (Organized Groups)",
      "High-Res TIFF",
      "WebP / JPEG",
      "Vector AI / EPS / SVG"
    ],
    "keyBenefits": [
      "Non-destructive layered PSD workflow",
      "Lighting, shadow, and color temperature matched composites",
      "Advertising-grade creative transformations",
      "Fast iterative feedback with senior art directors"
    ],
    "subServices": [
      {
        "id": "stock-photo-editing",
        "link": "/photoshop-services/stock-photo-editing",
        "name": "Stock Photo Editing & Customization",
        "features": [
          "Screen mockup replacement",
          "Logo & graphic insertion",
          "Color theme customization"
        ],
        "description": "Customize stock images with brand colors, product placements, screen mockups, and corporate brand alignment."
      },
      {
        "id": "image-cloning",
        "link": "/photoshop-services/image-cloning",
        "name": "Image Cloning & Seamless Compositing",
        "features": [
          "Perspective-matched compositing",
          "Light & shadow cast synthesis",
          "Seamless edge feathering"
        ],
        "description": "Combine multiple photos, background elements, and subjects into hyper-realistic composites with matched lighting and perspective."
      },
      {
        "id": "focus-stacking",
        "link": "/photoshop-services/focus-stacking",
        "name": "Focus Stacking & Macro Exposure Fusion",
        "features": [
          "Macro focus bracket merging",
          "Zero halo alignment",
          "Edge-to-edge tack sharpness"
        ],
        "description": "Merge multiple depth slices into one pin-sharp image for macro photography, commercial products, and architecture."
      },
      {
        "id": "vector-graphics",
        "link": "/photoshop-services/vector-graphics",
        "name": "Vector Graphics & Graphic Design Support",
        "features": [
          "Scalable vector art",
          "Typography & label design",
          "Multi-format SVG, EPS, AI delivery"
        ],
        "description": "Vector conversion, graphic badge overlays, typography insertion, and layout support for commercial assets."
      },
      {
        "id": "pop-art",
        "link": "/photoshop-services/pop-art",
        "name": "Pop Art & Creative Transformations",
        "features": [
          "Warhol screen print effects",
          "Halftone comic dot shading",
          "Stylized bold color palettes"
        ],
        "description": "Transform portrait and product photography into Andy Warhol style screen prints, comic sketches, and vibrant pop art."
      },
      {
        "id": "special-effects",
        "link": "/photoshop-services/special-effects",
        "name": "Special Effects & Artistic Manipulation",
        "features": [
          "Atmospheric fog & lighting effects",
          "Lens flare & neon glows",
          "Surreal commercial composites"
        ],
        "description": "Atmospheric effects, smoke, light rays, neon glows, lens flares, and fantasy surrealism for advertising campaigns."
      }
    ]
  },
  {
    "id": "real-estate",
    "slug": "real-estate",
    "name": "Real Estate Image Editing",
    "tagline": "Stunning Property Imagery that Accelerates Home Sales & Bookings",
    "shortDesc": "Transform interior and exterior real estate photography with HDR blending, flawless sky replacements, lawn enhancement, 360 virtual tours, and floor plans.",
    "fullDesc": "LIRISHA delivers industry-leading real estate photo editing services for MLS listings, realtors, property developers, and architectural photographers. From correcting harsh interior lighting with multi-exposure HDR blending to replacing dreary grey skies with radiant sunsets, our Adobe-certified artists ensure every property looks vibrant, inviting, and realistic.",
    "iconClass": "fa-solid fa-house-chimney",
    "heroImage": "/images/homepage/real-estate.webp",
    "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-before-525x.webp",
    "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-after-525x.webp",
    "beforeAlt": "Real Estate Property Before HDR Blending",
    "afterAlt": "Real Estate Property After HDR Blending",
    "turnaroundTime": "12 - 24 Hours",
    "deliverables": [
      "High-Res JPEG",
      "MLS Web Ready",
      "TIFF / PSD Layers",
      "Print Resolution 300 DPI"
    ],
    "keyBenefits": [
      "Boost listing views by up to 68%",
      "Flawless window-pull technique showing crisp outdoor views",
      "Corrects wide-angle lens vertical perspective distortion",
      "Declutters personal items and cords seamlessly"
    ],
    "subServices": [
      {
        "id": "hdr-blending-corrections",
        "link": "/real-estate/hdr-blending-corrections",
        "name": "HDR Blending Corrections",
        "features": [
          "Window-pull exposure masking for crisp outdoor views",
          "Color cast neutralization from mixed tungsten & daylight bulbs",
          "Flash reflection removal on wood floors & glass tables"
        ],
        "description": "Fuse bracketed exposures into a single, perfectly balanced photograph with natural interior and exterior highlights."
      },
      {
        "id": "sky-replacement",
        "link": "/real-estate/sky-replacement",
        "name": "Sky Replacement & Twilight",
        "features": [
          "Day to dusk conversion",
          "Sunset enhancement",
          "Cloud naturalization"
        ],
        "description": "Swap overcast skies for blue sunny skies or moody dusk/twilight lighting to capture buyer imagination."
      },
      {
        "id": "image-enhancement",
        "link": "/real-estate/image-enhancement",
        "name": "Lawn & Foliage Enhancement",
        "features": [
          "Brown patch removal",
          "Grass color enrichment",
          "Garden cleanup"
        ],
        "description": "Turn patchy, brown grass into lush green lawns and restore vibrant landscaping."
      },
      {
        "id": "photo-corrections",
        "link": "/real-estate/photo-corrections",
        "name": "Item Removal & Decluttering",
        "features": [
          "Object erasure",
          "Furniture removal",
          "Wall patch cleanup"
        ],
        "description": "Erase distracting clutter, personal photos, cables, pet toys, and vehicles to make spaces feel expansive."
      },
      {
        "id": "floor-plan-conversions",
        "link": "/real-estate/floor-plan-conversions",
        "name": "2D & 3D Floor Plan Conversions",
        "features": [
          "Dimension annotation",
          "Furniture placement",
          "Full color styling"
        ],
        "description": "Transform hand sketches and architectural blueprints into high-impact, textured 2D and 3D visual layouts."
      },
      {
        "id": "360-virtual-tours",
        "link": "/real-estate/360-virtual-tours",
        "name": "360\u00b0 Virtual Tour & Panoramas",
        "features": [
          "Tripod removal",
          "Nadir patching",
          "360\u00b0 spherical stitching"
        ],
        "description": "Stitch 360-degree fisheye photos into seamless interactive virtual walkthroughs for Matterport & Zillow 3D."
      },
      {
        "id": "drone-image-editing",
        "link": "/real-estate/drone-image-editing",
        "name": "Drone Aerial Photo Editing",
        "features": [
          "Aerial haze removal",
          "Property line overlays",
          "Landscape saturation leveling"
        ],
        "description": "Enhance high-altitude aerial drone shots with perspective leveling, property boundary outlining, and haze reduction."
      },
      {
        "id": "perspective-correction",
        "link": "/real-estate/perspective-correction",
        "name": "Perspective Correction & Straightening",
        "features": [
          "Two-point perspective leveling",
          "Barrel & pincushion distortion fix",
          "Interior wall straightening"
        ],
        "description": "Straighten vertical walls and horizontal ceilings caused by wide-angle architectural lenses."
      }
    ]
  },
  {
    "id": "portrait",
    "slug": "portrait",
    "name": "Portrait Photo Retouching",
    "tagline": "Natural Beauty, Flawless Skin Texture & Editorial Elegance",
    "shortDesc": "Professional portrait, headshot, and wedding retouching: frequency separation skin smoothing, stray hair removal, eye brightening, and body shaping.",
    "fullDesc": "True beauty retouching requires a delicate balance\u2014enhancing subjects while keeping their unique identity intact. LIRISHA uses non-destructive dodge-and-burn and frequency separation to eliminate blemishes, soften wrinkles, remove stray hairs, and brighten eyes while preserving authentic skin pores.",
    "iconClass": "fa-solid fa-user",
    "heroImage": "/images/homepage/portrait.webp",
    "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-before-525x.webp",
    "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-after-525x.webp",
    "beforeAlt": "Portrait Photo Before Retouching",
    "afterAlt": "Portrait Photo After Retouching",
    "turnaroundTime": "12 - 24 Hours",
    "deliverables": [
      "High-Res JPEG",
      "Print TIFF 300 DPI",
      "Web-Optimized Headshot",
      "Layered PSD with Retouch Masks"
    ],
    "keyBenefits": [
      "Preserves authentic skin pore texture with frequency separation",
      "Gentle teeth whitening and eye sparkle enhancement",
      "Flawless stray flyaway hair removal",
      "Consistent skin tones across high-volume studio shoots"
    ],
    "subServices": [
      {
        "id": "skin-retouching",
        "link": "/portrait/skin-retouching",
        "name": "Skin Retouching & Frequency Separation",
        "features": [
          "Blemish & acne removal",
          "Frequency separation texture preservation",
          "Skin tone evening"
        ],
        "description": "Preserve genuine skin texture with high-end frequency separation, removing blemishes, acne, and redness naturally."
      },
      {
        "id": "wedding-photo-editing",
        "link": "/portrait/wedding-photo-editing",
        "name": "Wedding Photo Editing & Culling",
        "features": [
          "Batch exposure & tone sync",
          "Bridal gown wrinkle & stain fix",
          "Stray hair & flyaway removal"
        ],
        "description": "Comprehensive wedding batch culling, exposure balancing, romantic color grading, and bride & groom retouching."
      },
      {
        "id": "high-end-retouching",
        "link": "/portrait/high-end-retouching",
        "name": "High-End Beauty & Magazine Retouching",
        "features": [
          "Dodge and burn contouring",
          "Iris sparkle & eye whitening",
          "Lip color enhancement & teeth whitening"
        ],
        "description": "Pixel-level retouching for high-resolution fashion campaigns, editorial spreads, and beauty portraits."
      },
      {
        "id": "remove-backgrounds",
        "link": "/portrait/remove-backgrounds",
        "name": "Background Removal & Studio Replacement",
        "features": [
          "Fine hair edge isolation",
          "Realistic backdrop shadow casting",
          "Color spill neutralization"
        ],
        "description": "Extract portraits seamlessly and place on neutral studio backdrops, executive offices, or outdoor environments."
      },
      {
        "id": "airbrushing-services",
        "link": "/portrait/airbrushing-services",
        "name": "Airbrushing & Glamour Retouching",
        "features": [
          "Glamour skin glow",
          "Under-eye circle reduction",
          "Double chin & neck line reduction"
        ],
        "description": "Soft glamour airbrushing, skin glow enhancement, and subtle body contouring for portfolio shoots."
      },
      {
        "id": "color-corrections",
        "link": "/portrait/color-corrections",
        "name": "Studio Color Correction & White Balance",
        "features": [
          "Color temperature calibration",
          "Tungsten & fluorescent cast removal",
          "Consistent series lighting"
        ],
        "description": "Eliminate greenish tungsten casts, calibrate flash exposures, and achieve true-to-life skin tones."
      },
      {
        "id": "natural-shadow",
        "link": "/portrait/natural-shadow",
        "name": "Natural Drop & Cast Shadow Creation",
        "features": [
          "Foot & leg contact shadows",
          "Graduated soft shadow falloff",
          "Multiple light source simulation"
        ],
        "description": "Recreate authentic floor and wall contact shadows when subjects are isolated onto white or studio backdrops."
      },
      {
        "id": "photo-montage",
        "link": "/portrait/photo-montage",
        "name": "Photo Montage & Creative Composite",
        "features": [
          "Seamless head & face swapping",
          "Group photo subject insertion",
          "Matched lighting & lens blur"
        ],
        "description": "Group composite merging (inserting missing subjects), head swapping, and creative storytelling composites."
      }
    ]
  }
];
