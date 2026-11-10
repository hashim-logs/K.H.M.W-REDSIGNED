const contentTypes = new Set(["notice", "event", "faculty", "programme", "institutional"]);
const publicationStatuses = new Set(["draft", "published", "archived"]);
const verificationStatuses = new Set(["unverified", "pending-college-confirmation", "verified", "historical", "unavailable"]);
const permissionStatuses = new Set(["pending", "approved", "withheld"]);

export type ContentInput = {
  type: string;
  slug: string;
  title: string;
  payload: Record<string, unknown>;
  publicationStatus: string;
  sourceReference: string | null;
  verificationStatus: string;
  publicationPermissionStatus: string;
};

export type PublicationEligibilityErrors = Partial<Record<
  "sourceReference" | "verificationStatus" | "publicationPermissionStatus",
  string
>>;

export function parseContentInput(body: unknown): ContentInput | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const value = body as Record<string, unknown>;
  if (
    typeof value.type !== "string" || !contentTypes.has(value.type)
    || typeof value.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug)
    || value.slug.length > 160
    || typeof value.title !== "string" || value.title.trim().length < 1 || value.title.trim().length > 200
    || !value.payload || typeof value.payload !== "object" || Array.isArray(value.payload)
    || typeof value.publicationStatus !== "string" || !publicationStatuses.has(value.publicationStatus)
    || typeof value.verificationStatus !== "string" || !verificationStatuses.has(value.verificationStatus)
    || typeof value.publicationPermissionStatus !== "string" || !permissionStatuses.has(value.publicationPermissionStatus)
    || (value.sourceReference !== null && value.sourceReference !== undefined
      && (typeof value.sourceReference !== "string" || value.sourceReference.length > 2000))
  ) return null;
  let serialized: string;
  try {
    serialized = JSON.stringify(value.payload);
  } catch {
    return null;
  }
  if (serialized.length > 100_000) return null;
  const sourceReference = typeof value.sourceReference === "string" ? value.sourceReference.trim() : null;
  return {
    type: value.type,
    slug: value.slug,
    title: value.title.trim(),
    payload: value.payload as Record<string, unknown>,
    publicationStatus: value.publicationStatus,
    sourceReference,
    verificationStatus: value.verificationStatus,
    publicationPermissionStatus: value.publicationPermissionStatus,
  };
}

export function getPublicationEligibilityErrors(input: ContentInput): PublicationEligibilityErrors {
  if (input.publicationStatus !== "published") return {};

  const errors: PublicationEligibilityErrors = {};
  if (!input.sourceReference) errors.sourceReference = "Required before publication.";
  if (!["verified", "historical"].includes(input.verificationStatus)) {
    errors.verificationStatus = "Must be verified or historical.";
  }
  if (input.publicationPermissionStatus !== "approved") {
    errors.publicationPermissionStatus = "Must be approved.";
  }
  return errors;
}
