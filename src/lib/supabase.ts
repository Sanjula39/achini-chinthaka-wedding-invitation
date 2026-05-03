import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export interface RSVPPayload {
  full_name: string;
  whatsapp_number: string;
  attending: boolean;
  submitted_at?: string;
}

export interface RSVPResponse {
  success: boolean;
  message: string;
  data?: RSVPPayload;
  error?: string;
}

/** Publishable (new) or legacy anon JWT — both work with createClient. */
function getPublicSupabaseKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  );
}

let client: SupabaseClient | null = null;

function getSupabaseBrowser(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = getPublicSupabaseKey();
  if (!url || !key) return null;
  if (!client) client = createClient(url, key);
  return client;
}

/**
 * Submit an RSVP row to Supabase table `rsvps`.
 * Uses insert-only (no `.select()`) so RLS can allow anon INSERT without SELECT.
 */
export async function submitRSVP(
  payload: Omit<RSVPPayload, "submitted_at">
): Promise<RSVPResponse> {
  const supabase = getSupabaseBrowser();
  if (!supabase) {
    return {
      success: false,
      message: "Failed to submit RSVP.",
      error:
        "Missing Supabase env: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY) in .env.local.",
    };
  }

  const submitted_at = new Date().toISOString();
  const row = {
    full_name: payload.full_name,
    whatsapp_number: payload.whatsapp_number,
    attending: payload.attending,
    submitted_at,
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
        error: "We already have an RSVP from this WhatsApp number.",
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

  const record: RSVPPayload = { ...payload, submitted_at };

  return {
    success: true,
    message: payload.attending
      ? "🎉 We're so excited to celebrate with you!"
      : "Thank you for letting us know. We'll miss you!",
    data: record,
  };
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
    .select("full_name, whatsapp_number, attending, submitted_at")
    .order("submitted_at", { ascending: false });

  if (error) {
    console.warn("[RSVP] fetchRSVPs:", error.message);
    return [];
  }

  return (data ?? []) as RSVPPayload[];
}
