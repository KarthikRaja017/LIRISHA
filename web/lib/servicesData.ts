export interface SubServiceItem {
  id: string;
  name: string;
  description: string;
  link: string;
  features?: string[];
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  iconClass: string;
  heroImage: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  subServices: SubServiceItem[];
  turnaroundTime: string;
  deliverables: string[];
  keyBenefits: string[];
}

export const servicesData: ServiceCategory[] = [
  {
    id: "real-estate",
    slug: "real-estate",
    name: "Real Estate Image Editing",
    tagline: "Stunning Property Imagery that Accelerates Home Sales & Bookings",
    shortDesc:
      "Transform interior and exterior real estate photography with HDR blending, flawless sky replacements, lawn enhancement, 360° virtual tours, and 2D/3D floor plans.",
    fullDesc:
      "SmartPHOTOeditors delivers industry-leading real estate photo editing services for MLS listings, realtors, property developers, and architectural photographers. From correcting harsh interior lighting with multi-exposure HDR blending to replacing dreary grey skies with radiant sunsets, our Adobe-certified artists ensure every property looks vibrant, inviting, and realistic.",
    iconClass: "fa-solid fa-house-chimney",
    heroImage: "/images/homepage/real-estate.webp",
    beforeSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-before-525x.webp",
    afterSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-after-525x.webp",
    beforeAlt: "Real Estate Property Before HDR Blending",
    afterAlt: "Real Estate Property After HDR Blending",
    turnaroundTime: "12 - 24 Hours",
    deliverables: ["High-Res JPEG", "MLS Web Ready", "TIFF / PSD Layers", "Print Resolution 300 DPI"],
    keyBenefits: [
      "Boost listing views by up to 68%",
      "Flawless window-pull technique showing crisp outdoor views",
      "Corrects wide-angle lens vertical perspective distortion",
      "Declutters personal items and cords seamlessly"
    ],
    subServices: [
      {
        id: "hdr-blending",
        name: "HDR Blending Corrections",
        description: "Fuse bracketed exposures into a single, perfectly balanced photograph with natural interior and exterior highlights.",
        link: "/real-estate/hdr-blending-corrections.php",
        features: ["Highlight recovery", "Shadow boost", "Color temperature harmonization"]
      },
      {
        id: "sky-replacement",
        name: "Sky Replacement & Twilight",
        description: "Swap overcast skies for blue sunny skies or moody dusk/twilight lighting to capture buyer imagination.",
        link: "/real-estate/sky-replacement.php",
        features: ["Day to dusk conversion", "Sunset enhancement", "Cloud naturalization"]
      },
      {
        id: "lawn-enhancement",
        name: "Lawn & Foliage Enhancement",
        description: "Turn patchy, brown grass into lush green lawns and restore vibrant landscaping.",
        link: "/real-estate/image-enhancement.php",
        features: ["Brown patch removal", "Grass color enrichment", "Garden cleanup"]
      },
      {
        id: "decluttering",
        name: "Item Removal & Decluttering",
        description: "Erase distracting clutter, personal photos, cables, pet toys, and vehicles to make spaces feel expansive.",
        link: "/real-estate/photo-corrections.php",
        features: ["Object erasure", "Furniture removal", "Wall patch cleanup"]
      },
      {
        id: "floor-plans",
        name: "2D & 3D Floor Plan Conversions",
        description: "Transform hand sketches and architectural blueprints into high-impact, textured 2D and 3D visual layouts.",
        link: "/real-estate/floor-plan-conversions.php",
        features: ["Dimension annotation", "Furniture placement", "Full color styling"]
      },
      {
        id: "virtual-tours",
        name: "360° Virtual Tour & Panoramas",
        description: "Stitch 360-degree fisheye photos into seamless interactive virtual walkthroughs for Matterport & Zillow 3D.",
        link: "/real-estate/360-virtual-tours.php",
        features: ["Tripod removal", "Nadir patching", "360° spherical stitching"]
      }
    ]
  },
  {
    id: "portrait",
    slug: "portrait",
    name: "Portrait Photo Retouching",
    tagline: "Natural, Flawless Portrait Retouching for Photographers & Studios",
    shortDesc:
      "High-end skin texture smoothing, blemish removal, stray hair cleanup, eye and teeth enhancement, makeup correction, and portrait background refinement.",
    fullDesc:
      "Portrait retouching requires a delicate balance between perfection and authenticity. Our seasoned retouchers utilize advanced frequency separation and dodge & burn techniques to preserve natural skin texture while eliminating blemishes, redness, wrinkles, and stray hairs. Perfect for corporate headshots, fashion portfolios, graduation shoots, and wedding photography studios.",
    iconClass: "fa-solid fa-user",
    heroImage: "/images/homepage/jewellery-retouching.webp",
    beforeSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/001-before.webp",
    afterSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/001-after.webp",
    beforeAlt: "Portrait Before Professional Retouching",
    afterAlt: "Portrait After Professional Retouching",
    turnaroundTime: "24 Hours",
    deliverables: ["Full-Res PSD (Layers Intact)", "Web Ready JPEG", "sRGB Color Profile", "Archival Quality TIFF"],
    keyBenefits: [
      "100% natural skin texture retention (no plastic AI blur)",
      "Express overnight batch turnaround for busy studio workflows",
      "Precise makeup enhancements and stray hair removal",
      "Teeth whitening, eye sparkle, and contour sculpting"
    ],
    subServices: [
      {
        id: "skin-retouching",
        name: "Skin Retouching & Frequency Separation",
        description: "Even out skin tones, soften fine lines, and remove blemishes without sacrificing natural pores and texture.",
        link: "/portrait/skin-retouching.php",
        features: ["Micro-blemish cleanup", "Skin tone balancing", "Under-eye bag removal"]
      },
      {
        id: "wedding-photo-editing",
        name: "Wedding Photo Editing & Culling",
        description: "Full-event color correction, romantic toning, guest background distraction removal, and bridal glamor retouching.",
        link: "/portrait/wedding-photo-editing.php",
        features: ["Bulk Lightroom presets", "Bridal gown whitening", "Veil and bouquet enhancement"]
      },
      {
        id: "corporate-headshots",
        name: "Corporate & LinkedIn Headshots",
        description: "Professional facial grooming, suit/shirt wrinkle cleanup, teeth whitening, and studio background replacement.",
        link: "/portrait/high-end-retouching.php",
        features: ["Collar & tie alignment", "Glare removal on glasses", "Even lighting balance"]
      },
      {
        id: "background-removal",
        name: "Background Removal & Replacement",
        description: "Isolate subjects cleanly and place them on studio backdrops, transparent PNGs, or custom environments.",
        link: "/portrait/remove-backgrounds.php",
        features: ["Hair flyaway masking", "Shadow generation", "Color cast correction"]
      }
    ]
  },
  {
    id: "image-clipping",
    slug: "image-clipping",
    name: "Image Clipping & Masking",
    tagline: "Pixel-Perfect Handcrafted Vector Paths & Complex Alpha Masking",
    shortDesc:
      "Hand-drawn Photoshop pen tool clipping paths, delicate alpha channel hair masking, transparent background cutouts, and multi-path layer isolation.",
    fullDesc:
      "Automated cutout tools frequently leave jagged edges, halos, and lost fine details. At SmartPHOTOeditors, every clipping path is drawn by hand by Adobe specialists zooming in up to 300%. For intricate items like fine fur, flyaway hair, or semi-transparent fabrics, our multi-channel alpha masking delivers flawless transparency and seamless integration against any background.",
    iconClass: "fa-solid fa-scissors",
    heroImage: "/images/homepage/image-cliping.webp",
    beforeSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Product/001-before-525x.webp",
    afterSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Product/001-after-525x.webp",
    beforeAlt: "Product Image Before Clipping Path",
    afterAlt: "Product Image After Clipping Path & Drop Shadow",
    turnaroundTime: "12 - 24 Hours",
    deliverables: ["Layered PSD with Embedded Paths", "Transparent PNG", "Pure White JPEG #FFFFFF", "Vector SVG/EPS"],
    keyBenefits: [
      "100% handcrafted Pen Tool precision (zero automated artifacts)",
      "High volume capacity: 5,000+ images per day",
      "Multi-path clipping for independent color grading and staging",
      "Natural and drop shadow creation"
    ],
    subServices: [
      {
        id: "clipping-path",
        name: "Handcrafted Clipping Path",
        description: "Precise vector paths created around products, furniture, machinery, and apparel for clean background extraction.",
        link: "/image-clipping/clipping-path-services.php",
        features: ["Single & multi-paths", "Smooth curved vectors", "Inner cutout handling"]
      },
      {
        id: "hair-masking",
        name: "Complex Hair & Fur Masking",
        description: "Advanced alpha channel and refinement brush masking to preserve fine hairs, animal fur, feathers, and semi-transparent veils.",
        link: "/image-clipping/hair-masking.php",
        features: ["Color fringe defringing", "Soft edge transparency", "Fine strand preservation"]
      },
      {
        id: "car-clipping",
        name: "Automotive Image Clipping",
        description: "Dedicated clipping and showroom background staging tailored for car dealerships and automotive marketplaces.",
        link: "/image-manipulation/car-image-clipping.php",
        features: ["Window glass transparency", "Wheel spoke cutouts", "Floor reflection styling"]
      },
      {
        id: "vector-tracing",
        name: "Raster to Vector Tracing",
        description: "Convert low-resolution logos and bitmap illustrations into infinite-scalable vector formats (AI, EPS, SVG).",
        link: "/image-clipping/tracing-image.php",
        features: ["Exact color matching", "Clean node reduction", "Crisp line vectors"]
      }
    ]
  },
  {
    id: "fashion",
    slug: "fashion",
    name: "Fashion & Apparel Editing",
    tagline: "E-Commerce Ready Ghost Mannequin, Neck Joints & Model Retouching",
    shortDesc:
      "Ghost mannequin 3D hollow-man effects, fabric wrinkle removal, colorway variant creation, symmetrical shape warping, and high-fashion editorial styling.",
    fullDesc:
      "In fashion e-commerce, imagery directly drives conversion rates and reduces return rates. SmartPHOTOeditors specializes in creating realistic 3D ghost mannequin effects by seamlessly combining front shots with inner collar/neck shots. We eliminate fabric creases, align hems and sleeves symmetrically, and create accurate colorway swatches across multiple fabric options.",
    iconClass: "fa-solid fa-shirt",
    heroImage: "/images/homepage/ecommerce-image-editing.webp",
    beforeSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/001-before.webp",
    afterSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/001-after.webp",
    beforeAlt: "Fashion Apparel Before Ghost Mannequin Editing",
    afterAlt: "Fashion Apparel After Ghost Mannequin & Crease Removal",
    turnaroundTime: "24 Hours",
    deliverables: ["Amazon/Shopify Sized JPEG", "Transparent PNG", "Layered PSD with Color Swatches", "WebP Fast Load"],
    keyBenefits: [
      "Consistent 3D hollow-man look across entire catalogs",
      "Save thousands on model shoot fees with neck-joint assemblies",
      "Precise Pantone and true-to-life fabric color matching",
      "Garment symmetry and drape enhancement"
    ],
    subServices: [
      {
        id: "ghost-mannequin",
        name: "Ghost Mannequin / Neck Joint",
        description: "Merge inner neck tags and linings with garment shots to create clean 3D invisible mannequin presentations.",
        link: "/fashion/ghost-mannequin-photo-editing.php",
        features: ["Inner collar stitching", "Sleeve bottom joint", "Inner tag preservation"]
      },
      {
        id: "crease-removal",
        name: "Wrinkle & Crease Smoothing",
        description: "Remove transport creases, wrinkles, and loose threads while preserving natural fabric weave and texture.",
        link: "/fashion/",
        features: ["Steam press simulation", "Fabric weave retention", "Stray thread cleanup"]
      },
      {
        id: "color-variants",
        name: "Colorway & Swatch Generation",
        description: "Produce multiple accurate color variations from a single master product shoot, saving substantial photography costs.",
        link: "/fashion/",
        features: ["Pantone matching", "Pattern overlay mapping", "Metallic sheen retention"]
      }
    ]
  },
  {
    id: "ecommerce",
    slug: "ecommerce",
    name: "E-Commerce Product Image Editing",
    tagline: "Marketplace-Compliant Product Images for Amazon, eBay, Shopify & Walmart",
    shortDesc:
      "Pure white backgrounds (#FFFFFF), true-to-life color grading, reflection cleanup, custom drop & floating shadows, and strict marketplace compliance.",
    fullDesc:
      "Online shoppers make purchasing decisions in seconds based entirely on visual quality. We optimize your product catalogs to meet and exceed the stringent technical requirements of Amazon, Shopify, Walmart, and Google Shopping. From dust and scratch removal to dimensional drop shadow creation and standardized aspect ratios, we make your catalog stand out.",
    iconClass: "fa-solid fa-cart-shopping",
    heroImage: "/images/homepage/furniture-photo-editing.webp",
    beforeSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Product/002-before.webp",
    afterSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Product/002-after.webp",
    beforeAlt: "E-Commerce Product Before Professional Staging",
    afterAlt: "E-Commerce Product After Pure White Staging & Shadow",
    turnaroundTime: "12 - 24 Hours",
    deliverables: ["RGB 2000x2000px JPEG", "Transparent PNG", "Hi-Res Master TIFF", "Multi-platform Crop Presets"],
    keyBenefits: [
      "100% compliant with Amazon, eBay, Shopify, and Etsy image standards",
      "Consistent margins, alignment, and scale across thousands of SKUs",
      "Realistic cast, drop, and reflection shadows that increase CTR",
      "Cost-effective bulk volume pricing"
    ],
    subServices: [
      {
        id: "amazon-white-bg",
        name: "Pure White Background (#FFFFFF)",
        description: "Flawless clipping and placement onto pure white backgrounds with zero halo artifacts or edge clipping.",
        link: "/image-manipulation/ecommerce-image-editing.php",
        features: ["Amazon compliance check", "85% frame fill ratio", "Clean edge isolation"]
      },
      {
        id: "shadow-creation",
        name: "Shadow Creation (Drop, Cast, Reflection)",
        description: "Add natural-looking shadows and mirror reflections that give products depth and grounding on clean backgrounds.",
        link: "/image-manipulation/ecommerce-image-editing.php",
        features: ["Soft ambient shadow", "Directional cast shadow", "Mirror glass reflection"]
      },
      {
        id: "product-cleanup",
        name: "Product Defect & Scratch Cleanup",
        description: "Erase manufacturing flaws, dust specks, fingerprints, and glare from metal, plastic, and glass surfaces.",
        link: "/image-manipulation/ecommerce-image-editing.php",
        features: ["Fingerprint removal", "Scratch retouching", "Specular highlight tuning"]
      }
    ]
  },
  {
    id: "jewelry",
    slug: "jewelry",
    name: "Jewelry Photo Retouching",
    tagline: "Exquisite Sparkle, Diamond Brilliance & Metal Polish for Fine Luxury",
    shortDesc:
      "Extreme close-up macro retouching for diamonds, gemstones, precious metals, watches, rings, and necklaces, enhancing sparkle and lustrous sheen.",
    fullDesc:
      "Jewelry photography is notoriously difficult due to extreme reflections, macro focus falloff, and microscopic dust particles. Our specialized jewelry artists hand-clean metal bands, polish gold and platinum reflections, enhance gemstone facet saturation, and add captivating sparkle starbursts to give your high-end pieces a luxurious, irresistible allure.",
    iconClass: "fa-solid fa-gem",
    heroImage: "/images/homepage/jewellery-retouching.webp",
    beforeSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/001-before.webp",
    afterSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/001-after.webp",
    beforeAlt: "Jewelry Diamond Ring Before Retouching",
    afterAlt: "Jewelry Diamond Ring After Luxury Retouching",
    turnaroundTime: "24 - 48 Hours",
    deliverables: ["Ultra-HD JPEG (4K/8K)", "Layered PSD with Sparkle Masks", "Transparent PNG", "Print Catalog CMYK TIFF"],
    keyBenefits: [
      "Eliminates camera reflections and distracting lightbox glare",
      "Brings out fire, facet symmetry, and brilliance in diamonds",
      "Restores rich yellow gold, rose gold, and platinum luster",
      "Focus stacking alignment for edge-to-edge sharpness"
    ],
    subServices: [
      {
        id: "diamond-gem-enhancement",
        name: "Diamond & Gemstone Enhancement",
        description: "Intensify gemstone color depth, clarify inclusions, and emphasize facet reflections for breathtaking brilliance.",
        link: "/jewelry/",
        features: ["Ruby & sapphire color depth", "Diamond sparkle addition", "Facet contrast tuning"]
      },
      {
        id: "metal-polishing",
        name: "Metal Smoothing & Polish",
        description: "Smooth uneven metallic textures, eliminate solder seams, and apply clean gradient reflections on bands and bezels.",
        link: "/jewelry/",
        features: ["Gold & platinum gloss", "Camera reflection removal", "Bezel edge sharpening"]
      },
      {
        id: "focus-stacking-jewelry",
        name: "Macro Focus Stacking",
        description: "Combine multiple focal planes into one tack-sharp image with infinite depth of field from front prong to rear shank.",
        link: "/photoshop-services/focus-stacking.php",
        features: ["Sub-pixel alignment", "Depth-map merging", "Edge halo reduction"]
      }
    ]
  },
  {
    id: "photoshop-services",
    slug: "photoshop-services",
    name: "Photoshop & Creative Services",
    tagline: "Complex Image Manipulation, Vector Art, Cloning & Special Effects",
    shortDesc:
      "Advanced Photoshop manipulation, vector conversions, pop art graphics, HDR tonemapping, image cloning, creative composites, and focus stacking.",
    fullDesc:
      "When standard edits aren't enough, our Photoshop master artists execute complex creative composites, seamless item cloning, artistic pop art conversions, vector graphic creation, and multi-exposure focus stacking. Whether you need an imaginative advertising composite or meticulous technical graphic reconstruction, we bring your visual concepts to life.",
    iconClass: "fa-solid fa-wand-magic-sparkles",
    heroImage: "/images/homepage/image-video-editing.webp",
    beforeSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/003-before.webp",
    afterSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/003-after.webp",
    beforeAlt: "Creative Composite Before Editing",
    afterAlt: "Creative Composite After Advanced Manipulation",
    turnaroundTime: "24 - 48 Hours",
    deliverables: ["Multi-Layered PSD / PSB", "Vector AI / EPS / SVG", "High-Resolution JPEG", "Lossless TIFF"],
    keyBenefits: [
      "Access senior Adobe certified master retouchers",
      "Seamless visual realism in multi-image compositing",
      "Custom vector illustration and graphic recreation",
      "Non-destructive workflow with organized layer groups"
    ],
    subServices: [
      {
        id: "stock-photo-editing",
        name: "Stock Photo Editing & Customization",
        description: "Customize stock photos to match your brand palette, replace logos, swap screens, and tailor models.",
        link: "/photoshop-services/stock-photo-editing.php",
        features: ["Brand palette adaptation", "Screen replacement", "Signage customisation"]
      },
      {
        id: "image-cloning",
        name: "Image Cloning & Seamless Compositing",
        description: "Clone complex patterns, extend canvas backgrounds naturally, and combine elements from multiple photos.",
        link: "/photoshop-services/image-cloning.php",
        features: ["Seamless texture replication", "Content-aware fill refinement", "Perspective matching"]
      },
      {
        id: "focus-stacking",
        name: "Focus Stacking & Exposure Merging",
        description: "Merge multiple shallow depth-of-field frames into ultra-sharp full-depth images for commercial packaging and products.",
        link: "/photoshop-services/focus-stacking.php",
        features: ["Macro focal alignment", "Ghosting removal", "Maximum edge crispness"]
      }
    ]
  },
  {
    id: "lightroom-services",
    slug: "lightroom-services",
    name: "Lightroom Services & Batch Processing",
    tagline: "High-Volume RAW Culling, Color Grading & Exposure Matching",
    shortDesc:
      "High-speed batch processing for event, wedding, and commercial shoots. Custom preset development, white balance correction, exposure leveling, and cataloging.",
    fullDesc:
      "Post-processing thousands of wedding, conference, or school photography RAW files is time-consuming. SmartPHOTOeditors acts as your dedicated back-office lab, importing your Lightroom catalogs, culling out unfocused frames, applying your signature presets, standardizing exposures, and exporting print-ready galleries in record time.",
    iconClass: "fa-solid fa-sliders",
    heroImage: "/images/homepage/banner-2.webp",
    beforeSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/002-before.webp",
    afterSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/002-after.webp",
    beforeAlt: "RAW Event Photo Before Batch Lightroom Processing",
    afterAlt: "RAW Event Photo After Color Grading & Exposure Sync",
    turnaroundTime: "24 - 48 Hours",
    deliverables: ["Updated Lightroom Catalog (.lrcat + smart previews)", "High-Res JPEG Export", "XMP Sidecar Files", "Web Galleries"],
    keyBenefits: [
      "Save 15+ hours per shoot during peak wedding and event seasons",
      "Consistent color profile tailored to your unique photographer style",
      "Intelligent culling that identifies best facial expressions and blinks",
      "Seamless Smart Preview workflow (no need to upload giant RAW files)"
    ],
    subServices: [
      {
        id: "event-culling",
        name: "Image Culling & Selection",
        description: "Sort through thousands of shots to eliminate out-of-focus, duplicate, and closed-eye photos to deliver a curated shoot.",
        link: "/lightroom-services/",
        features: ["Star rating organization", "Duplicate grouping", "Blink detection"]
      },
      {
        id: "color-grading",
        name: "Color Grading & White Balance Sync",
        description: "Synchronize color temperature and lighting across dynamic indoor/outdoor shooting locations.",
        link: "/lightroom-services/",
        features: ["Dual-illuminant calibration", "HSL color tuning", "Skin tone protection"]
      },
      {
        id: "exposure-leveling",
        name: "Exposure & Dynamic Range Matching",
        description: "Level out changing natural light conditions so the entire photo album presents a cohesive visual narrative.",
        link: "/lightroom-services/",
        features: ["Highlight/shadow recovery", "Gradient sky adjustments", "Vignette correction"]
      }
    ]
  },
  {
    id: "photo-restoration",
    slug: "photo-restoration",
    name: "Photo Restoration & Repair",
    tagline: "Breathing New Life into Damaged, Faded, Torn & Vintage Family Photographs",
    shortDesc:
      "Meticulous digital restoration for antique prints, water-damaged family portraits, torn and cracked images, and authentic black & white colorization.",
    fullDesc:
      "Preserve irreplaceable memories with historical accuracy and artistic reverence. Our restoration experts carefully reconstruct missing portions of damaged photographs, remove cracks, mold stains, and scratches, balance fading sepia tones, and colorize black and white archival photos with authentic period-accurate palettes.",
    iconClass: "fa-solid fa-clock-rotate-left",
    heroImage: "/images/homepage/banner-4.webp",
    beforeSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/004-before.webp",
    afterSrc: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/004-after.webp",
    beforeAlt: "Antique Damaged Photo Before Restoration",
    afterAlt: "Antique Photo After Restoration & Colorization",
    turnaroundTime: "24 - 48 Hours",
    deliverables: ["Restored High-Res TIFF", "Side-by-Side Comparison", "Ready-to-Print 300 DPI JPEG", "Restoration Certificate"],
    keyBenefits: [
      "Digitally reconstruct missing facial features and torn backgrounds",
      "Historical period-accurate colorization research",
      "Erase stains, mold, tape marks, and water spots permanently",
      "Preserve family heritage for generations to come"
    ],
    subServices: [
      {
        id: "damaged-photo-repair",
        name: "Torn, Creased & Water Damaged Repair",
        description: "Piece back torn fragments, smooth harsh crease lines, and eliminate chemical yellowing or water staining.",
        link: "/photo-restoration/",
        features: ["Tear reconstruction", "Crease erasure", "Texture matching"]
      },
      {
        id: "bw-colorization",
        name: "Black & White Colorization",
        description: "Transform monochromatic vintage photos into vivid, realistic full-color memories with realistic skin and fabric tones.",
        link: "/photo-restoration/",
        features: ["Period-accurate colors", "Skin undertone shading", "Eye color enhancement"]
      },
      {
        id: "fading-restoration",
        name: "Faded Contrast & Detail Recovery",
        description: "Deepen faded tones and restore lost contrast in antique silver gelatin, daguerreotype, and albumen prints.",
        link: "/photo-restoration/",
        features: ["Dynamic range restoration", "Grain de-speckling", "Sharpness enhancement"]
      }
    ]
  }
];
