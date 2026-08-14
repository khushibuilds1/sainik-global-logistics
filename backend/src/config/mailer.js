const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use Gmail App Password
  },
})

const brandBlock = `
  <div style="background:linear-gradient(135deg,#F0064F,#8B0030);padding:16px 24px;border-radius:8px 8px 0 0;text-align:center;">
    <span style="font-family:Arial,sans-serif;font-weight:900;font-size:18px;color:#fff;letter-spacing:3px;">SAINIK GLOBAL LOGISTICS</span><br/>
    <span style="font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.6);letter-spacing:2px;">PRIVATE LIMITED</span>
  </div>
`

const footerBlock = `
  <div style="padding:16px 24px;border-top:1px solid rgba(240,6,79,0.2);text-align:center;margin-top:24px;">
    <p style="font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.3);margin:0;">
      GSTIN: 24ABTCS1582J1ZT &nbsp;|&nbsp; +91 7600951298 &nbsp;|&nbsp; sales@sainikglobal.com
    </p>
  </div>
`

const wrapHtml = (content) => `
  <div style="background:#0B0F14;max-width:620px;margin:0 auto;border:1px solid rgba(240,6,79,0.25);border-radius:10px;overflow:hidden;">
    ${brandBlock}
    <div style="padding:28px 28px 8px;">
      ${content}
    </div>
    ${footerBlock}
  </div>
`

const row = (label, value) => `
  <tr>
    <td style="padding:7px 12px;background:rgba(255,255,255,0.03);color:rgba(255,255,255,0.45);font-family:Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:1px;width:38%;border-bottom:1px solid rgba(255,255,255,0.04);">${label}</td>
    <td style="padding:7px 12px;color:#fff;font-family:Arial,sans-serif;font-size:13px;border-bottom:1px solid rgba(255,255,255,0.04);">${value || '—'}</td>
  </tr>
`

const sendQuoteNotification = async (q) => {
  const content = `
    <h2 style="font-family:Arial,sans-serif;color:#F0064F;font-size:18px;margin:0 0 20px;">📦 New Quote Request</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
      ${row('Company', q.company)}
      ${row('Contact', q.name)}
      ${row('Email', q.email)}
      ${row('Phone', q.phone)}
      ${row('Service', q.serviceType)}
      ${row('Origin', q.origin)}
      ${row('Destination', q.destination)}
      ${row('Incoterm', q.incoterm)}
      ${row('Cargo Type', q.cargoType)}
      ${row('Weight', q.weight ? q.weight + ' kg' : null)}
      ${row('Volume', q.volume ? q.volume + ' CBM' : null)}
      ${row('Ready Date', q.readyDate)}
    </table>
    ${q.additionalInfo ? `<div style="background:rgba(240,6,79,0.06);border-left:3px solid #F0064F;padding:12px 16px;border-radius:0 4px 4px 0;"><p style="font-family:Arial,sans-serif;color:rgba(255,255,255,0.6);font-size:13px;margin:0;white-space:pre-wrap;">${q.additionalInfo}</p></div>` : ''}
  `
  await transporter.sendMail({
    from: `"Sainik Global Website" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL || 'sales@sainikglobal.com',
    subject: `New Quote — ${q.serviceType} | ${q.company || q.name}`,
    html: wrapHtml(content),
  })
}

const sendContactNotification = async (c) => {
  const content = `
    <h2 style="font-family:Arial,sans-serif;color:#F0064F;font-size:18px;margin:0 0 20px;">✉️ New Website Inquiry</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
      ${row('Name', c.name)}
      ${row('Email', c.email)}
      ${row('Phone', c.phone)}
      ${row('Subject', c.subject)}
    </table>
    <div style="background:rgba(255,255,255,0.03);border-left:3px solid #F0064F;padding:12px 16px;border-radius:0 4px 4px 0;">
      <p style="font-family:Arial,sans-serif;color:rgba(255,255,255,0.7);font-size:13px;margin:0;white-space:pre-wrap;">${c.message}</p>
    </div>
  `
  await transporter.sendMail({
    from: `"Sainik Global Website" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL || 'sales@sainikglobal.com',
    subject: `Website Inquiry: ${c.subject}`,
    html: wrapHtml(content),
  })
}

// Auto-reply to client after quote submission
const sendQuoteAutoReply = async (q) => {
  const content = `
    <h2 style="font-family:Arial,sans-serif;color:#F0064F;font-size:18px;margin:0 0 16px;">Thank you, ${q.name}!</h2>
    <p style="font-family:Arial,sans-serif;color:rgba(255,255,255,0.7);font-size:14px;line-height:1.6;margin:0 0 16px;">
      We've received your freight quote request for <strong style="color:#fff;">${q.serviceType}</strong> from <strong style="color:#fff;">${q.origin}</strong> to <strong style="color:#fff;">${q.destination}</strong>.
    </p>
    <p style="font-family:Arial,sans-serif;color:rgba(255,255,255,0.7);font-size:14px;line-height:1.6;margin:0 0 20px;">
      Our logistics team will review your requirements and send you a competitive quote within <strong style="color:#F0064F;">2 business hours</strong>.
    </p>
    <div style="background:rgba(240,6,79,0.06);border:1px solid rgba(240,6,79,0.2);border-radius:8px;padding:16px;margin-bottom:16px;">
      <p style="font-family:Arial,sans-serif;color:rgba(255,255,255,0.5);font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px;">Need immediate assistance?</p>
      <a href="tel:+917600951298" style="font-family:Arial,sans-serif;color:#F0064F;font-size:14px;text-decoration:none;font-weight:bold;">📞 +91 7600951298</a>
    </div>
  `
  await transporter.sendMail({
    from: `"Sainik Global Logistics" <${process.env.EMAIL_USER}>`,
    to: q.email,
    subject: `Quote Request Received — ${q.serviceType} | Sainik Global Logistics`,
    html: wrapHtml(content),
  })
}

module.exports = { sendQuoteNotification, sendContactNotification, sendQuoteAutoReply }
