import nodemailer from 'nodemailer';

function createTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT ? parseInt(SMTP_PORT, 10) : 587,
    secure: SMTP_PORT === '465',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

const FROM = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@creativetechsolutionbd.com';
const ADMIN_TO = process.env.ADMIN_EMAIL || process.env.SMTP_USER || '';

/** Send OTP for password reset. Silently skips if SMTP not configured. */
export async function sendOtpEmail(to: string, otp: string) {
  const transport = createTransport();
  if (!transport) return;
  await transport.sendMail({
    from: FROM,
    to,
    subject: 'Your password reset code — Creative Tech Solution BD',
    text: `Your one-time password reset code is: ${otp}\n\nIt expires in 10 minutes. If you did not request this, ignore this email.`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
        <h2 style="color:#dc2626">Password Reset Code</h2>
        <p>Use the code below to reset your password. It expires in <strong>10 minutes</strong>.</p>
        <div style="font-size:36px;font-weight:bold;letter-spacing:8px;text-align:center;padding:24px;background:#f3f4f6;border-radius:8px;margin:24px 0">${otp}</div>
        <p style="color:#6b7280;font-size:13px">If you did not request a password reset, you can safely ignore this email.</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
        <p style="color:#9ca3af;font-size:12px">Creative Tech Solution BD</p>
      </div>`,
  });
}

/** Notify admin of a new booking. Silently skips if SMTP not configured. */
export async function sendBookingNotification(data: {
  service: string; name: string; email: string; phone: string;
  date?: string; time?: string; details?: string;
}) {
  const transport = createTransport();
  if (!transport || !ADMIN_TO) return;
  const rows = [
    ['Service', data.service],
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ...(data.date ? [['Date', data.date] as [string, string]] : []),
    ...(data.time ? [['Time', data.time] as [string, string]] : []),
    ...(data.details ? [['Details', data.details] as [string, string]] : []),
  ];
  const tableRows = rows.map(([k, v]) =>
    `<tr><td style="padding:6px 12px;color:#6b7280;font-weight:500;white-space:nowrap">${k}</td><td style="padding:6px 12px;color:#111827">${v}</td></tr>`
  ).join('');
  await transport.sendMail({
    from: FROM,
    to: ADMIN_TO,
    subject: `New Booking: ${data.service} — ${data.name}`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
    html: `
      <div style="font-family:sans-serif;max-width:540px;margin:0 auto;padding:24px">
        <h2 style="color:#dc2626">New Booking Request</h2>
        <table style="border-collapse:collapse;width:100%;background:#f9fafb;border-radius:8px;overflow:hidden">
          ${tableRows}
        </table>
        <p style="margin-top:24px"><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/admin/bookings" style="background:#dc2626;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold">View in Admin</a></p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
        <p style="color:#9ca3af;font-size:12px">Creative Tech Solution BD</p>
      </div>`,
  });
}

/** Notify admin of a new contact message. Silently skips if SMTP not configured. */
export async function sendContactNotification(data: {
  name: string; email: string; subject?: string; message: string;
}) {
  const transport = createTransport();
  if (!transport || !ADMIN_TO) return;
  await transport.sendMail({
    from: FROM,
    to: ADMIN_TO,
    subject: `New Contact: ${data.subject ?? 'No subject'} — ${data.name}`,
    text: `From: ${data.name} <${data.email}>\nSubject: ${data.subject ?? ''}\n\n${data.message}`,
    html: `
      <div style="font-family:sans-serif;max-width:540px;margin:0 auto;padding:24px">
        <h2 style="color:#dc2626">New Contact Message</h2>
        <table style="border-collapse:collapse;width:100%;background:#f9fafb;border-radius:8px;overflow:hidden">
          <tr><td style="padding:6px 12px;color:#6b7280;font-weight:500">From</td><td style="padding:6px 12px;color:#111827">${data.name} &lt;${data.email}&gt;</td></tr>
          ${data.subject ? `<tr><td style="padding:6px 12px;color:#6b7280;font-weight:500">Subject</td><td style="padding:6px 12px;color:#111827">${data.subject}</td></tr>` : ''}
        </table>
        <div style="margin:16px 0;padding:16px;background:#f9fafb;border-left:3px solid #dc2626;border-radius:0 8px 8px 0;white-space:pre-wrap;color:#374151">${data.message}</div>
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/admin/contacts" style="background:#dc2626;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold">View in Admin</a></p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
        <p style="color:#9ca3af;font-size:12px">Creative Tech Solution BD</p>
      </div>`,
  });
}
