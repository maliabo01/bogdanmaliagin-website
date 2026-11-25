const recipient = 'bogdan.maliagin@gmail.com';
const emailPattern = /^[^\s@<>,]+@[^\s@<>,]+\.[^\s@<>,]+$/;

export async function POST(request) {
  const contentType = request.headers.get('content-type')?.split(';')[0];
  if (request.headers.get('origin') !== new URL(request.url).origin || contentType !== 'application/json') {
    return new Response(null, { status: 403 });
  }

  let inquiry;
  try {
    const body = await request.text();
    if (body.length > 30_000) return new Response(null, { status: 413 });
    inquiry = JSON.parse(body);
  } catch {
    return new Response(null, { status: 400 });
  }

  const { name, email, type, message } = inquiry ?? {};
  if (typeof name !== 'string' || !name.trim() || name.length > 150 ||
      typeof email !== 'string' || email.length > 254 || !emailPattern.test(email) ||
      typeof type !== 'string' || type.length > 100 ||
      typeof message !== 'string' || !message.trim() || message.length > 5000) {
    return new Response(null, { status: 400 });
  }

  const { RESEND_API_KEY: apiKey, INQUIRY_FROM_EMAIL: sender } = process.env;
  if (!apiKey || !sender) return new Response(null, { status: 503 });

  try {
    const delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: 'New photography inquiry',
        text: `Name: ${name.trim()}\nEmail: ${email}\nType of shoot: ${type.trim() || 'Unspecified'}\n\n${message.trim()}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (delivery.ok) return new Response(null, { status: 204 });
    console.error('Inquiry email rejected', delivery.status);
  } catch {
    console.error('Inquiry email request failed');
  }
  return new Response(null, { status: 502 });
}
