export interface GalleryItem {
  id: string;
  title: string;
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
}

export interface GalleryTab {
  id: string;
  name: string;
  items: GalleryItem[];
}

export const galleryTabs: GalleryTab[] = [
  {
    "id": "tab-sm1",
    "name": "Real Estate",
    "items": [
      {
        "id": "tab-sm1-1",
        "title": "Deculttering",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Deculttering/001-before-525x.webp",
        "beforeAlt": "Deculttering before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Deculttering/001-after-525x.webp",
        "afterAlt": "Deculttering After"
      },
      {
        "id": "tab-sm1-2",
        "title": "Drone",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Drone/001-before-525x.webp",
        "beforeAlt": "Drone Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Drone/001-after-525x.webp",
        "afterAlt": "Drone After"
      },
      {
        "id": "tab-sm1-3",
        "title": "HDR",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-before-525x.webp",
        "beforeAlt": "HDR Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-after-525x.webp",
        "afterAlt": "HDR After"
      },
      {
        "id": "tab-sm1-4",
        "title": "Lawn Replacement",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Lawn-Replacement/001-before-525x.webp",
        "beforeAlt": "Lawn Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Lawn-Replacement/001-after-525x.webp",
        "afterAlt": "Lawn After"
      },
      {
        "id": "tab-sm1-5",
        "title": "Panoroma",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Panoroma/001-before-525x.webp",
        "beforeAlt": "Panorama Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Panoroma/001-after-525x.webp",
        "afterAlt": "Panoroma After"
      },
      {
        "id": "tab-sm1-6",
        "title": "Sky Replacement",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Sky-Replacement/001-before-525x.webp",
        "beforeAlt": "Sky Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Sky-Replacement/001-after-525x.webp",
        "afterAlt": "Sky After"
      },
      {
        "id": "tab-sm1-7",
        "title": "Twilight (Day to Dusk )",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Twilight-(Day%20to%20Dusk%20)/001-before-525x.webp",
        "beforeAlt": "Twilight Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Twilight-(Day%20to%20Dusk%20)/001-after-525x.webp",
        "afterAlt": "Twilight After"
      },
      {
        "id": "tab-sm1-8",
        "title": "Virtual staging",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Virtual-staging/001-before-525x.webp",
        "beforeAlt": "Virtual Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Virtual-staging/001-after-525x.webp",
        "afterAlt": "Virtual After"
      }
    ]
  },
  {
    "id": "tab-sm2",
    "name": "Portrait",
    "items": [
      {
        "id": "tab-sm2-1",
        "title": "Portrait",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/001-before.webp",
        "beforeAlt": "Portrait Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/001-after.webp",
        "afterAlt": "Portrait After"
      },
      {
        "id": "tab-sm2-2",
        "title": "Portrait",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/002-before.webp",
        "beforeAlt": "Portrait Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/002-after.webp",
        "afterAlt": "Portrait After"
      },
      {
        "id": "tab-sm2-3",
        "title": "Portrait",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/003-before.webp",
        "beforeAlt": "Portrait Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/003-after.webp",
        "afterAlt": "Portrait After"
      },
      {
        "id": "tab-sm2-4",
        "title": "Portrait",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/004-before.webp",
        "beforeAlt": "Portrait Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/004-after.webp",
        "afterAlt": "Portrait After"
      }
    ]
  },
  {
    "id": "tab-sm3",
    "name": "Fashion",
    "items": [
      {
        "id": "tab-sm3-1",
        "title": "Fashion",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/001-before.webp",
        "beforeAlt": "Fashion Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/001-after.webp",
        "afterAlt": "Fashion After"
      },
      {
        "id": "tab-sm3-2",
        "title": "Fashion",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/002-before.webp",
        "beforeAlt": "Fashion Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/002-after.webp",
        "afterAlt": "Fashion After"
      },
      {
        "id": "tab-sm3-3",
        "title": "Fashion",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/003-before.webp",
        "beforeAlt": "Fashion Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/003-after.webp",
        "afterAlt": "Fashion After"
      },
      {
        "id": "tab-sm3-4",
        "title": "Fashion",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/004-before.webp",
        "beforeAlt": "Fashion Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/004-after.webp",
        "afterAlt": "Fashion After"
      },
      {
        "id": "tab-sm3-5",
        "title": "Fashion",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/005-before.webp",
        "beforeAlt": "Fashion Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/005-after.webp",
        "afterAlt": "Fashion After"
      },
      {
        "id": "tab-sm3-6",
        "title": "Fashion",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/006-before.webp",
        "beforeAlt": "Fashion Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/006-after.webp",
        "afterAlt": "Fashion After"
      },
      {
        "id": "tab-sm3-7",
        "title": "Fashion",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/007-before.webp",
        "beforeAlt": "Fashion Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/007-after.webp",
        "afterAlt": "Fashion After"
      }
    ]
  },
  {
    "id": "tab-sm4",
    "name": "Jewelery",
    "items": [
      {
        "id": "tab-sm4-1",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/001-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/001-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm4-2",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/002-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/002-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm4-3",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/003-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/003-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm4-4",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/004-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/004-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm4-5",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/005-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/005-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm4-6",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/006-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/006-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm4-7",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/007-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/007-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm4-8",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/008-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/008-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm4-9",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/009-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/009-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm4-10",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/010-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/010-after.webp",
        "afterAlt": "Jewellery"
      }
    ]
  },
  {
    "id": "tab-sm5",
    "name": "Product",
    "items": [
      {
        "id": "tab-sm5-1",
        "title": "Deculttering",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Deculttering/001-before-525x.webp",
        "beforeAlt": "Deculttering before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Deculttering/001-after-525x.webp",
        "afterAlt": "Deculttering After"
      },
      {
        "id": "tab-sm5-2",
        "title": "Drone",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Drone/001-before-525x.webp",
        "beforeAlt": "Drone Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Drone/001-after-525x.webp",
        "afterAlt": "Drone After"
      },
      {
        "id": "tab-sm5-3",
        "title": "HDR",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-before-525x.webp",
        "beforeAlt": "HDR Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-after-525x.webp",
        "afterAlt": "HDR After"
      },
      {
        "id": "tab-sm5-4",
        "title": "Lawn Replacement",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Lawn-Replacement/001-before-525x.webp",
        "beforeAlt": "Lawn Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Lawn-Replacement/001-after-525x.webp",
        "afterAlt": "Lawn After"
      },
      {
        "id": "tab-sm5-5",
        "title": "Panoroma",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Panoroma/001-before-525x.webp",
        "beforeAlt": "Panorama Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Panoroma/001-after-525x.webp",
        "afterAlt": "Panoroma After"
      },
      {
        "id": "tab-sm5-6",
        "title": "Sky Replacement",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Sky-Replacement/001-before-525x.webp",
        "beforeAlt": "Sky Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Sky-Replacement/001-after-525x.webp",
        "afterAlt": "Sky After"
      },
      {
        "id": "tab-sm5-7",
        "title": "Twilight (Day to Dusk )",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Twilight-(Day%20to%20Dusk%20)/001-before-525x.webp",
        "beforeAlt": "Twilight Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Twilight-(Day%20to%20Dusk%20)/001-after-525x.webp",
        "afterAlt": "Twilight After"
      },
      {
        "id": "tab-sm5-8",
        "title": "Virtual staging",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Virtual-staging/001-before-525x.webp",
        "beforeAlt": "Virtual Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Virtual-staging/001-after-525x.webp",
        "afterAlt": "Virtual After"
      },
      {
        "id": "tab-sm5-9",
        "title": "Portrait",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/001-before.webp",
        "beforeAlt": "Portrait Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/001-after.webp",
        "afterAlt": "Portrait After"
      },
      {
        "id": "tab-sm5-10",
        "title": "Portrait",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/002-before.webp",
        "beforeAlt": "Portrait Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/002-after.webp",
        "afterAlt": "Portrait After"
      },
      {
        "id": "tab-sm5-11",
        "title": "Portrait",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/003-before.webp",
        "beforeAlt": "Portrait Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/003-after.webp",
        "afterAlt": "Portrait After"
      },
      {
        "id": "tab-sm5-12",
        "title": "Portrait",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/004-before.webp",
        "beforeAlt": "Portrait Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Portrait/004-after.webp",
        "afterAlt": "Portrait After"
      },
      {
        "id": "tab-sm5-13",
        "title": "Fashion",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/001-before.webp",
        "beforeAlt": "Fashion Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/001-after.webp",
        "afterAlt": "Fashion After"
      },
      {
        "id": "tab-sm5-14",
        "title": "Fashion",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/002-before.webp",
        "beforeAlt": "Fashion Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/002-after.webp",
        "afterAlt": "Fashion After"
      },
      {
        "id": "tab-sm5-15",
        "title": "Fashion",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/003-before.webp",
        "beforeAlt": "Fashion Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/003-after.webp",
        "afterAlt": "Fashion After"
      },
      {
        "id": "tab-sm5-16",
        "title": "Fashion",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/004-before.webp",
        "beforeAlt": "Fashion Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/004-after.webp",
        "afterAlt": "Fashion After"
      },
      {
        "id": "tab-sm5-17",
        "title": "Fashion",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/005-before.webp",
        "beforeAlt": "Fashion Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/005-after.webp",
        "afterAlt": "Fashion After"
      },
      {
        "id": "tab-sm5-18",
        "title": "Fashion",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/006-before.webp",
        "beforeAlt": "Fashion Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/006-after.webp",
        "afterAlt": "Fashion After"
      },
      {
        "id": "tab-sm5-19",
        "title": "Fashion",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/007-before.webp",
        "beforeAlt": "Fashion Before",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Fashion/007-after.webp",
        "afterAlt": "Fashion After"
      },
      {
        "id": "tab-sm5-20",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/001-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/001-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm5-21",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/002-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/002-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm5-22",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/003-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/003-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm5-23",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/004-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/004-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm5-24",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/005-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/005-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm5-25",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/006-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/006-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm5-26",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/007-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/007-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm5-27",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/008-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/008-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm5-28",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/009-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/009-after.webp",
        "afterAlt": "Jewellery"
      },
      {
        "id": "tab-sm5-29",
        "title": "Jewellery",
        "beforeSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/010-before.webp",
        "beforeAlt": "Jewellery",
        "afterSrc": "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Jewellery/010-after.webp",
        "afterAlt": "Jewellery"
      }
    ]
  }
];
