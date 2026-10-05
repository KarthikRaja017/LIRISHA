export interface ResourceArticle {
  id: string;
  slug: string;
  category: "Articles" | "Case Studies" | "Blog" | "Guides";
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  link: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  clientDetails?: {
    client: string;
    industry: string;
    location: string;
    challenge: string;
    solution: string;
    results: string[];
  };
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  rating: number;
  projectType: string;
}

export const articlesData: ResourceArticle[] = [
  {
    id: "art-1",
    slug: "real-estate-photo-editing-guide-2026",
    category: "Articles",
    title: "The Ultimate Guide to Real Estate Photo Editing: HDR Blending, Sky Swaps & Staging",
    excerpt:
      "Explore how HDR exposure blending, day-to-dusk twilight conversions, and virtual staging dramatically elevate property listings and increase buyer inquiries.",
    date: "Sep 28, 2026",
    author: "Editorial Team",
    readTime: "6 min read",
    image: "/images/homepage/real-estate.webp",
    link: "/articles/real-estate-photo-editing-guide-2026",
    tags: ["Real Estate", "HDR Blending", "Twilight", "Virtual Staging"]
  },
  {
    id: "art-2",
    slug: "ghost-mannequin-effect-for-ecommerce-fashion",
    category: "Articles",
    title: "Mastering the Ghost Mannequin Effect: How to Create 3D Apparel Imagery",
    excerpt:
      "Step-by-step techniques to merge collar and neckline photos for flawless 3D hollow-man effects that reduce product return rates for fashion brands.",
    date: "Sep 20, 2026",
    author: "Fashion Specialists",
    readTime: "5 min read",
    image: "/images/homepage/ecommerce-image-editing.webp",
    link: "/articles/ghost-mannequin-effect-for-ecommerce-fashion",
    tags: ["Fashion", "Ghost Mannequin", "E-Commerce", "Apparel"]
  },
  {
    id: "art-3",
    slug: "hair-masking-alpha-channel-techniques",
    category: "Articles",
    title: "Alpha Channel Hair Masking: Advanced Photoshop Techniques for Fine Strands",
    excerpt:
      "Learn how professional retouchers extract intricate flyaway hair and animal fur against complex backgrounds using non-destructive channel calculation.",
    date: "Sep 15, 2026",
    author: "Photoshop Masters",
    readTime: "7 min read",
    image: "/images/homepage/image-cliping.webp",
    link: "/articles/hair-masking-alpha-channel-techniques",
    tags: ["Clipping", "Hair Masking", "Photoshop", "Alpha Channel"]
  },
  {
    id: "art-4",
    slug: "jewelry-photo-retouching-sparkle-and-luster",
    category: "Articles",
    title: "Macro Jewelry Retouching: Maximizing Diamond Fire & Eliminating Glare",
    excerpt:
      "A deep dive into focus stacking, facet sharpening, and light reflection balancing to make gemstones and luxury watches sparkle on digital storefronts.",
    date: "Sep 08, 2026",
    author: "Jewelry Retouchers",
    readTime: "8 min read",
    image: "/images/homepage/jewellery-retouching.webp",
    link: "/articles/jewelry-photo-retouching-sparkle-and-luster",
    tags: ["Jewelry", "Macro Photography", "Diamond Sparkle", "Focus Stacking"]
  },
  {
    id: "art-5",
    slug: "amazon-product-image-guidelines-compliance",
    category: "Articles",
    title: "Amazon Product Image Requirements: Compliance Standards & Best Practices",
    excerpt:
      "Avoid listing suppressions by ensuring pure RGB (255,255,255) white backgrounds, 85% frame fill ratios, 2000px zoom resolution, and accurate aspect ratios.",
    date: "Aug 30, 2026",
    author: "E-Commerce Strategy Team",
    readTime: "5 min read",
    image: "/images/homepage/furniture-photo-editing.webp",
    link: "/articles/amazon-product-image-guidelines-compliance",
    tags: ["Amazon", "E-Commerce", "Product Guidelines", "Conversion"]
  },
  {
    id: "art-6",
    slug: "frequency-separation-portrait-retouching",
    category: "Articles",
    title: "Frequency Separation Demystified: High-End Skin Retouching Without Plastic Look",
    excerpt:
      "How separating high-frequency texture from low-frequency color tones lets editors smooth skin tone blemishes while preserving 100% natural pores.",
    date: "Aug 22, 2026",
    author: "Portrait Lab",
    readTime: "7 min read",
    image: "/images/sample-images/Portrait/001-after.webp",
    link: "/articles/frequency-separation-portrait-retouching",
    tags: ["Portrait", "Skin Texture", "Frequency Separation", "Beauty"]
  }
];

export const caseStudiesData: ResourceArticle[] = [
  {
    id: "cs-1",
    slug: "automobile-image-clipping",
    category: "Case Studies",
    title: "UK's Largest Automotive Seller Clips 5,000+ Car Images with 48h Turnaround",
    excerpt:
      "How SmartPHOTOeditors helped a premier UK car dealership network isolate 5,000 vehicle photos, replace backgrounds with modern digital showrooms, and cut turnaround time by 60%.",
    date: "Case Study #CS-01",
    author: "Enterprise Solutions",
    readTime: "4 min read",
    image: "/images/homepage/case-study-2.webp",
    link: "/case-study/automobile-image-clipping.php",
    tags: ["Automotive", "High Volume", "Background Replacement", "Clipping"],
    metrics: [
      { label: "Images Processed", value: "5,000+" },
      { label: "Turnaround Time", value: "48 Hours" },
      { label: "Cost Savings", value: "45%" },
      { label: "Quality Pass Rate", value: "99.4%" }
    ],
    clientDetails: {
      client: "Premier UK Automotive Dealership Group",
      industry: "Automotive E-Commerce",
      location: "United Kingdom",
      challenge: "Processing an unexpected surge of 5,000 inventory car photos taken across 18 dealership forecourts with inconsistent backgrounds, harsh sunlight, and distracting reflections.",
      solution: "SPE deployed a dedicated 20-editor task force working in split shifts with handcrafted clipping paths, window tint transparency, wheel spoke cutouts, and uniform virtual showroom backdrop placement.",
      results: [
        "Delivered full 5,000+ catalog in 48 hours without compromising vector accuracy.",
        "Increased online listing engagement and vehicle inquiries by 32%.",
        "Saved the client 45% compared to local UK agency editing quotes."
      ]
    }
  },
  {
    id: "cs-2",
    slug: "image-clipping-for-design-agency",
    category: "Case Studies",
    title: "Time-Critical Image Clipping & Masking for Atlanta-Based Design Agency",
    excerpt:
      "Delivering 1,200 complex multi-path product cutouts and alpha hair masks overnight for an Atlanta creative agency facing a strict global advertising deadline.",
    date: "Case Study #CS-02",
    author: "Creative Operations",
    readTime: "4 min read",
    image: "/images/homepage/case-study-1.webp",
    link: "/case-study/image-clipping-for-design-agency.php",
    tags: ["Design Agency", "Overnight TAT", "Multi-Path", "Advertising"],
    metrics: [
      { label: "Turnaround", value: "12 Hours" },
      { label: "Total Assets", value: "1,200" },
      { label: "Error Rate", value: "< 0.2%" },
      { label: "Client Retainer", value: "Ongoing" }
    ],
    clientDetails: {
      client: "Atlanta Global Brand Marketing Agency",
      industry: "Advertising & Design",
      location: "Atlanta, GA, USA",
      challenge: "An urgent campaign launch required 1,200 multi-layer product and model cutouts within 12 hours. The agency's in-house team lacked the bandwidth.",
      solution: "Leveraging our 24/7 time-zone advantage, SPE received the raw assets at 6:00 PM EST and delivered fully masked, layer-separated PSD files before 6:00 AM EST the next morning.",
      results: [
        "Met the client's advertising deadline with zero delivery delays.",
        "Delivered 100% vector-precise clipping paths with zero halo artifacts.",
        "Established a continuing monthly retainer partnership for all agency post-production."
      ]
    }
  },
  {
    id: "cs-3",
    slug: "real-estate-studio-scaling-sweden",
    category: "Case Studies",
    title: "Scandinavian Real Estate Photography Studio Scales Output 4X in Peak Season",
    excerpt:
      "Streamlining HDR bracket blending, sky replacements, and floor plan conversions for 12,000 residential and commercial properties across Stockholm.",
    date: "Case Study #CS-03",
    author: "Real Estate Division",
    readTime: "5 min read",
    image: "/images/homepage/case-study-3.webp",
    link: "/case-study/real-estate-studio-scaling-sweden.php",
    tags: ["Real Estate", "HDR Blending", "Floor Plans", "Sweden"],
    metrics: [
      { label: "Annual Listings", value: "12,000+" },
      { label: "Daily Output", value: "350 Sets" },
      { label: "Speed Gain", value: "4X Faster" },
      { label: "SLA Adherence", value: "99.8%" }
    ],
    clientDetails: {
      client: "Top Real Estate Imaging Studio in Sweden",
      industry: "Architectural & Real Estate Imaging",
      location: "Stockholm, Sweden",
      challenge: "Seasonal housing market spikes caused severe backlog bottlenecks. Photographers spent 6+ hours editing each night instead of shooting new properties.",
      solution: "SPE set up an automated FTP ingestion queue with dedicated real estate artists specializing in Scandinavian clean, airy interior aesthetics and Nordic sky replacements.",
      results: [
        "Enabled studio photographers to double their daily property shooting appointments.",
        "Guaranteed 14-hour overnight delivery for morning MLS publication.",
        "Reduced studio operating overhead costs by 52%."
      ]
    }
  }
];

export const blogPostsData: ResourceArticle[] = [
  {
    id: "blog-1",
    slug: "ai-vs-human-in-the-loop-photo-editing",
    category: "Blog",
    title: "AI vs. Human-in-the-Loop Photo Editing: Why Pure AI Still Falls Short for Brands",
    excerpt:
      "Why the future of scalable photo editing combines AI speed with human discernment to prevent uncanny valley artifacts and maintain strict brand integrity.",
    date: "Sep 24, 2026",
    author: "Tech & Innovation Desk",
    readTime: "5 min read",
    image: "/images/about/professionals-1.webp",
    link: "/blog/ai-vs-human-in-the-loop-photo-editing",
    tags: ["AI Editing", "Human in the Loop", "Future of Retouching", "Quality"]
  },
  {
    id: "blog-2",
    slug: "top-5-e-commerce-product-photography-mistakes",
    category: "Blog",
    title: "Top 5 E-Commerce Product Photography Mistakes That Hurt Conversion Rates",
    excerpt:
      "From inconsistent background color tones to lack of shadow grounding, discover the most common photography pitfalls and how post-processing corrects them.",
    date: "Sep 18, 2026",
    author: "Conversion Optimization Team",
    readTime: "6 min read",
    image: "/images/homepage/furniture-photo-editing.webp",
    link: "/blog/top-5-e-commerce-product-photography-mistakes",
    tags: ["E-Commerce", "Conversion Rate", "Product Photography", "Drop Shadow"]
  },
  {
    id: "blog-3",
    slug: "how-to-prep-raw-files-for-outsourcing",
    category: "Blog",
    title: "How to Prepare & Organize RAW Files for Outsourced Post-Production",
    excerpt:
      "Best practices for organizing Lightroom catalogs, generating lightweight Smart Previews, and writing clear creative briefs for external editing teams.",
    date: "Sep 10, 2026",
    author: "Workflow Consultants",
    readTime: "4 min read",
    image: "/images/homepage/banner-3.webp",
    link: "/blog/how-to-prep-raw-files-for-outsourcing",
    tags: ["Lightroom", "Workflow", "Smart Previews", "Outsourcing Guide"]
  },
  {
    id: "blog-4",
    slug: "the-art-of-day-to-dusk-twilight-conversion",
    category: "Blog",
    title: "The Art of Day-to-Dusk: How Virtual Twilight Sells Properties Faster",
    excerpt:
      "Discover why evening twilight photos attract 3x more clicks on Zillow and how digital sunset conversions save thousands over real dusk photoshoot setups.",
    date: "Aug 29, 2026",
    author: "Real Estate Desk",
    readTime: "5 min read",
    image: "/images/homepage/banner-1.webp",
    link: "/blog/the-art-of-day-to-dusk-twilight-conversion",
    tags: ["Real Estate", "Twilight", "Day to Dusk", "Architecture"]
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: "test-1",
    quote:
      "My experience with Frederick at SmartPHOTOeditors has been incredibly positive, particularly in terms of editing my photographs. I am impressed by the professionalism extended to me, as well as the swift turnaround time in handling my items.",
    author: "Frederick M.",
    role: "Photography Professional",
    company: "Studio Vision UK",
    location: "United Kingdom",
    avatar: "/images/about/test2.webp",
    rating: 5,
    projectType: "Portrait & Studio Retouching"
  },
  {
    id: "test-2",
    quote:
      "I've recently had the opportunity to review the edited photos from the 'Millenium Towers' project and I was profoundly impressed. The excellence of your work is truly commendable. Kindly convey my appreciation to your editing team for their outstanding job.",
    author: "Marcus Vance",
    role: "Director of Media",
    company: "Metro Real Estate Media LLC",
    location: "California, USA",
    avatar: "/images/about/test3.webp",
    rating: 5,
    projectType: "Real Estate HDR & 360 Virtual Tours"
  },
  {
    id: "test-3",
    quote:
      "Collaborating with Prashanth Ashok was a remarkable, effortless process. I required immediate assistance with Photoshop services. Prashanth not only responded to my request promptly but also managed to deliver high-quality work within the same day.",
    author: "Prashanth Ashok Client",
    role: "Enterprise Software & Media Manager",
    company: "CloudScale Systems",
    location: "Texas, USA",
    avatar: "/images/about/test1.webp",
    rating: 5,
    projectType: "Creative Manipulation & Clipping"
  },
  {
    id: "test-4",
    quote:
      "We were thoroughly impressed with the quality of our portraits. The service was quick, efficient, and did not put a strain on our budget. Continue the excellent work! We will definitely recommend your services to our associates.",
    author: "Elin Nordström",
    role: "Photo Editing Manager",
    company: "Nordic Vision Studios",
    location: "Stockholm, Sweden",
    avatar: "/images/about/test2.webp",
    rating: 5,
    projectType: "High-Volume Wedding & Portrait Culling"
  },
  {
    id: "test-5",
    quote:
      "Great photos, thanks. We were impressed with our results from our portrait – a great service and high-quality results (and it didn't break the bank). Keep up the good work. We are really impressed with the attention to detail.",
    author: "Klaus Hoffmann",
    role: "Managing Director",
    company: "Hoffmann & Partner Media",
    location: "Munich, Germany",
    avatar: "/images/about/test3.webp",
    rating: 5,
    projectType: "E-Commerce Fashion Ghost Mannequin"
  },
  {
    id: "test-6",
    quote:
      "We were extremely happy with the services provided by Real Estate property image enhancement works. The team was able to see us promptly and was very pleasant to deal with. We are delighted with such professional results.",
    author: "Johan Lindqvist",
    role: "Creative Director",
    company: "Scandinavian Home Visuals",
    location: "Gothenburg, Sweden",
    avatar: "/images/about/test1.webp",
    rating: 5,
    projectType: "Real Estate Sky Replacement & Staging"
  }
];
