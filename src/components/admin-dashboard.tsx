"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ContentType = "notice" | "event" | "faculty" | "programme" | "institutional";
type Status = "draft" | "published" | "archived";
type ContentItem = {
  id: string;
  type: ContentType;
  slug: string;
  title: string;
  payload: Record<string, unknown>;
  publicationStatus: Status;
  sourceReference: string | null;
  verificationStatus: "unverified" | "pending-college-confirmation" | "verified" | "historical" | "unavailable";
  publicationPermissionStatus: "pending" | "approved" | "withheld";
};
type UploadedDocument = {
  id: string;
  title: string;
  originalFilename: string;
  category: string;
  sourceTitle: string | null;
  sourceUrl: string | null;
  publicationStatus: Status;
  extractionStatus: string;
  extractionError: string | null;
  informationStatus: "current" | "historical" | "unverified";
  publicationPermissionStatus: "pending" | "approved" | "withheld";
  documentPeriod: string | null;
};
type MediaAsset = {
  id: string;
  originalFilename: string;
  altText: string;
  caption: string | null;
  publicationStatus: Status;
  publicationPermissionStatus: "pending" | "approved" | "withheld";
};
type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  createdAt: string;
  reviewedAt: string | null;
};

type ContentFieldName = "sourceReference" | "verificationStatus" | "publicationPermissionStatus";
type ContentFieldErrors = Partial<Record<ContentFieldName, string>>;

const contentTypes: ContentType[] = ["notice", "event", "faculty", "programme", "institutional"];
const statuses: Status[] = ["draft", "published", "archived"];

class ApiRequestError extends Error {
  fieldErrors: ContentFieldErrors;

  constructor(message: string, fieldErrors: ContentFieldErrors = {}) {
    super(message);
    this.fieldErrors = fieldErrors;
  }
}

async function apiRequest(url: string, init?: RequestInit) {
  const response = await fetch(url, init);
  const result = await response.json();
  if (!response.ok) {
    const fields: ContentFieldName[] = ["sourceReference", "verificationStatus", "publicationPermissionStatus"];
    const fieldErrors: ContentFieldErrors = {};
    for (const field of fields) {
      if (typeof result.fieldErrors?.[field] === "string") {
        fieldErrors[field] = result.fieldErrors[field];
      }
    }
    throw new ApiRequestError(result.error ?? "The request failed.", fieldErrors);
  }
  return result;
}

async function fetchDashboardData(role: "admin" | "editor") {
  const [content, assets] = await Promise.all([
    apiRequest("/api/admin/content"),
    apiRequest("/api/admin/uploads"),
  ]);
  const enquiries = role === "admin"
    ? (await apiRequest("/api/admin/enquiries")).enquiries
    : [];
  return { items: content.items, documents: assets.documents, media: assets.media, enquiries };
}

export function AdminDashboard({ email, role }: { email: string; role: "admin" | "editor" }) {
  const router = useRouter();
  const [type, setType] = useState<ContentType>("notice");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [error, setError] = useState("");
  const [contentFieldErrors, setContentFieldErrors] = useState<ContentFieldErrors>({});
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const filteredItems = useMemo(() => items.filter((item) => item.type === type), [items, type]);

  function clearContentFieldError(field: ContentFieldName) {
    setContentFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function loadDashboard() {
    try {
      const data = await fetchDashboardData(role);
      setItems(data.items);
      setDocuments(data.documents);
      setMedia(data.media);
      setEnquiries(data.enquiries);
      setError("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Dashboard data could not be loaded.");
    }
  }

  useEffect(() => {
    let active = true;
    fetchDashboardData(role)
      .then((data) => {
        if (!active) return;
        setItems(data.items);
        setDocuments(data.documents);
        setMedia(data.media);
        setEnquiries(data.enquiries);
      })
      .catch((reason: unknown) => {
        if (active) setError(reason instanceof Error ? reason.message : "Dashboard data could not be loaded.");
      });
    return () => {
      active = false;
    };
  }, [role]);

  async function saveContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setContentFieldErrors({});
    setNotice("");
    setBusy(true);
    const form = new FormData(event.currentTarget);
    let payload: Record<string, unknown>;
    try {
      const parsed: unknown = JSON.parse(String(form.get("payload")));
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("Content data must be a JSON object.");
      }
      payload = parsed as Record<string, unknown>;
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Enter valid JSON content data.");
      setBusy(false);
      return;
    }

    try {
      const value = {
        type: form.get("type"),
        slug: form.get("slug"),
        title: form.get("title"),
        payload,
        publicationStatus: role === "admin" ? form.get("publicationStatus") : "draft",
        sourceReference: String(form.get("sourceReference")).trim() || null,
        verificationStatus: role === "admin" ? form.get("verificationStatus") : "unverified",
        publicationPermissionStatus: role === "admin" ? form.get("publicationPermissionStatus") : "pending",
      };
      await apiRequest(selectedItem ? `/api/admin/content/${selectedItem.id}` : "/api/admin/content", {
        method: selectedItem ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });
      setSelectedItem(null);
      setNotice("Content saved.");
      await loadDashboard();
    } catch (reason) {
      if (reason instanceof ApiRequestError && Object.keys(reason.fieldErrors).length) {
        setContentFieldErrors(reason.fieldErrors);
        setError("Publication requirements are not met. Review the highlighted fields.");
      } else {
        setError(reason instanceof Error ? reason.message : "Content could not be saved.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function removeContent(item: ContentItem) {
    if (!window.confirm(`Permanently delete “${item.title}”?`)) return;
    setError("");
    try {
      await apiRequest(`/api/admin/content/${item.id}`, { method: "DELETE" });
      setNotice("Content deleted.");
      await loadDashboard();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Content could not be deleted.");
    }
  }

  async function uploadFile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setBusy(true);
    const formElement = event.currentTarget;
    try {
      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: new FormData(formElement),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Upload failed.");
      setNotice(result.document
        ? `Document uploaded. Text extraction: ${result.document.extractionStatus}${result.document.extractionError ? ` — ${result.document.extractionError}` : ""}.`
        : "Image uploaded.");
      formElement.reset();
      await loadDashboard();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  async function setDocumentStatus(
    document: UploadedDocument,
    publicationStatus: Status,
    informationStatus: UploadedDocument["informationStatus"] = document.informationStatus,
    publicationPermissionStatus: UploadedDocument["publicationPermissionStatus"] = document.publicationPermissionStatus,
  ) {
    try {
      await apiRequest(`/api/admin/documents/${document.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicationStatus, informationStatus, publicationPermissionStatus }),
      });
      await loadDashboard();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Document status could not be updated.");
    }
  }

  async function updateMedia(
    asset: MediaAsset,
    values: Partial<Pick<MediaAsset, "publicationStatus" | "publicationPermissionStatus" | "altText" | "caption">>,
  ): Promise<boolean> {
    try {
      await apiRequest(`/api/admin/media/${asset.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicationStatus: values.publicationStatus ?? asset.publicationStatus,
          publicationPermissionStatus: values.publicationPermissionStatus ?? asset.publicationPermissionStatus,
          altText: values.altText ?? asset.altText,
          caption: "caption" in values ? values.caption ?? null : asset.caption,
        }),
      });
      await loadDashboard();
      return true;
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Image status could not be updated.");
      return false;
    }
  }

  async function saveMediaMetadata(event: FormEvent<HTMLFormElement>, asset: MediaAsset) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const saved = await updateMedia(asset, {
      altText: String(form.get("altText") ?? "").trim(),
      caption: String(form.get("caption") ?? "").trim() || null,
    });
    if (saved) setNotice("Image details saved.");
  }

  async function saveDocumentMetadata(event: FormEvent<HTMLFormElement>, document: UploadedDocument) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await apiRequest(`/api/admin/documents/${document.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicationStatus: document.publicationStatus,
          informationStatus: document.informationStatus,
          publicationPermissionStatus: document.publicationPermissionStatus,
          title: String(form.get("title") ?? "").trim(),
          category: form.get("category"),
          sourceTitle: String(form.get("sourceTitle") ?? "").trim() || null,
          sourceUrl: String(form.get("sourceUrl") ?? "").trim() || null,
          documentPeriod: String(form.get("documentPeriod") ?? "").trim() || null,
        }),
      });
      setNotice("Document details saved.");
      await loadDashboard();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Document details could not be saved.");
    }
  }

  async function deleteMedia(asset: MediaAsset) {
    if (!window.confirm(`Permanently delete “${asset.originalFilename}”?`)) return;
    try {
      await apiRequest(`/api/admin/media/${asset.id}`, { method: "DELETE" });
      await loadDashboard();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Image could not be deleted.");
    }
  }

  async function reviewEnquiry(id: string) {
    try {
      await apiRequest("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await loadDashboard();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Enquiry could not be updated.");
    }
  }

  async function logout() {
    try {
      await apiRequest("/api/auth/logout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Sign-out failed.");
    }
  }

  function edit(item: ContentItem) {
    setSelectedItem(item);
    setType(item.type);
  }

  function updateType(event: ChangeEvent<HTMLSelectElement>) {
    setType(event.target.value as ContentType);
    setSelectedItem(null);
  }

  return (
    <main className="admin-shell" id="main-content">
      <header className="admin-shell__header container">
        <div>
          <p className="page-header__eyebrow">Website administration</p>
          <h1>Content dashboard</h1>
          <p>Signed in as {email} ({role}).</p>
        </div>
        <button className="button button--secondary" type="button" onClick={logout}>Sign out</button>
      </header>
      <div className="container admin-layout">
        {error ? <p className="admin-message admin-message--error" role="alert">{error}</p> : null}
        {notice ? <p className="admin-message admin-message--success" role="status">{notice}</p> : null}
        <section className="admin-panel" aria-labelledby="admin-content-title">
          <h2 id="admin-content-title">Website content</h2>
          <label>
            Content area
            <select onChange={updateType} value={type}>
              {contentTypes.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <form className="admin-form" onSubmit={saveContent}>
            <input name="type" type="hidden" value={type} />
            <label>
              Title
              <input defaultValue={selectedItem?.title ?? ""} key={`${selectedItem?.id ?? "new"}-title`} name="title" required maxLength={200} />
            </label>
            <label>
              Slug
              <input defaultValue={selectedItem?.slug ?? ""} key={`${selectedItem?.id ?? "new"}-slug`} name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" maxLength={160} />
            </label>
            <label>
              Content data (JSON object)
              <textarea
                defaultValue={JSON.stringify(selectedItem?.payload ?? {}, null, 2)}
                key={`${selectedItem?.id ?? "new"}-payload`}
                name="payload"
                required
                rows={7}
              />
            </label>
            <label>
              Source reference (required before publication)
              <input
                aria-describedby={contentFieldErrors.sourceReference ? "content-source-reference-error" : undefined}
                aria-invalid={Boolean(contentFieldErrors.sourceReference)}
                defaultValue={selectedItem?.sourceReference ?? ""}
                key={`${selectedItem?.id ?? "new"}-source`}
                name="sourceReference"
                maxLength={2000}
                onChange={() => clearContentFieldError("sourceReference")}
              />
              {contentFieldErrors.sourceReference
                ? <span className="admin-field-error" id="content-source-reference-error" role="alert">{contentFieldErrors.sourceReference}</span>
                : null}
            </label>
            {role === "admin" ? (
              <>
                <label>
                  Verification status
                  <select
                    aria-describedby={contentFieldErrors.verificationStatus ? "content-verification-status-error" : undefined}
                    aria-invalid={Boolean(contentFieldErrors.verificationStatus)}
                    defaultValue={selectedItem?.verificationStatus ?? "unverified"}
                    key={`${selectedItem?.id ?? "new"}-verification`}
                    name="verificationStatus"
                    onChange={() => clearContentFieldError("verificationStatus")}
                  >
                    {["unverified", "pending-college-confirmation", "verified", "historical", "unavailable"].map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                  {contentFieldErrors.verificationStatus
                    ? <span className="admin-field-error" id="content-verification-status-error" role="alert">{contentFieldErrors.verificationStatus}</span>
                    : null}
                </label>
                <label>
                  Publication permission
                  <select
                    aria-describedby={contentFieldErrors.publicationPermissionStatus ? "content-publication-permission-error" : undefined}
                    aria-invalid={Boolean(contentFieldErrors.publicationPermissionStatus)}
                    defaultValue={selectedItem?.publicationPermissionStatus ?? "pending"}
                    key={`${selectedItem?.id ?? "new"}-permission`}
                    name="publicationPermissionStatus"
                    onChange={() => clearContentFieldError("publicationPermissionStatus")}
                  >
                    {["pending", "approved", "withheld"].map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                  {contentFieldErrors.publicationPermissionStatus
                    ? <span className="admin-field-error" id="content-publication-permission-error" role="alert">{contentFieldErrors.publicationPermissionStatus}</span>
                    : null}
                </label>
                <label>
                  Publication status
                  <select defaultValue={selectedItem?.publicationStatus ?? "draft"} key={`${selectedItem?.id ?? "new"}-status`} name="publicationStatus">
                    {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </label>
              </>
            ) : <p>Editor role: saved as an unverified draft for administrator review.</p>}
            <div className="admin-actions">
              <button className="button button--primary" disabled={busy} type="submit">{selectedItem ? "Save changes" : "Create content"}</button>
              {selectedItem ? <button className="button button--secondary" type="button" onClick={() => setSelectedItem(null)}>Cancel edit</button> : null}
            </div>
          </form>
          <ul className="admin-record-list">
            {filteredItems.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.slug} · {item.publicationStatus}</span>
                </div>
                <div className="admin-actions">
                  {(role === "admin" || (item.publicationStatus === "draft"
                    && item.verificationStatus === "unverified"
                    && item.publicationPermissionStatus === "pending"))
                    ? <button type="button" onClick={() => edit(item)}>Edit</button>
                    : null}
                  {role === "admin" ? <button type="button" onClick={() => void removeContent(item)}>Delete</button> : null}
                </div>
              </li>
            ))}
            {!filteredItems.length ? <li>No records in this category.</li> : null}
          </ul>
        </section>

        <section className="admin-panel" aria-labelledby="admin-assets-title">
          <h2 id="admin-assets-title">Documents and images</h2>
          <p>Uploads are private until published. Exact duplicate files are rejected. Published PDFs are text-extracted for later document search; image-only PDFs are recorded for review.</p>
          <form className="admin-form" onSubmit={uploadFile}>
            <label>
              File
              <input name="file" required type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp" />
            </label>
            <label>Title<input name="title" required maxLength={200} /></label>
            <label>
              Category
              <select name="category" defaultValue="institutional">
                {["academic", "examinations", "notices", "institutional", "student", "other"].map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
            {role === "admin" ? (
              <>
                <label>
                  Information status
                  <select name="informationStatus" defaultValue="unverified">
                    <option value="unverified">Unverified</option>
                    <option value="current">Current</option>
                    <option value="historical">Historical</option>
                  </select>
                </label>
                <label>
                  Publication permission
                  <select name="publicationPermissionStatus" defaultValue="pending">
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="withheld">Withheld</option>
                  </select>
                </label>
              </>
            ) : <p>Editor role: uploads are saved as unverified, unpublished drafts for administrator review.</p>}
            <label>Source title (optional)<input name="sourceTitle" maxLength={200} /></label>
            <label>Source URL (optional)<input name="sourceUrl" type="url" maxLength={2048} /></label>
            <label>Period or academic year (optional)<input name="documentPeriod" maxLength={80} /></label>
            <label>Image alt text (required to publish images)<input name="altText" maxLength={500} /></label>
            <label>Image caption (optional)<input name="caption" maxLength={500} /></label>
            {role === "admin" ? (
              <>
                <label>
                  Publication status
                  <select name="publicationStatus" defaultValue="draft">
                    {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </label>
                <label>Replace existing document ID (optional)<input name="replacesDocumentId" maxLength={36} /></label>
              </>
            ) : null}
            <button className="button button--primary" disabled={busy} type="submit">Upload</button>
          </form>
          <ul className="admin-record-list">
            {documents.map((document) => (
              <li key={document.id}>
                <div>
                  <strong>{document.title}</strong>
                  <span>{document.originalFilename} · {document.extractionStatus} · {document.informationStatus} · {document.publicationPermissionStatus} · {document.publicationStatus}</span>
                  {document.extractionError ? <span>{document.extractionError}</span> : null}
                  {(role === "admin" || (document.publicationStatus === "draft"
                    && document.informationStatus === "unverified"
                    && document.publicationPermissionStatus === "pending")) ? (
                  <form className="admin-form" onSubmit={(event) => void saveDocumentMetadata(event, document)}>
                    <label>Title<input name="title" defaultValue={document.title} required maxLength={200} /></label>
                    <label>
                      Category
                      <select name="category" defaultValue={document.category}>
                        {["academic", "examinations", "notices", "institutional", "student", "other"].map((category) => <option key={category}>{category}</option>)}
                      </select>
                    </label>
                    <label>Source title<input name="sourceTitle" defaultValue={document.sourceTitle ?? ""} maxLength={200} /></label>
                    <label>Source URL<input name="sourceUrl" type="url" defaultValue={document.sourceUrl ?? ""} maxLength={2048} /></label>
                    <label>Period or academic year<input name="documentPeriod" defaultValue={document.documentPeriod ?? ""} maxLength={80} /></label>
                    <button className="button button--secondary" type="submit">Save document details</button>
                  </form>
                  ) : null}
                </div>
                <div className="admin-actions">
                  {document.publicationStatus === "published" ? <a href={`/api/public/documents/${document.id}`}>Open</a> : null}
                  {role === "admin" ? <select
                    aria-label={`Information status for ${document.title}`}
                    value={document.informationStatus}
                    onChange={(event) => void setDocumentStatus(document, document.publicationStatus, event.target.value as UploadedDocument["informationStatus"])}
                  >
                    {["unverified", "current", "historical"].map((status) => <option key={status} value={status}>{status}</option>)}
                  </select> : null}
                  {role === "admin" ? <select
                    aria-label={`Permission for ${document.title}`}
                    value={document.publicationPermissionStatus}
                    onChange={(event) => void setDocumentStatus(document, document.publicationStatus, document.informationStatus, event.target.value as UploadedDocument["publicationPermissionStatus"])}
                  >
                    {["pending", "approved", "withheld"].map((status) => <option key={status} value={status}>{status}</option>)}
                  </select> : null}
                  {role === "admin" ? <select
                    aria-label={`Publication status for ${document.title}`}
                    value={document.publicationStatus}
                    onChange={(event) => void setDocumentStatus(document, event.target.value as Status)}
                  >
                    {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select> : null}
                </div>
              </li>
            ))}
            {!documents.length ? <li>No uploaded PDFs yet.</li> : null}
          </ul>
          <h3>Uploaded images</h3>
          <ul className="admin-record-list">
            {media.map((asset) => (
              <li key={asset.id}>
                <div>
                  <strong>{asset.originalFilename}</strong>
                  <span>{asset.publicationPermissionStatus} · {asset.publicationStatus}</span>
                  {(role === "admin" || (asset.publicationStatus === "draft" && asset.publicationPermissionStatus === "pending")) ? (
                  <form className="admin-form" onSubmit={(event) => void saveMediaMetadata(event, asset)}>
                    <label>Alt text<input name="altText" defaultValue={asset.altText} maxLength={500} /></label>
                    <label>Caption<input name="caption" defaultValue={asset.caption ?? ""} maxLength={500} /></label>
                    <button className="button button--secondary" type="submit">Save image details</button>
                  </form>
                  ) : null}
                </div>
                <div className="admin-actions">
                  {asset.publicationStatus === "published" ? <a href={`/api/public/media/${asset.id}`}>Open</a> : null}
                  {role === "admin" ? <select
                    aria-label={`Permission for ${asset.originalFilename}`}
                    value={asset.publicationPermissionStatus}
                    onChange={(event) => void updateMedia(asset, { publicationPermissionStatus: event.target.value as MediaAsset["publicationPermissionStatus"] })}
                  >
                    {["pending", "approved", "withheld"].map((status) => <option key={status} value={status}>{status}</option>)}
                  </select> : null}
                  {role === "admin" ? <select
                    aria-label={`Publication status for ${asset.originalFilename}`}
                    value={asset.publicationStatus}
                    onChange={(event) => void updateMedia(asset, { publicationStatus: event.target.value as Status })}
                  >
                    {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select> : null}
                  {role === "admin" ? <button type="button" onClick={() => void deleteMedia(asset)}>Delete</button> : null}
                </div>
              </li>
            ))}
            {!media.length ? <li>No uploaded images yet.</li> : null}
          </ul>
        </section>

        {role === "admin" ? (
          <section className="admin-panel" aria-labelledby="admin-enquiries-title">
            <h2 id="admin-enquiries-title">Contact enquiries</h2>
            <p>Enquiries expire under the configured retention period. No email notifications are sent.</p>
            <ul className="admin-record-list">
              {enquiries.map((enquiry) => (
                <li className="admin-enquiry" key={enquiry.id}>
                  <div>
                    <strong>{enquiry.subject}</strong>
                    <span>{enquiry.name} · <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>{enquiry.phone ? ` · ${enquiry.phone}` : ""}</span>
                    <span>{new Date(enquiry.createdAt).toLocaleString()}</span>
                    <p>{enquiry.message}</p>
                  </div>
                  {!enquiry.reviewedAt ? <button type="button" onClick={() => void reviewEnquiry(enquiry.id)}>Mark reviewed</button> : <span>Reviewed</span>}
                </li>
              ))}
              {!enquiries.length ? <li>No enquiries are available.</li> : null}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}
