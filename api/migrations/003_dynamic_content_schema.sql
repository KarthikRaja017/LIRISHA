-- Migration 003: Dynamic Content Schema for LIRISHA Platform
-- Adds tables for services, resources (articles/case studies/blogs), testimonials, gallery tabs, and pages

-- 1. Services Table
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    tagline TEXT,
    short_desc TEXT,
    full_desc TEXT,
    icon_class VARCHAR(100),
    hero_image TEXT,
    before_src TEXT,
    after_src TEXT,
    before_alt VARCHAR(255),
    after_alt VARCHAR(255),
    turnaround_time VARCHAR(100),
    deliverables JSONB DEFAULT '[]'::jsonb,
    key_benefits JSONB DEFAULT '[]'::jsonb,
    sub_services JSONB DEFAULT '[]'::jsonb,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON services(display_order);

-- 2. Resources Table (Articles, Case Studies, Blogs, Guides)
CREATE TABLE IF NOT EXISTS resources (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(150) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT,
    date VARCHAR(50),
    author VARCHAR(100),
    read_time VARCHAR(50),
    image TEXT,
    link TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    metrics JSONB DEFAULT '[]'::jsonb,
    client_details JSONB DEFAULT '{}'::jsonb,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_resources_slug ON resources(slug);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_is_published ON resources(is_published);

-- 3. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id VARCHAR(100) PRIMARY KEY,
    author VARCHAR(150) NOT NULL,
    role VARCHAR(150),
    company VARCHAR(150),
    location VARCHAR(150),
    avatar TEXT,
    quote TEXT NOT NULL,
    rating INT DEFAULT 5,
    project_type VARCHAR(100),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_testimonials_display_order ON testimonials(display_order);

-- 4. Gallery Tabs & Items Table
CREATE TABLE IF NOT EXISTS gallery_tabs (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    display_order INT DEFAULT 0,
    items JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_gallery_tabs_display_order ON gallery_tabs(display_order);

-- 5. Page-by-Page CMS Content Table
CREATE TABLE IF NOT EXISTS pages (
    slug VARCHAR(150) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    meta_description TEXT,
    hero JSONB DEFAULT '{}'::jsonb,
    sections JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
