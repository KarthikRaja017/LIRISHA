"""
Dynamic Content Database Seeder for LIRISHA Platform.
Imports data from seed_data JSON files into Supabase PostgreSQL:
- services
- resources (articles, case studies, blogs)
- testimonials
- gallery_tabs
- pages (page-wise CMS store)
"""
import os
import sys
import json
from pathlib import Path
from dotenv import load_dotenv

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

load_dotenv()

import psycopg
from psycopg.rows import dict_row


def get_db_url():
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("ERROR: DATABASE_URL is not set.")
        sys.exit(1)
    return db_url


def seed_services(cursor, seed_dir: Path):
    filepath = seed_dir / "services.json"
    if not filepath.exists():
        print(f"Warning: {filepath} not found, skipping services.")
        return 0

    with open(filepath, "r", encoding="utf-8") as f:
        services = json.load(f)

    print(f"Seeding {len(services)} services...")
    for idx, s in enumerate(services):
        cursor.execute("""
            INSERT INTO services (
                id, slug, name, tagline, short_desc, full_desc, icon_class,
                hero_image, before_src, after_src, before_alt, after_alt,
                turnaround_time, deliverables, key_benefits, sub_services,
                display_order, is_active, updated_at
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s,
                %s, %s, %s, %s, %s,
                %s, %s, %s, %s,
                %s, %s, CURRENT_TIMESTAMP
            )
            ON CONFLICT (id) DO UPDATE SET
                slug = EXCLUDED.slug,
                name = EXCLUDED.name,
                tagline = EXCLUDED.tagline,
                short_desc = EXCLUDED.short_desc,
                full_desc = EXCLUDED.full_desc,
                icon_class = EXCLUDED.icon_class,
                hero_image = EXCLUDED.hero_image,
                before_src = EXCLUDED.before_src,
                after_src = EXCLUDED.after_src,
                before_alt = EXCLUDED.before_alt,
                after_alt = EXCLUDED.after_alt,
                turnaround_time = EXCLUDED.turnaround_time,
                deliverables = EXCLUDED.deliverables,
                key_benefits = EXCLUDED.key_benefits,
                sub_services = EXCLUDED.sub_services,
                display_order = EXCLUDED.display_order,
                is_active = EXCLUDED.is_active,
                updated_at = CURRENT_TIMESTAMP
        """, (
            s.get("id"),
            s.get("slug", s.get("id")),
            s.get("name", ""),
            s.get("tagline", ""),
            s.get("shortDesc", ""),
            s.get("fullDesc", ""),
            s.get("iconClass", ""),
            s.get("heroImage", ""),
            s.get("beforeSrc", ""),
            s.get("afterSrc", ""),
            s.get("beforeAlt", ""),
            s.get("afterAlt", ""),
            s.get("turnaroundTime", ""),
            json.dumps(s.get("deliverables", [])),
            json.dumps(s.get("keyBenefits", [])),
            json.dumps(s.get("subServices", [])),
            idx,
            True
        ))
    print(f"Successfully seeded {len(services)} services.")
    return len(services)


def seed_resources(cursor, seed_dir: Path):
    files_to_category = [
        ("articles.json", "Articles"),
        ("caseStudies.json", "Case Studies"),
        ("blogPosts.json", "Blog")
    ]
    total = 0

    for filename, default_cat in files_to_category:
        filepath = seed_dir / filename
        if not filepath.exists():
            continue

        with open(filepath, "r", encoding="utf-8") as f:
            items = json.load(f)

        print(f"Seeding {len(items)} items from {filename} ({default_cat})...")
        for item in items:
            cursor.execute("""
                INSERT INTO resources (
                    id, slug, category, title, excerpt, content, date,
                    author, read_time, image, link, tags, metrics,
                    client_details, is_published, updated_at
                ) VALUES (
                    %s, %s, %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s, %s,
                    %s, %s, CURRENT_TIMESTAMP
                )
                ON CONFLICT (id) DO UPDATE SET
                    slug = EXCLUDED.slug,
                    category = EXCLUDED.category,
                    title = EXCLUDED.title,
                    excerpt = EXCLUDED.excerpt,
                    content = EXCLUDED.content,
                    date = EXCLUDED.date,
                    author = EXCLUDED.author,
                    read_time = EXCLUDED.read_time,
                    image = EXCLUDED.image,
                    link = EXCLUDED.link,
                    tags = EXCLUDED.tags,
                    metrics = EXCLUDED.metrics,
                    client_details = EXCLUDED.client_details,
                    is_published = EXCLUDED.is_published,
                    updated_at = CURRENT_TIMESTAMP
            """, (
                item.get("id"),
                item.get("slug", item.get("id")),
                item.get("category", default_cat),
                item.get("title", ""),
                item.get("excerpt", ""),
                item.get("content", item.get("excerpt", "")),
                item.get("date", ""),
                item.get("author", "SmartPHOTOeditors Team"),
                item.get("readTime", "5 min read"),
                item.get("image", ""),
                item.get("link", f"/resources/{item.get('slug', item.get('id'))}"),
                json.dumps(item.get("tags", [])),
                json.dumps(item.get("metrics", [])),
                json.dumps(item.get("clientDetails", {})),
                True
            ))
            total += 1

    print(f"Successfully seeded {total} resource records.")
    return total


def seed_testimonials(cursor, seed_dir: Path):
    filepath = seed_dir / "testimonials.json"
    if not filepath.exists():
        return 0

    with open(filepath, "r", encoding="utf-8") as f:
        testimonials = json.load(f)

    print(f"Seeding {len(testimonials)} testimonials...")
    for idx, t in enumerate(testimonials):
        cursor.execute("""
            INSERT INTO testimonials (
                id, author, role, company, location, avatar, quote,
                rating, project_type, display_order, is_active
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s,
                %s, %s, %s, %s
            )
            ON CONFLICT (id) DO UPDATE SET
                author = EXCLUDED.author,
                role = EXCLUDED.role,
                company = EXCLUDED.company,
                location = EXCLUDED.location,
                avatar = EXCLUDED.avatar,
                quote = EXCLUDED.quote,
                rating = EXCLUDED.rating,
                project_type = EXCLUDED.project_type,
                display_order = EXCLUDED.display_order,
                is_active = EXCLUDED.is_active
        """, (
            t.get("id"),
            t.get("author", "Anonymous"),
            t.get("role", ""),
            t.get("company", ""),
            t.get("location", ""),
            t.get("avatar", ""),
            t.get("quote", ""),
            t.get("rating", 5),
            t.get("projectType", ""),
            idx,
            True
        ))
    print(f"Successfully seeded {len(testimonials)} testimonials.")
    return len(testimonials)


def seed_gallery_tabs(cursor, seed_dir: Path):
    filepath = seed_dir / "galleryTabs.json"
    if not filepath.exists():
        return 0

    with open(filepath, "r", encoding="utf-8") as f:
        tabs = json.load(f)

    print(f"Seeding {len(tabs)} gallery tabs...")
    for idx, tab in enumerate(tabs):
        cursor.execute("""
            INSERT INTO gallery_tabs (
                id, name, display_order, items, is_active
            ) VALUES (
                %s, %s, %s, %s, %s
            )
            ON CONFLICT (id) DO UPDATE SET
                name = EXCLUDED.name,
                display_order = EXCLUDED.display_order,
                items = EXCLUDED.items,
                is_active = EXCLUDED.is_active
        """, (
            tab.get("id"),
            tab.get("name", "Gallery"),
            idx,
            json.dumps(tab.get("items", [])),
            True
        ))
    print(f"Successfully seeded {len(tabs)} gallery tabs.")
    return len(tabs)


def seed_pages(cursor):
    """Initializes page-wise CMS content for core pages."""
    core_pages = [
        {
            "slug": "about-us",
            "title": "About Us | SmartPHOTOeditors",
            "meta_description": "SmartPHOTOeditors provides value-focused, quality services from a team of skilled Adobe experts.",
            "hero": {
                "title": "About SPE Image Editing Specialists",
                "tagline": "AI-assisted image editing & post-production support at scale",
                "image": "/images/about/about-banner-540x671.webp",
                "cta_text": "Get a free Quote Note",
                "cta_link": "/contact-us.php"
            },
            "sections": [
                {
                    "type": "statistics",
                    "title": "Key Statistics",
                    "items": [
                        {"value": "15+", "label": "Years in Business"},
                        {"value": "200+", "label": "Skilled Photoshop Artists"},
                        {"value": "10M+", "label": "Images Edited"},
                        {"value": "99.2%", "label": "Client Satisfaction"}
                    ]
                },
                {
                    "type": "mission",
                    "title": "Our Mission & Commitment",
                    "content": "Delivering high-precision post-production with 12 to 24-hour turnaround times worldwide."
                }
            ]
        },
        {
            "slug": "pricing",
            "title": "Transparent Pricing | SmartPHOTOeditors",
            "meta_description": "Affordable image editing pricing packages tailored to your project volume.",
            "hero": {
                "title": "Simple, Scalable Pricing",
                "tagline": "Pay per image or choose volume-based dedicated artist retainers.",
                "cta_text": "Request a Custom Quote",
                "cta_link": "/contact-us.php"
            },
            "sections": [
                {
                    "type": "pricing_tiers",
                    "tiers": [
                        {"name": "Standard Retouching", "price": "From $0.80 / image", "turnaround": "24 Hours"},
                        {"name": "Real Estate HDR", "price": "From $1.20 / image", "turnaround": "12-24 Hours"},
                        {"name": "Clipping Path & Masking", "price": "From $0.50 / image", "turnaround": "12 Hours"}
                    ]
                }
            ]
        },
        {
            "slug": "quality",
            "title": "Quality Assurance | SmartPHOTOeditors",
            "meta_description": "Learn about our 3-tier quality control process guaranteeing flawless images.",
            "hero": {
                "title": "Uncompromising Quality Control",
                "tagline": "Every image undergoes multi-stage senior artist inspection."
            },
            "sections": []
        },
        {
            "slug": "turnaround-time",
            "title": "Turnaround Times | SmartPHOTOeditors",
            "meta_description": "Fast 12-24 hour turnaround times with 24/7 global production shifts.",
            "hero": {
                "title": "Rapid 12 - 24 Hour Turnaround",
                "tagline": "Round-the-clock operations ensure your deadlines are met consistently."
            },
            "sections": []
        }
    ]

    print(f"Seeding {len(core_pages)} page records...")
    for p in core_pages:
        cursor.execute("""
            INSERT INTO pages (
                slug, title, meta_description, hero, sections, is_published, updated_at
            ) VALUES (
                %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP
            )
            ON CONFLICT (slug) DO UPDATE SET
                title = EXCLUDED.title,
                meta_description = EXCLUDED.meta_description,
                hero = EXCLUDED.hero,
                sections = EXCLUDED.sections,
                is_published = EXCLUDED.is_published,
                updated_at = CURRENT_TIMESTAMP
        """, (
            p["slug"],
            p["title"],
            p["meta_description"],
            json.dumps(p.get("hero", {})),
            json.dumps(p.get("sections", [])),
            True
        ))
    print(f"Successfully seeded {len(core_pages)} page records.")
    return len(core_pages)


def run_seeder():
    db_url = get_db_url()
    seed_dir = Path(__file__).resolve().parent / "seed_data"

    print("Connecting to database for seeding...")
    with psycopg.connect(db_url, row_factory=dict_row) as conn:
        with conn.cursor() as cursor:
            s_count = seed_services(cursor, seed_dir)
            r_count = seed_resources(cursor, seed_dir)
            t_count = seed_testimonials(cursor, seed_dir)
            g_count = seed_gallery_tabs(cursor, seed_dir)
            p_count = seed_pages(cursor)
            conn.commit()

    print("\n" + "="*50)
    print("ALL DYNAMIC DATA SEEDED SUCCESSFULLY INTO POSTGRESQL:")
    print(f"  - Services: {s_count}")
    print(f"  - Resources (Articles/Case Studies/Blogs): {r_count}")
    print(f"  - Testimonials: {t_count}")
    print(f"  - Gallery Tabs: {g_count}")
    print(f"  - Pages (CMS Store): {p_count}")
    print("="*50)


if __name__ == "__main__":
    run_seeder()
