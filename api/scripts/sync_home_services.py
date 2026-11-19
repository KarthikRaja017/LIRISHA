import os
import sys
import json
from dotenv import load_dotenv

load_dotenv()
db_url = os.getenv("DATABASE_URL")
if not db_url:
    print("No DATABASE_URL found.")
    sys.exit(0)

import psycopg

showcase_items = [
    {
        "id": "real-estate",
        "title": "Real Estate Image Editing",
        "link": "/real-estate",
        "image": "/Portfolio/Real Estate/HDR Blending/07-Front Facade_1.jpg",
        "alt": "Real Estate Image Editing Services",
        "tagline": "High-impact MLS HDR bracket blending, twilight & virtual staging",
        "subServices": [
            "Image Enhancement",
            "HDR Blending",
            "Aerial Editing",
            "360 Panorama & Tours",
            "Day to Dusk Conversion",
            "Floor Plans (2D, 3D, Site Plan)"
        ]
    },
    {
        "id": "image-clipping",
        "title": "Image Clipping Services",
        "link": "/image-clipping",
        "image": "/Portfolio/CLipping/1_2.jpg",
        "alt": "Image Clipping Services",
        "tagline": "Handcrafted Photoshop pen tool clipping paths & background removal",
        "subServices": [
            "Background Removal Services",
            "Handcrafted Vector Paths",
            "Hair Masking & Alpha Channel",
            "Pure White #FFFFFF Amazon Backgrounds"
        ]
    },
    {
        "id": "portrait",
        "title": "Portrait Editing Services",
        "link": "/portrait",
        "image": "/Portfolio/Portrait Editing/1a.jpg",
        "alt": "Portrait Editing Services",
        "tagline": "Magazine-grade skin retouching that preserves authentic pore texture",
        "subServices": [
            "Skin Retouching & Frequency Separation",
            "High-End Beauty Retouching",
            "Corporate Headshot Grooming",
            "Blemish, Teeth & Eye Sparkle"
        ]
    },
    {
        "id": "wedding",
        "title": "Wedding Photo Post Processing",
        "link": "/wedding-photo-post-processing",
        "image": "/Portfolio/Portrait Editing/DSC_5619_1.jpg",
        "alt": "Wedding Photo Post Processing",
        "tagline": "High-volume RAW culling, custom Lightroom presets & hero retouching",
        "subServices": [
            "High-Volume RAW Culling",
            "Custom Lightroom Preset Calibration",
            "Ceremony & Reception Tone Balance",
            "Hero Bride & Groom Retouching"
        ]
    }
]

with psycopg.connect(db_url) as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT slug, sections FROM pages WHERE slug = 'home';")
        row = cur.fetchone()
        if row:
            slug, sections_raw = row
            sections = sections_raw if isinstance(sections_raw, list) else json.loads(sections_raw or "[]")
            for s in sections:
                if s.get("type") in ("services_showcase", "services_scroll"):
                    s["items"] = showcase_items
                    s["headingLine1"] = "Our Professional"
                    s["headingLine2"] = "Image Editing Services"
            cur.execute("UPDATE pages SET sections = %s, updated_at = CURRENT_TIMESTAMP WHERE slug = 'home';", (json.dumps(sections),))
            conn.commit()
            print("Successfully updated 'home' page showcase items in PostgreSQL!")
