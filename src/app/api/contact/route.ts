import { NextResponse } from "next/server";

/**
 * ─────────────────────────────────────────────────────────────
 *  CONTACT API — validation is real; delivery is a stub.
 *
 *  This route deliberately does NOT pretend to send email. It validates the
 *  payload and returns 501 "not-configured" until you plug in a provider.
 *  The form shows an honest message (and a mailto fallback) in that case.
 *
 *  To connect delivery, replace `deliver()` below. Example with Resend:
 *
 *    npm i resend
 *    // .env.local
 *    RESEND_API_KEY=re_xxx
 *    CONTACT_TO=you@example.com
 *
 *    import { Resend } from "resend";
 *    async function deliver(p: Payload) {
 *      const resend = new Resend(process.env.RESEND_API_KEY);
 *      await resend.emails.send({
 *        from: "Portfolio <onboarding@resend.dev>",
 *        to: process.env.CONTACT_TO!,
 *        replyTo: p.email,
 *        subject: `[Portfolio] ${p.subject}`,
 *        text: `${p.message}\n\n— ${p.name} <${p.email}>`,
 *      });
 *      return true;
 *    }
 * ─────────────────────────────────────────────────────────────
 */

interface Payload {
  name: string;
  email: string;
  /** Optional. */
  phone: string;
  /** Which service the visitor picked. */
  service: string;
  subject: string;
  message: string;
}

const isConfigured = () => Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO);

async function deliver(_payload: Payload): Promise<boolean> {
  // TODO: implement with your email provider (see comment above).
  void _payload;
  return false;
}

function validate(body: unknown): { ok: true; data: Payload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid payload." };
  const b = body as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const data: Payload = {
    name: str(b.name),
    email: str(b.email),
    phone: str(b.phone),
    service: str(b.service),
    subject: str(b.subject),
    message: str(b.message),
  };
  if (data.name.length < 2 || data.name.length > 80) return { ok: false, error: "Name must be 2–80 characters." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) return { ok: false, error: "Invalid email." };
  if (data.phone && !/^[+\d][\d\s-]{6,18}$/.test(data.phone)) return { ok: false, error: "Invalid phone number." };
  if (data.service.length > 80) return { ok: false, error: "Invalid service." };
  if (data.subject.length < 3 || data.subject.length > 120) return { ok: false, error: "Subject must be 3–120 characters." };
  if (data.message.length < 10 || data.message.length > 2000) return { ok: false, error: "Message must be 10–2000 characters." };
  return { ok: true, data };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) return NextResponse.json({ ok: false, error: result.error }, { status: 422 });

  if (!isConfigured()) {
    return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 501 });
  }

  try {
    const sent = await deliver(result.data);
    if (!sent) return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 501 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return NextResponse.json({ ok: false, error: "Delivery failed." }, { status: 500 });
  }
}
