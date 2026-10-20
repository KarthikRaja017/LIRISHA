-- ============================================================
-- Migration 005: Dropbox Cache Table
-- Caches Dropbox folder metadata to reduce API calls
-- and respect Dropbox API rate limits.
-- ============================================================

CREATE TABLE IF NOT EXISTS dropbox_cache (
    id           SERIAL PRIMARY KEY,
    cache_key    VARCHAR(500)  NOT NULL UNIQUE,   -- e.g. "lirisha-media_gallery_portrait"
    folder_path  VARCHAR(500)  NOT NULL,           -- original Dropbox path
    files_data   JSONB         NOT NULL DEFAULT '[]', -- array of serialized file metadata
    total_count  INTEGER       NOT NULL DEFAULT 0,
    fetched_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    expires_at   TIMESTAMPTZ   NOT NULL,
    is_valid     BOOLEAN       NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_dropbox_cache_key     ON dropbox_cache (cache_key);
CREATE INDEX IF NOT EXISTS idx_dropbox_cache_expires ON dropbox_cache (expires_at);
CREATE INDEX IF NOT EXISTS idx_dropbox_cache_valid   ON dropbox_cache (is_valid);
