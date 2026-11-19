import os
import sys
import json
from pathlib import Path
from dotenv import load_dotenv

# Paths
web_dir = Path("D:/orynez-products/LIRISHA/web")
api_dir = Path("D:/orynez-products/LIRISHA/api")

# 1. Prepare Services Data with real Portfolio images
services_data = [
  {
    "id": "real-estate",
    "slug": "real-estate",
    "name": "Real Estate Image Editing",
    "tagline": "High-Impact Architectural & Property Visuals That Sell Listings Faster",
    "shortDesc": "Overnight HDR bracket blending, day-to-dusk virtual twilight, digital decluttering, virtual staging, 360 virtual tours, and precision 2D/3D floor plans for real estate media professionals.",
    "fullDesc": "LIRISHA delivers master-level real estate post-production tailored to MLS standards, luxury brokerages, and architectural photographers. With a guaranteed 12–24h turnaround, we balance complex ambient window light, hand-blend multi-exposure brackets with zero halos, correct vertical keystoning, and virtually furnish vacant interiors with photorealistic 3D designer assets.",
    "iconClass": "fa-solid fa-house-chimney",
    "heroImage": "/Portfolio/Real Estate/HDR Blending/07-Front Facade_1.jpg",
    "beforeSrc": "/Portfolio/Real Estate/HDR Blending/07-Front Facade.JPG",
    "afterSrc": "/Portfolio/Real Estate/HDR Blending/07-Front Facade_1.jpg",
    "beforeAlt": "Real Estate Bracket Before Retouching",
    "afterAlt": "Real Estate Property After HDR Retouching",
    "turnaroundTime": "12 - 24 Hours",
    "deliverables": [
      "High-Res Master TIFF / JPEG (Print 300 DPI)",
      "MLS-Ready Web JPEG (Zillow / Realtor formatted)",
      "Layered PSD on request",
      "Printable Architectural Vector PDF"
    ],
    "keyBenefits": [
      "Guaranteed 12-24h overnight delivery for urgent listing schedules",
      "Handcrafted luminosity masking with zero artificial HDR edge halos",
      "Authentic window pull restoring lush outdoor views and clear skies",
      "Vertical perspective alignment removing wide-angle lens keystoning",
      "Unlimited free revisions within 2 to 4 hours"
    ],
    "subServices": [
      {
        "id": "image-enhancement",
        "link": "/real-estate/image-enhancement",
        "name": "Image Enhancement",
        "beforeSrc": "/Portfolio/Real Estate/Image Enhancement/1.jpg",
        "afterSrc": "/Portfolio/Real Estate/Image Enhancement/1a.jpg",
        "features": [
          "Window view recovery and masking (Window Pull)",
          "Vertical keystone and wide-angle optical correction",
          "Color cast neutralization for mixed tungsten & ambient light",
          "Lawn greening and TV screen / fireplace flame replacement"
        ],
        "description": "Transform flat, poorly exposed property shots into vibrant, magazine-quality architectural photographs that capture buyers instantly."
      },
      {
        "id": "hdr-blending",
        "link": "/real-estate/hdr-blending",
        "name": "HDR Blending",
        "beforeSrc": "/Portfolio/Real Estate/HDR Blending/56 Hanson St Internals-12.jpg",
        "afterSrc": "/Portfolio/Real Estate/HDR Blending/56 Hanson St Internals-12a.jpg",
        "features": [
          "Hand-blended 3, 5, or 7 exposure bracket fusion",
          "Flash + Ambient (Flambient) layer compositing",
          "Zero-halo edge preservation around window mullions and blinds",
          "Deep shadow recovery without digital sensor noise"
        ],
        "description": "Seamless manual HDR exposure blending using Photoshop luminosity masks to achieve natural luminescence and crisp contrast."
      },
      {
        "id": "aerial-editing",
        "link": "/real-estate/aerial-editing",
        "name": "Aerial Editing",
        "beforeSrc": "/Portfolio/Real Estate/Aerial Editing/Victoria Delta-138.jpg",
        "afterSrc": "/Portfolio/Real Estate/Aerial Editing/Victoria Delta-138_Ed.jpg",
        "features": [
          "Atmospheric haze, pollution, and glare reduction",
          "Custom vector property boundary lines and landmark pins",
          "Swimming pool and coastal shoreline color beautification",
          "Horizon straightening and wide-angle drone lens de-warping"
        ],
        "description": "Elevate drone imagery with atmospheric haze removal, property boundary lines, neighborhood callouts, and vivid landscape enhancements."
      },
      {
        "id": "360-panorama",
        "link": "/real-estate/360-panorama",
        "name": "360 Panorama",
        "beforeSrc": "/Portfolio/Real Estate/360 Enhancement/R0011258_20220813120525.jpg",
        "afterSrc": "/Portfolio/Real Estate/360 Enhancement/R0011258_20220813120525_panoa.jpg",
        "features": [
          "Seamless 360° x 180° equirectangular stitching",
          "Nadir tripod and shadow removal with floor patch",
          "Zenith ceiling repair around light fixtures and fans",
          "Compatible with Matterport, Kuula, CloudPano, and Google Street View"
        ],
        "description": "Stitch multi-angle spherical fisheye captures into butter-smooth, high-resolution equirectangular panoramas ready for virtual tour viewers."
      },
      {
        "id": "360-image-enhancement",
        "link": "/real-estate/360-image-enhancement",
        "name": "360 Image Enhancement",
        "beforeSrc": "/Portfolio/Real Estate/360 Enhancement/R0011263_20220813120950.jpg",
        "afterSrc": "/Portfolio/Real Estate/360 Enhancement/R0011263_20220813120950_panoa.jpg",
        "features": [
          "Spherical projection editing preventing polar pinch distortion",
          "Mirror and window reflection removal for cameras and gear",
          "Panoramic window exposure balancing across 360 space",
          "Low-light sensor denoising for basements and hallways"
        ],
        "description": "Enhance already-stitched 360 spherical photos with perspective warping, window recovery, color grading, and reflection sanitization."
      },
      {
        "id": "digital-declutter-item-removal",
        "link": "/real-estate/digital-declutter-item-removal",
        "name": "Digital Declutter / Item Removal",
        "beforeSrc": "/Portfolio/Real Estate/Digital Declutter/26 - 526 E Santa Clara Ave.jpg",
        "afterSrc": "/Portfolio/Real Estate/Digital Declutter/26 - 526 E Santa Clara Ave_1.jpg",
        "features": [
          "Kitchen and bathroom countertop decluttering",
          "Driveway car and curbside garbage bin removal",
          "Photorealistic flooring texture and tile grout reconstruction",
          "Personal family photo blurring or removal for MLS compliance"
        ],
        "description": "Remove unwanted clutter, personal memorabilia, messy cables, tenant belongings, and vehicles to reveal the home's true architectural potential."
      },
      {
        "id": "day-to-dusk-conversion",
        "link": "/real-estate/day-to-dusk-conversion",
        "name": "Day to Dusk Conversion (Virtual Twilight)",
        "beforeSrc": "/Portfolio/Real Estate/Day to Dusk/Real Estate11.jpg",
        "afterSrc": "/Portfolio/Real Estate/Day to Dusk/Real Estate11_1.jpg",
        "features": [
          "Dramatic sunset, golden hour, or blue hour sky replacement",
          "Interior lamp and exterior wall sconce light activation",
          "Photorealistic warm reflections on pool water and pavers",
          "Soft, diffused evening architectural ambient light adjustments"
        ],
        "description": "Transform daytime exterior photos into romantic sunset twilight masterpieces with warm interior illumination and dramatic evening skies."
      },
      {
        "id": "sky-replacement-services",
        "link": "/real-estate/sky-replacement-services",
        "name": "Sky Replacement Services",
        "beforeSrc": "/Portfolio/Real Estate/Sky Replacement/2.jpg",
        "afterSrc": "/Portfolio/Real Estate/Sky Replacement/2a.jpg",
        "features": [
          "Sub-pixel masking around intricate foliage and tree branches",
          "Ambient ground facade relighting matching the new sun angle",
          "Curated sky library: sunny blue, soft cumulus, or dramatic sunset",
          "Water and window glass reflection replacement"
        ],
        "description": "Swap drab, grey, overcast skies with beautiful sunny blue skies, puffy white clouds, or vibrant sunsets with natural ambient relighting."
      },
      {
        "id": "virtual-staging-and-renovation",
        "link": "/real-estate/virtual-staging-and-renovation",
        "name": "Virtual Staging and Renovation",
        "beforeSrc": "/Portfolio/Real Estate/Virtual Staging/028A1339.jpg",
        "afterSrc": "/Portfolio/Real Estate/Virtual Staging/028A1339_final.jpg",
        "features": [
          "3D designer furniture placement: Modern, Scandinavian, Luxury, Farmhouse",
          "Virtual kitchen remodel: white shaker cabinets, quartz countertops",
          "Flooring swaps: hardwood, light oak, polished tile",
          "Side-by-side Before/After presentation graphics"
        ],
        "description": "Furnish vacant rooms or visualize modern architectural renovations to help potential buyers fall in love and see full property value."
      },
      {
        "id": "360-virtual-tours",
        "link": "/real-estate/360-virtual-tours",
        "name": "360 Virtual Tours",
        "beforeSrc": "/Portfolio/Real Estate/360 Virtual Staging/bedroom1.jpg",
        "afterSrc": "/Portfolio/Real Estate/360 Virtual Staging/bedroom1_final.jpg",
        "features": [
          "Fluid walkthrough hotspot navigation linking rooms logically",
          "Integrated 2D mini floor plan with live radar orientation",
          "Agent branding bar with logo, contact info, and schedule link",
          "Unbranded MLS-compliant version included at no extra cost"
        ],
        "description": "Link 360 panoramas into an interactive virtual walkthrough featuring hotspot navigation, interactive floor plan maps, and agent branding."
      },
      {
        "id": "real-estate-video-editing",
        "link": "/real-estate/real-estate-video-editing",
        "name": "Real Estate Video Editing",
        "beforeSrc": "/Portfolio/Real Estate/HDR Blending/56 Hanson St Internals-48.jpg",
        "afterSrc": "/Portfolio/Real Estate/HDR Blending/56 Hanson St Internals-48a.jpg",
        "features": [
          "Cinematic speed ramping and motion stabilization",
          "LUT color grading tailored to the property aesthetic",
          "Commercial-licensed royalty-free music and sound design",
          "Horizontal 16:9 4K master + Vertical 9:16 Instagram Reels cutdown"
        ],
        "description": "Transform raw camera and gimbal clips into high-energy property showcase videos, cinematic 4K tours, and viral vertical social reels."
      },
      {
        "id": "floor-plans",
        "link": "/real-estate/floor-plans",
        "name": "Floor Plans",
        "beforeSrc": "/Portfolio/Real Estate/Floor Plans/2D with 3D1.jpg",
        "afterSrc": "/Portfolio/Real Estate/Floor Plans/2D with 3D1a.jpg",
        "features": [
          "2D Black & White and Full-Color Textured floor plans",
          "3D Photorealistic Isometric architectural cutaways",
          "Full property site plans showing boundaries and setbacks",
          "Gross Internal Area (GIA) square footage & room dimensions"
        ],
        "description": "Convert rough hand sketches, Matterport scans, or builder blueprints into clean, accurate, and beautifully styled 2D, 3D, and Site Plans."
      },
      {
        "id": "2d-floor-plan",
        "link": "/real-estate/floor-plans/2d-floor-plan",
        "name": "2D Floor Plan",
        "beforeSrc": "/Portfolio/Real Estate/Floor Plans/2d1.jpg",
        "afterSrc": "/Portfolio/Real Estate/Floor Plans/2d1a.jpg",
        "features": [
          "Clean minimalist black & white or textured color styling",
          "Exact wall-to-wall dimensions in Imperial (ft/in) & Metric (m)",
          "Illustrative furniture icons showing bed, sofa, and dining layouts",
          "Vector PDF for high-DPI print and web-ready JPEG/PNG"
        ],
        "description": "Clean, elegant 2D architectural schematics that give buyers an instant understanding of property flow and room proportions."
      },
      {
        "id": "3d-floor-plan",
        "link": "/real-estate/floor-plans/3d-floor-plan",
        "name": "3D Floor Plan",
        "beforeSrc": "/Portfolio/Real Estate/Floor Plans/3DPlan_After1.jpg",
        "afterSrc": "/Portfolio/Real Estate/Floor Plans/3DPlan_After1a.jpg",
        "features": [
          "True 3D isometric perspective with realistic raytraced shadows",
          "Detailed furniture, granite islands, hardwood, and bathroom tiles",
          "Multiple camera angles: top-down or angled perspective",
          "Ultra high-resolution 4K rendering"
        ],
        "description": "Give buyers a bird's-eye perspective of luxury living with fully textured 3D architectural floor cutaways."
      },
      {
        "id": "site-plan",
        "link": "/real-estate/floor-plans/site-plan",
        "name": "Site Plan",
        "beforeSrc": "/Portfolio/Real Estate/Floor Plans/2DColour Texture1.jpg",
        "afterSrc": "/Portfolio/Real Estate/Floor Plans/2DColour Texture1a.jpg",
        "features": [
          "Complete parcel boundary perimeter, setbacks, and easements",
          "Outdoor detailing: swimming pools, driveways, patios, and gardens",
          "Building footprint overlay showing house positioning",
          "North compass orientation indicator and scale bar"
        ],
        "description": "Illustrate the entire parcel footprint, including main dwelling, accessory buildings, pools, driveways, and landscaping boundaries."
      }
    ]
  },
  {
    "id": "image-clipping",
    "slug": "image-clipping",
    "name": "Image Clipping Services",
    "tagline": "Pixel-Precision Handcrafted Clipping Paths & Background Removal",
    "shortDesc": "100% hand-drawn Photoshop pen tool clipping paths, pure Amazon white backgrounds, alpha channel masking, and ghost mannequin cutouts.",
    "fullDesc": "LIRISHA provides high-volume, pixel-perfect clipping path and background removal services for e-commerce retailers, design agencies, and commercial photographers. Every path is drawn by hand with Adobe Photoshop's Pen Tool with sub-pixel accuracy, guaranteeing crisp edges, zero automated AI jaggedness, and pure white #FFFFFF backgrounds.",
    "iconClass": "fa-solid fa-scissors",
    "heroImage": "/Portfolio/CLipping/1_2.jpg",
    "beforeSrc": "/Portfolio/CLipping/1_1.jpg",
    "afterSrc": "/Portfolio/CLipping/1_2.jpg",
    "beforeAlt": "Product Before Clipping Path Removal",
    "afterAlt": "Product Cutout on Pure White Background",
    "turnaroundTime": "6 - 24 Hours",
    "deliverables": [
      "Pure White Background JPEG (RGB 255, 255, 255)",
      "Transparent PNG cutout with smooth alpha edges",
      "Layered PSD with active embedded vector path",
      "EPS vector path on request"
    ],
    "keyBenefits": [
      "100% handmade Photoshop pen tool clipping paths (never sloppy AI cuts)",
      "Sub-pixel accuracy around complex hair, fur, jewelry, and bicycle spokes",
      "Amazon, Shopify, and eBay marketplace compliance guaranteed",
      "Daily production capacity of 5,000+ items with dedicated QA check"
    ],
    "subServices": [
      {
        "id": "background-removal-services",
        "link": "/image-clipping/background-removal-services",
        "name": "Background Removal Services",
        "beforeSrc": "/Portfolio/CLipping/1_1.jpg",
        "afterSrc": "/Portfolio/CLipping/1_2.jpg",
        "features": [
          "Hand-drawn vector clipping paths with smooth Bezier curves",
          "Pure white background #FFFFFF (RGB 255, 255, 255)",
          "Ghost mannequin and invisible neck joint stitching",
          "Natural cast shadow or soft commercial drop shadow generation"
        ],
        "description": "Pixel-perfect subject isolation using handmade clipping paths and advanced alpha-masking. Clean edges, zero jagged artifacts, 100% e-commerce compliant."
      },
      {
        "id": "clipping-path-services",
        "link": "/image-clipping/clipping-path-services",
        "name": "Handcrafted Vector Clipping Paths",
        "beforeSrc": "/Portfolio/CLipping/DETAIL - PREMIUM - 1.jpg",
        "afterSrc": "/Portfolio/CLipping/DETAIL - PREMIUM - 1_Clipped.jpg",
        "features": [
          "Multi-path color separation for colorway swaps",
          "Complex edge masking for fine mesh, wire, and transparent glass",
          "Non-destructive workflow with embedded Photoshop paths"
        ],
        "description": "Industry-standard vector pen tool clipping paths delivered with sub-pixel precision for print, catalog, and packaging layouts."
      }
    ]
  },
  {
    "id": "portrait",
    "slug": "portrait",
    "name": "Portrait Editing Services",
    "tagline": "Natural, Magazine-Grade Headshot & Portrait Retouching",
    "shortDesc": "High-end portrait retouching that preserves authentic skin texture. Frequency separation, micro dodge & burn, eye brightening, and stray hair removal.",
    "fullDesc": "Great portrait retouching is an art of restraint. At LIRISHA, we never apply destructive plastic filters. Our retouchers utilize advanced Frequency Separation and micro Dodge & Burn techniques to eliminate temporary blemishes, minimize dark circles, even out skin tone, and sharpen eye catchlights while preserving every natural pore and facial contour.",
    "iconClass": "fa-solid fa-user-check",
    "heroImage": "/Portfolio/Portrait Editing/1a.jpg",
    "beforeSrc": "/Portfolio/Portrait Editing/1.jpg",
    "afterSrc": "/Portfolio/Portrait Editing/1a.jpg",
    "beforeAlt": "Portrait Before Professional Retouching",
    "afterAlt": "Portrait After Frequency Separation Retouching",
    "turnaroundTime": "12 - 24 Hours",
    "deliverables": [
      "Full Resolution Master 16-Bit TIFF / JPEG for print",
      "LinkedIn & Corporate Intranet pre-cropped sizes",
      "Layered PSD on request"
    ],
    "keyBenefits": [
      "Advanced Frequency Separation preserving 100% authentic skin texture",
      "Micro Dodge & Burn for natural facial contouring without blur",
      "Stray hair cleanup and subtle eye iris enhancement",
      "Corporate headshot consistency across executive teams"
    ],
    "subServices": [
      {
        "id": "portrait-editing-services",
        "link": "/portrait",
        "name": "Portrait Editing Services",
        "beforeSrc": "/Portfolio/Portrait Editing/1.jpg",
        "afterSrc": "/Portfolio/Portrait Editing/1a.jpg",
        "features": [
          "Blemish removal and natural skin tone leveling",
          "Teeth whitening without artificial blue cast",
          "Stray hair and flyaway cleanup against studio backdrops",
          "Clothing wrinkle de-creasing and lint removal"
        ],
        "description": "Subtle, magazine-grade skin smoothing, stray hair cleanup, eye sparkle, and color grading that looks completely natural and never plastic."
      },
      {
        "id": "skin-retouching",
        "link": "/portrait/skin-retouching",
        "name": "Skin Retouching & Frequency Separation",
        "beforeSrc": "/Portfolio/Portrait Editing/DSC02703.jpg",
        "afterSrc": "/Portfolio/Portrait Editing/DSC02703_1.jpg",
        "features": [
          "High and low frequency spatial texture separation",
          "Even tone blending preserving micro skin pores",
          "Under-eye circle reduction and specular highlight shaping"
        ],
        "description": "Authentic skin smoothing that eliminates blotchiness and redness while maintaining pore-level sharpness."
      },
      {
        "id": "high-end-retouching",
        "link": "/portrait/high-end-retouching",
        "name": "High-End Beauty & Magazine Retouching",
        "beforeSrc": "/Portfolio/Portrait Editing/DSC_2840.JPG",
        "afterSrc": "/Portfolio/Portrait Editing/DSC_2840_Ed.jpg",
        "features": [
          "Editorial grade color grading and tonal mapping",
          "Lip texture enhancement and makeup refinement",
          "Fine jewelry and hair highlight sculpting"
        ],
        "description": "Vogue and fashion editorial caliber retouching for beauty campaigns, modeling portfolios, and magazine covers."
      }
    ]
  },
  {
    "id": "wedding",
    "slug": "wedding-photo-post-processing",
    "name": "Wedding Photo Post Processing",
    "tagline": "High-Volume RAW Culling, Custom Color Grading & Hero Retouching",
    "shortDesc": "Complete post-production for wedding photographers. High-volume RAW culling, custom Lightroom preset matching, ceremony tone matching, and album retouching.",
    "fullDesc": "Weddings generate thousands of RAW files per event, turning post-production into a grueling bottleneck. LIRISHA acts as your dedicated backend post-production studio. We cull out blinks and test clicks, apply your custom Lightroom preset and tone curves, harmonize erratic lighting between church, reception, and outdoor sunset photos, and give the couple's hero portraits magazine-grade retouching.",
    "iconClass": "fa-solid fa-camera-retro",
    "heroImage": "/Portfolio/Portrait Editing/DSC_5619_1.jpg",
    "beforeSrc": "/Portfolio/Portrait Editing/DSC_5619.JPG",
    "afterSrc": "/Portfolio/Portrait Editing/DSC_5619_1.jpg",
    "beforeAlt": "Wedding Photo Before Color Grading",
    "afterAlt": "Wedding Photo After Custom Color Grading",
    "turnaroundTime": "3 - 5 Days",
    "deliverables": [
      "Exported Lightroom Catalog (.lrcat) with smart previews",
      "Full gallery organized chronologically: Getting Ready, Ceremony, Portraits, Reception",
      "High-Res Retouched JPEGs for wedding album prints"
    ],
    "keyBenefits": [
      "Precise style matching: we calibrate to your exact Lightroom .xmp presets",
      "Fast 3 to 5 business day delivery instead of months of backlog",
      "Smart RAW culling: eliminate duplicates, closed eyes, and out-of-focus clicks",
      "Lighting harmonization: balance tricky church tungsten, harsh sun, and strobe flash"
    ],
    "subServices": [
      {
        "id": "wedding-photo-post-processing",
        "link": "/wedding-photo-post-processing",
        "name": "Wedding Photo Post Processing",
        "beforeSrc": "/Portfolio/Portrait Editing/DSC_5619.JPG",
        "afterSrc": "/Portfolio/Portrait Editing/DSC_5619_1.jpg",
        "features": [
          "High-volume RAW culling from 3,000+ files to top 600-800 moments",
          "Custom Lightroom preset matching and tone curve calibration",
          "Hero bride & groom beauty retouching for album covers",
          "Reception and dancefloor ambient flash leveling"
        ],
        "description": "Comprehensive post-production for wedding photographers. We handle bulk culling, custom color grading, and hero retouching with strict deadlines."
      }
    ]
  }
]

# Write fallbackServices.ts
fallback_services_content = f"""import {{ ServiceCategory }} from "@/types/content";

export const FALLBACK_SERVICES: ServiceCategory[] = {json.dumps(services_data, indent=2)};
"""
with open(web_dir / "lib/api/fallbackServices.ts", "w", encoding="utf-8") as f:
    f.write(fallback_services_content)
print("Updated fallbackServices.ts successfully!")

# Write services.json in api
with open(api_dir / "scripts/seed_data/services.json", "w", encoding="utf-8") as f:
    json.dump(services_data, f, indent=2)
print("Updated seed_data/services.json successfully!")

# 2. Prepare Sample Gallery Tabs for /sample-images
gallery_tabs = [
  {
    "id": "tab-real-estate",
    "name": "Real Estate",
    "items": [
      {
        "id": "re-1",
        "title": "HDR Exposure Blending",
        "beforeSrc": "/Portfolio/Real Estate/HDR Blending/07-Front Facade.JPG",
        "afterSrc": "/Portfolio/Real Estate/HDR Blending/07-Front Facade_1.jpg",
        "beforeAlt": "HDR Exterior Before Retouching",
        "afterAlt": "HDR Exterior After Blending"
      },
      {
        "id": "re-2",
        "title": "Interior Window Pull & HDR",
        "beforeSrc": "/Portfolio/Real Estate/HDR Blending/56 Hanson St Internals-12.jpg",
        "afterSrc": "/Portfolio/Real Estate/HDR Blending/56 Hanson St Internals-12a.jpg",
        "beforeAlt": "Interior Before Window Pull",
        "afterAlt": "Interior After Window Pull"
      },
      {
        "id": "re-3",
        "title": "Day to Dusk (Virtual Twilight)",
        "beforeSrc": "/Portfolio/Real Estate/Day to Dusk/Real Estate11.jpg",
        "afterSrc": "/Portfolio/Real Estate/Day to Dusk/Real Estate11_1.jpg",
        "beforeAlt": "Daytime House Before Twilight",
        "afterAlt": "Evening Virtual Twilight Transformation"
      },
      {
        "id": "re-4",
        "title": "Digital Declutter & Furniture Removal",
        "beforeSrc": "/Portfolio/Real Estate/Digital Declutter/26 - 526 E Santa Clara Ave.jpg",
        "afterSrc": "/Portfolio/Real Estate/Digital Declutter/26 - 526 E Santa Clara Ave_1.jpg",
        "beforeAlt": "Room with Clutter Before",
        "afterAlt": "Clean Decluttered Room After"
      },
      {
        "id": "re-5",
        "title": "Aerial Drone Retouching",
        "beforeSrc": "/Portfolio/Real Estate/Aerial Editing/Victoria Delta-138.jpg",
        "afterSrc": "/Portfolio/Real Estate/Aerial Editing/Victoria Delta-138_Ed.jpg",
        "beforeAlt": "Aerial Photo Before Haze Removal",
        "afterAlt": "Crisp Aerial Photo After Enhancements"
      },
      {
        "id": "re-6",
        "title": "Sky Replacement",
        "beforeSrc": "/Portfolio/Real Estate/Sky Replacement/2.jpg",
        "afterSrc": "/Portfolio/Real Estate/Sky Replacement/2a.jpg",
        "beforeAlt": "Overcast Sky Before Replacement",
        "afterAlt": "Vibrant Blue Sky After Replacement"
      },
      {
        "id": "re-7",
        "title": "Virtual Staging",
        "beforeSrc": "/Portfolio/Real Estate/Virtual Staging/028A1339.jpg",
        "afterSrc": "/Portfolio/Real Estate/Virtual Staging/028A1339_final.jpg",
        "beforeAlt": "Vacant Room Before Staging",
        "afterAlt": "Furnished Modern Room After Staging"
      },
      {
        "id": "re-8",
        "title": "Virtual Renovation",
        "beforeSrc": "/Portfolio/Real Estate/Virtual Renovation/08.jpg",
        "afterSrc": "/Portfolio/Real Estate/Virtual Renovation/08_FInal.jpg",
        "beforeAlt": "Outdated Interior Before Renovation",
        "afterAlt": "Modern Architectural Renovation After"
      },
      {
        "id": "re-9",
        "title": "360 Panorama Enhancement",
        "beforeSrc": "/Portfolio/Real Estate/360 Enhancement/R0011258_20220813120525.jpg",
        "afterSrc": "/Portfolio/Real Estate/360 Enhancement/R0011258_20220813120525_panoa.jpg",
        "beforeAlt": "Raw 360 Panorama Capture",
        "afterAlt": "Stitched & Balanced 360 Panorama"
      },
      {
        "id": "re-10",
        "title": "2D Floor Plan Conversion",
        "beforeSrc": "/Portfolio/Real Estate/Floor Plans/2d1.jpg",
        "afterSrc": "/Portfolio/Real Estate/Floor Plans/2d1a.jpg",
        "beforeAlt": "Rough Blueprint Before Drafting",
        "afterAlt": "Clean 2D Floor Plan Schematic"
      },
      {
        "id": "re-11",
        "title": "3D Floor Plan Rendering",
        "beforeSrc": "/Portfolio/Real Estate/Floor Plans/3DPlan_After1.jpg",
        "afterSrc": "/Portfolio/Real Estate/Floor Plans/3DPlan_After1a.jpg",
        "beforeAlt": "Floor Layout Before 3D Rendering",
        "afterAlt": "Textured 3D Floor Plan Isometric"
      }
    ]
  },
  {
    "id": "tab-clipping",
    "name": "Image Clipping & Masking",
    "items": [
      {
        "id": "clip-1",
        "title": "Background Removal Services (Pure White)",
        "beforeSrc": "/Portfolio/CLipping/1_1.jpg",
        "afterSrc": "/Portfolio/CLipping/1_2.jpg",
        "beforeAlt": "Product on Busy Studio Background",
        "afterAlt": "Isolated Product on Pure White Background"
      },
      {
        "id": "clip-2",
        "title": "Commercial Footwear Cutout",
        "beforeSrc": "/Portfolio/CLipping/2_1.jpg",
        "afterSrc": "/Portfolio/CLipping/2_3.jpg",
        "beforeAlt": "Shoe Photo Before Cutout",
        "afterAlt": "Shoe Cutout on Clean White with Natural Shadow"
      },
      {
        "id": "clip-3",
        "title": "Vector Pen Tool Clipping Path",
        "beforeSrc": "/Portfolio/CLipping/DETAIL - PREMIUM - 1.jpg",
        "afterSrc": "/Portfolio/CLipping/DETAIL - PREMIUM - 1_Clipped.jpg",
        "beforeAlt": "High Complexity Edge Before Path",
        "afterAlt": "Hand-Drawn Vector Path Sub-Pixel Cutout"
      },
      {
        "id": "clip-4",
        "title": "Hair & Alpha Channel Masking",
        "beforeSrc": "/Portfolio/CLipping/DETAIL - PREMIUM - 10.jpg",
        "afterSrc": "/Portfolio/CLipping/DETAIL - PREMIUM - 10_Clipped.jpg",
        "beforeAlt": "Model with Fine Stray Hair Before",
        "afterAlt": "Preserved Hair Strands Alpha Cutout"
      },
      {
        "id": "clip-5",
        "title": "E-Commerce Product Isolation",
        "beforeSrc": "/Portfolio/CLipping/3Before.jpg",
        "afterSrc": "/Portfolio/CLipping/3AFter.jpg",
        "beforeAlt": "E-commerce Item Before Background Removal",
        "afterAlt": "Amazon-Compliant White Background"
      },
      {
        "id": "clip-6",
        "title": "Jewelry & Metal Multi-Path Masking",
        "beforeSrc": "/Portfolio/CLipping/5_1.jpg",
        "afterSrc": "/Portfolio/CLipping/5_2.jpg",
        "beforeAlt": "Detailed Item Before Clipping",
        "afterAlt": "Precision Cutout After Clipping"
      }
    ]
  },
  {
    "id": "tab-portrait",
    "name": "Portrait Editing Services",
    "items": [
      {
        "id": "port-1",
        "title": "Natural Skin Smoothing & Blemish Removal",
        "beforeSrc": "/Portfolio/Portrait Editing/1.jpg",
        "afterSrc": "/Portfolio/Portrait Editing/1a.jpg",
        "beforeAlt": "Raw Portrait Before Retouching",
        "afterAlt": "Pore-Preserved Skin Frequency Separation"
      },
      {
        "id": "port-2",
        "title": "High-End Beauty & Magazine Retouching",
        "beforeSrc": "/Portfolio/Portrait Editing/DSC02703.jpg",
        "afterSrc": "/Portfolio/Portrait Editing/DSC02703_1.jpg",
        "beforeAlt": "Close-up Beauty Portrait Before",
        "afterAlt": "Refined Editorial Beauty Retouch"
      },
      {
        "id": "port-3",
        "title": "Studio Headshot Grooming",
        "beforeSrc": "/Portfolio/Portrait Editing/DSC_2840.JPG",
        "afterSrc": "/Portfolio/Portrait Editing/DSC_2840_Ed.jpg",
        "beforeAlt": "Corporate Headshot Before Cleanup",
        "afterAlt": "Polished Executive Headshot After"
      },
      {
        "id": "port-4",
        "title": "Editorial Frequency Separation",
        "beforeSrc": "/Portfolio/Portrait Editing/DSC_7525.jpg",
        "afterSrc": "/Portfolio/Portrait Editing/DSC_7525_Ed.jpg",
        "beforeAlt": "Editorial Model Before Retouching",
        "afterAlt": "Balanced Tone & Lighting Editorial Retouch"
      },
      {
        "id": "port-5",
        "title": "Natural Tone & Eye Iris Enhancement",
        "beforeSrc": "/Portfolio/Portrait Editing/EZGI8180.jpg",
        "afterSrc": "/Portfolio/Portrait Editing/EZGI8180_1.jpg",
        "beforeAlt": "Portrait Before Eye & Skin Refinement",
        "afterAlt": "Catchlight & Texture Preserved Portrait"
      }
    ]
  },
  {
    "id": "tab-wedding",
    "name": "Wedding Photo Post Processing",
    "items": [
      {
        "id": "wed-1",
        "title": "Hero Bride & Groom Beauty Retouching",
        "beforeSrc": "/Portfolio/Portrait Editing/DSC_5619.JPG",
        "afterSrc": "/Portfolio/Portrait Editing/DSC_5619_1.jpg",
        "beforeAlt": "Wedding Portrait Before Color Correction",
        "afterAlt": "Warm Romantic Wedding Color Grade & Skin Smoothing"
      },
      {
        "id": "wed-2",
        "title": "Outdoor Couple Romance Tone Calibration",
        "beforeSrc": "/Portfolio/Portrait Editing/1.jpg",
        "afterSrc": "/Portfolio/Portrait Editing/1a.jpg",
        "beforeAlt": "Couple Portrait Before Presets",
        "afterAlt": "Custom Preset Matched Wedding Photo"
      }
    ]
  }
]

# Write sample_gallery_clean.json and sample_gallery_data.json
with open(web_dir / "public/sample_gallery_clean.json", "w", encoding="utf-8") as f:
    json.dump(gallery_tabs, f, indent=2)
print("Updated public/sample_gallery_clean.json successfully!")

with open(web_dir / "public/sample_gallery_data.json", "w", encoding="utf-8") as f:
    json.dump(gallery_tabs, f, indent=2)
print("Updated public/sample_gallery_data.json successfully!")

# Write galleryTabs.json in api seed_data
with open(api_dir / "scripts/seed_data/galleryTabs.json", "w", encoding="utf-8") as f:
    json.dump(gallery_tabs, f, indent=2)
print("Updated api seed_data/galleryTabs.json successfully!")

# Sync PostgreSQL Database
load_dotenv(api_dir / ".env")
db_url = os.getenv("DATABASE_URL")
if db_url:
    import psycopg
    print("Connecting to Supabase PostgreSQL...")
    with psycopg.connect(db_url) as conn:
        with conn.cursor() as cur:
            # Sync services
            for idx, s in enumerate(services_data):
                cur.execute("""
                    UPDATE services SET
                        hero_image = %s,
                        before_src = %s,
                        after_src = %s,
                        sub_services = %s,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s;
                """, (
                    s["heroImage"],
                    s["beforeSrc"],
                    s["afterSrc"],
                    json.dumps(s["subServices"]),
                    s["id"]
                ))
            print("Updated PostgreSQL services table with real Portfolio images!")

            # Sync gallery_tabs
            cur.execute("DELETE FROM gallery_tabs;")
            for idx, tab in enumerate(gallery_tabs):
                cur.execute("""
                    INSERT INTO gallery_tabs (id, name, display_order, items, is_active)
                    VALUES (%s, %s, %s, %s, TRUE);
                """, (
                    tab["id"],
                    tab["name"],
                    idx,
                    json.dumps(tab["items"])
                ))
            print("Updated PostgreSQL gallery_tabs table with real Portfolio galleries!")
            conn.commit()

print("All portfolio image replacements and database sync complete!")
