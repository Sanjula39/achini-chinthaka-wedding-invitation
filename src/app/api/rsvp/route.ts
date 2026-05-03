import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import {
  insertRSVPRecord,
  type RSVPResponse,
} from "@/lib/supabase";

/**
 * Server-side env is resolved at runtime on Vercel — avoids client bundles missing NEXT_PUBLIC_* after deploy quirks.
 * Duplicate your dashboard values under SUPABASE_* OR keep using NEXT_PUBLIC_* (both work here).
 */
function getSupabaseCredentials(): { url?: string; key?: string } {
  const url =
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key =
    process.env.SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  return { url, key };
}

export async function POST(request: Request): Promise<NextResponse<RSVPResponse>> {
  const { url, key } = getSupabaseCredentials();

  if (!url || !key) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit RSVP.",
        error:
          "Server missing Supabase credentials. In Vercel → Settings → Environment Variables, add SUPABASE_URL + SUPABASE_ANON_KEY (recommended), or NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Enable “Production”, save, then Redeploy.",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit RSVP.",
        error: "Invalid request body.",
      },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit RSVP.",
        error: "Invalid payload.",
      },
      { status: 400 }
    );
  }

  const o = body as Record<string, unknown>;
  const full_name =
    typeof o.full_name === "string" ? o.full_name.trim() : "";
  const whatsapp_number =
    typeof o.whatsapp_number === "string" ? o.whatsapp_number.trim() : "";
  const attending =
    o.attending === true ||
    o.attending === false
      ? o.attending
      : undefined;

  if (full_name.length < 2 || whatsapp_number.length < 9 || attending === undefined) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit RSVP.",
        error: "Please fill in all fields correctly.",
      },
      { status: 400 }
    );
  }

  const supabase = createClient(url, key);
  const result = await insertRSVPRecord(supabase, {
    full_name,
    whatsapp_number,
    attending,
  });

  const status = result.success ? 200 : 422;
  return NextResponse.json(result, { status });
}
