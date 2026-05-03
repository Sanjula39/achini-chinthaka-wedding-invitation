import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Row shape returned from DB / API (anonymous RSVP uses null name & phone). */
export interface RSVPPayload {
  attending: boolean;
  submitted_at?: string;
  guest_count?: number | null;
  full_name?: string | null;
  whatsapp_number?: string | null;
}

/** Body sent from the site — `guest_count` 1–10 when accepting; null when declining. */
export type RSVPSubmitBody = {
  attending: boolean;
  guest_count?: number | null;
  full_name?: string | null;
  whatsapp_number?: string | null;
};

export interface RSVPResponse {
  success: boolean;
  message: string;
  data?: RSVPPayload;
  error?: string;
}

/** Publishable (new) or legacy anon JWT — browser helpers only */
function getPublicSupabaseKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  );
}

let browserClient: SupabaseClient | null = null;

function getSupabaseBrowser(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = getPublicSupabaseKey();
  if (!url || !key) return null;
  if (!browserClient) browserClient = createClient(url, key);
  return browserClient;
}

/**
 * Shared insert logic — used by POST /api/rsvp (production) and tests.
 */
export async function insertRSVPRecord(
  supabase: SupabaseClient,
  payload: RSVPSubmitBody
): Promise<RSVPResponse> {
  const submitted_at = new Date().toISOString();
  const guest_count =
    payload.attending &&
    payload.guest_count != null &&
    payload.guest_count >= 1 &&
    payload.guest_count <= 10
      ? payload.guest_count
      : null;

  const row = {
    attending: payload.attending,
    guest_count,
    submitted_at,
    full_name:
      payload.full_name !== undefined && payload.full_name !== ""
        ? payload.full_name
        : null,
    whatsapp_number:
      payload.whatsapp_number !== undefined &&
      payload.whatsapp_number !== ""
        ? payload.whatsapp_number
        : null,
  };

  const { error } = await supabase.from("rsvps").insert(row);

  if (error) {
    const msg = error.message ?? "";
    const duplicate =
      error.code === "23505" || /duplicate|unique/i.test(msg);
    if (duplicate) {
      return {
        success: false,
        message: "Failed to submit RSVP.",
        error: "This response couldn’t be recorded (duplicate). Please try again.",
      };
    }

    const rls =
      error.code === "42501" ||
      /row-level security|permission denied|RLS/i.test(msg);
    const missingTable =
      error.code === "42P01" ||
      /relation ["']rsvps["'] does not exist/i.test(msg);

    let hint = msg || "Please try again.";
    if (missingTable) {
      hint =
        'Table "rsvps" not found. Run the CREATE TABLE SQL in Supabase (SQL Editor).';
    } else if (rls) {
      hint =
        "Database blocked this insert (RLS). In Supabase → SQL Editor, add an INSERT policy for role anon on public.rsvps, or temporarily disable RLS while testing.";
    }

    return {
      success: false,
      message: "Failed to submit RSVP.",
      error: hint,
    };
  }

  const record: RSVPPayload = {
    attending: payload.attending,
    guest_count: row.guest_count,
    full_name: row.full_name,
    whatsapp_number: row.whatsapp_number,
    submitted_at,
  };

  const acceptMsg =
    guest_count != null && guest_count > 1
      ? `🎉 We're delighted to welcome your party of ${guest_count}!`
      : "🎉 We're so excited to celebrate with you!";

  return {
    success: true,
    message: payload.attending ? acceptMsg : "Thank you for letting us know. We'll miss you!",
    data: record,
  };
}

/**
 * Submit RSVP via API route — reads Supabase env on the server (works reliably on Vercel).
 */
export async function submitRSVP(payload: RSVPSubmitBody): Promise<RSVPResponse> {
  try {
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data: RSVPResponse;
    try {
      data = (await res.json()) as RSVPResponse;
    } catch {
      return {
        success: false,
        message: "Failed to submit RSVP.",
        error: "Unexpected server response. Please try again.",
      };
    }

    if (!data || typeof data.success !== "boolean") {
      return {
        success: false,
        message: "Failed to submit RSVP.",
        error: `Server error (${res.status}). Please try again.`,
      };
    }

    return data;
  } catch {
    return {
      success: false,
      message: "Failed to submit RSVP.",
      error: "Network error. Please check your connection.",
    };
  }
}

/**
 * Listing RSVPs needs a SELECT policy for anon or a server route using the service role.
 * Returns [] if the client is missing or the query is denied.
 */
export async function fetchRSVPs(): Promise<RSVPPayload[]> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("rsvps")
    .select("full_name, whatsapp_number, attending, guest_count, submitted_at")
    .order("submitted_at", { ascending: false });

  if (error) {
    console.warn("[RSVP] fetchRSVPs:", error.message);
    return [];
  }

  return (data ?? []) as RSVPPayload[];
}
