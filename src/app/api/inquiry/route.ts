import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.in',
  port: 465,
  secure: true,
  auth: {
    user: 'admin@delhifiling.com',
    pass: 'P3duiaiTQEB6',
  },
})

export async function POST(req: NextRequest) {
  try {
    let name = '', phone = '', email = '', message = '', serviceText = '', category = '', source = '', state = '', city = ''

    const contentType = req.headers.get('content-type') || ''
    if (contentType.includes('multipart/form-data')) {
      const fd = await req.formData()
      name = fd.get('name') as string || ''
      phone = fd.get('phone') as string || ''
      email = fd.get('email') as string || ''
      message = fd.get('message') as string || ''
      serviceText = fd.get('serviceText') as string || ''
      category = fd.get('category') as string || ''
      source = fd.get('source') as string || ''
      state = fd.get('state') as string || ''
      city = fd.get('city') as string || ''
    } else {
      const body = await req.json()
      ;({ name, phone, email, message, serviceText, category, source } = body)
      state = body.state || ''
      city = body.city || ''
    }

    if (!name || !phone) return NextResponse.json({ error: 'Name and phone required' }, { status: 400 })

    const payload = await getPayloadClient()
    await payload.create({
      collection: 'inquiries',
      data: { name, phone, email, message, serviceText, category, state, city, source, status: 'new' },
    })

    const subject = `New Inquiry — ${serviceText || category || 'General'} — ${name}`
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #ddd">
        <div style="background:#003366;padding:18px 24px;border-bottom:4px solid #16a34a">
          <h2 style="color:#FFD700;margin:0;font-size:18px">New Inquiry — Delhi Filing</h2>
          <p style="color:#90EE90;margin:4px 0 0;font-size:12px">${serviceText || category || 'General Inquiry'}</p>
        </div>
        <div style="padding:24px;background:#f9f9f9">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <tr style="background:#fff"><td style="padding:10px 12px;color:#666;width:130px;border-bottom:1px solid #eee">Name</td><td style="padding:10px 12px;font-weight:bold;border-bottom:1px solid #eee">${name}</td></tr>
            <tr><td style="padding:10px 12px;color:#666;border-bottom:1px solid #eee">Phone</td><td style="padding:10px 12px;border-bottom:1px solid #eee"><a href="tel:${phone}" style="color:#003366;font-weight:bold">${phone}</a></td></tr>
            ${email ? `<tr style="background:#fff"><td style="padding:10px 12px;color:#666;border-bottom:1px solid #eee">Email</td><td style="padding:10px 12px;border-bottom:1px solid #eee">${email}</td></tr>` : ''}
            ${serviceText ? `<tr><td style="padding:10px 12px;color:#666;border-bottom:1px solid #eee">Service</td><td style="padding:10px 12px;border-bottom:1px solid #eee">${serviceText}</td></tr>` : ''}
            ${category ? `<tr style="background:#fff"><td style="padding:10px 12px;color:#666;border-bottom:1px solid #eee">Category</td><td style="padding:10px 12px;border-bottom:1px solid #eee">${category}</td></tr>` : ''}
            ${state || city ? `<tr><td style="padding:10px 12px;color:#666;border-bottom:1px solid #eee">Location</td><td style="padding:10px 12px;border-bottom:1px solid #eee">${[city, state].filter(Boolean).join(', ')}</td></tr>` : ''}
            ${message ? `<tr style="background:#fff"><td style="padding:10px 12px;color:#666;border-bottom:1px solid #eee;vertical-align:top">Message</td><td style="padding:10px 12px;border-bottom:1px solid #eee">${message}</td></tr>` : ''}
          </table>
          <div style="margin-top:20px;padding:14px 16px;background:#e8f5e9;border-left:4px solid #16a34a;border-radius:0 4px 4px 0;font-size:13px;color:#1a5c1a">
            ⚡ <strong>Action Required:</strong> Respond within 2 hours for best conversion rate.
          </div>
          <div style="margin-top:12px;font-size:11px;color:#999">Source: ${source || 'Website'}</div>
        </div>
      </div>`

    await transporter.sendMail({
      from: '"Delhi Filing" <admin@delhifiling.com>',
      to: 'admin@delhifiling.com',
      subject,
      html,
    }).catch(e => console.error('Email error:', e))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Inquiry error:', err)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
