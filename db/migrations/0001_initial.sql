CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'editor')),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz
);
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_expiry_idx ON sessions(expires_at);

CREATE TABLE IF NOT EXISTS login_attempts (
  bucket_key text PRIMARY KEY,
  window_started_at timestamptz NOT NULL DEFAULT now(),
  attempt_count integer NOT NULL DEFAULT 0,
  blocked_until timestamptz
);

CREATE TABLE IF NOT EXISTS content_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL CHECK (
    content_type IN ('notice', 'event', 'faculty', 'programme', 'institutional')
  ),
  slug text NOT NULL,
  title text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  source_reference text,
  verification_status text NOT NULL DEFAULT 'unverified'
    CHECK (verification_status IN ('unverified', 'pending-college-confirmation', 'verified', 'historical', 'unavailable')),
  publication_permission_status text NOT NULL DEFAULT 'pending'
    CHECK (publication_permission_status IN ('pending', 'approved', 'withheld')),
  publication_status text NOT NULL DEFAULT 'draft'
    CHECK (publication_status IN ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE (content_type, slug)
);
CREATE INDEX IF NOT EXISTS content_publication_idx
  ON content_items(content_type, publication_status, published_at DESC);

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  original_filename text NOT NULL,
  storage_key text NOT NULL UNIQUE,
  mime_type text NOT NULL DEFAULT 'application/pdf'
    CHECK (mime_type = 'application/pdf'),
  byte_size bigint NOT NULL CHECK (byte_size > 0),
  sha256 text NOT NULL UNIQUE,
  category text NOT NULL,
  source_title text,
  source_url text,
  document_period text,
  replaces_document_id uuid REFERENCES documents(id) ON DELETE SET NULL,
  information_status text NOT NULL DEFAULT 'unverified'
    CHECK (information_status IN ('current', 'historical', 'unverified')),
  publication_permission_status text NOT NULL DEFAULT 'pending'
    CHECK (publication_permission_status IN ('pending', 'approved', 'withheld')),
  publication_status text NOT NULL DEFAULT 'draft'
    CHECK (publication_status IN ('draft', 'published', 'archived')),
  extracted_text text,
  extraction_status text NOT NULL DEFAULT 'pending'
    CHECK (extraction_status IN ('pending', 'completed', 'failed')),
  extraction_error text,
  extracted_at timestamptz,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
  archived_at timestamptz
);
CREATE INDEX IF NOT EXISTS documents_publication_idx
  ON documents(publication_status, category, created_at DESC);
CREATE INDEX IF NOT EXISTS documents_sha256_idx ON documents(sha256);

CREATE TABLE IF NOT EXISTS document_chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  chunk_index integer NOT NULL CHECK (chunk_index >= 0),
  content text NOT NULL,
  page_start integer,
  page_end integer,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (document_id, chunk_index)
);

CREATE TABLE IF NOT EXISTS media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  original_filename text NOT NULL,
  storage_key text NOT NULL UNIQUE,
  mime_type text NOT NULL CHECK (mime_type IN ('image/jpeg', 'image/png', 'image/webp')),
  byte_size bigint NOT NULL CHECK (byte_size > 0),
  sha256 text NOT NULL UNIQUE,
  alt_text text NOT NULL DEFAULT '',
  caption text,
  publication_permission_status text NOT NULL DEFAULT 'pending'
    CHECK (publication_permission_status IN ('pending', 'approved', 'withheld')),
  publication_status text NOT NULL DEFAULT 'draft'
    CHECK (publication_status IN ('draft', 'published', 'archived')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS media_publication_idx
  ON media_assets(publication_status, created_at DESC);

CREATE TABLE IF NOT EXISTS content_document_links (
  content_item_id uuid NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
  document_id uuid NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  sort_order integer NOT NULL DEFAULT 0,
  PRIMARY KEY (content_item_id, document_id)
);

CREATE TABLE IF NOT EXISTS content_media_links (
  content_item_id uuid NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
  media_asset_id uuid NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
  sort_order integer NOT NULL DEFAULT 0,
  PRIMARY KEY (content_item_id, media_asset_id)
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  privacy_consent_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  reviewed_at timestamptz,
  reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS contact_submissions_created_idx
  ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS contact_submissions_expiry_idx
  ON contact_submissions(expires_at);

CREATE TABLE IF NOT EXISTS contact_rate_limits (
  bucket_key text PRIMARY KEY,
  window_started_at timestamptz NOT NULL DEFAULT now(),
  submission_count integer NOT NULL DEFAULT 0
);
