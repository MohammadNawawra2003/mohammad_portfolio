import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

/**
 * Contact handler. Sends via Resend when configured; otherwise responds with
 * `fallback: true` so the client opens a mailto: link. The honeypot field
 * silently drops bot submissions.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 422 },
    );
  }

  const { name, email, message, company } = parsed.data;

  // Honeypot tripped — pretend success, do nothing.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  // No provider configured → tell the client to fall back to mailto.
  if (!apiKey || !to) {
    return NextResponse.json({ ok: true, fallback: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio enquiry from ${name}`,
      text: `${message}\n\n— ${name} (${email})`,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: "Could not send right now." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not send right now." }, { status: 500 });
  }
}
