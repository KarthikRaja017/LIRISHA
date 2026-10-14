-- 004_site_settings.sql
CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO site_settings (key, value, metadata)
VALUES 
    ('site_name', 'SmartPHOTOeditors', '{"label": "Site Name"}'::jsonb),
    ('site_tagline', 'Outsource Image Editing Services', '{"label": "Tagline"}'::jsonb),
    ('site_logo', '/images/SPE-logo.svg', '{"label": "Header Logo"}'::jsonb),
    ('site_footer_logo', '/images/SPE-logo.svg', '{"label": "Footer Logo"}'::jsonb),
    ('site_favicon', '/favicon.ico', '{"label": "Favicon / Top Page Icon"}'::jsonb),
    ('contact_phone', '1-855-695-6028', '{"label": "Phone"}'::jsonb),
    ('contact_email', 'info@smartphotoeditors.com', '{"label": "Email"}'::jsonb)
ON CONFLICT (key) DO NOTHING;
