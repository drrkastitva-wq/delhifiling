import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const ses = new SESClient({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

export async function POST(req: NextRequest) {
  try {
    let name = '', phone = '', email = '', message = '', serviceText = '', category = '', source = '', state = '', city = ''
    const uploadedFiles: string[] = []

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

      const files = fd.getAll('files') as File[]
      if (files.length) {
        const payload = await getPayloadClient()
        for (const file of files) {
          if (!file.size) continue
          const buffer = Buffer.from(await file.arrayBuffer())
          const media = await payload.create({
            collection: 'media',
            data: { alt: `${serviceText || 'Inquiry'} — ${file.name}` },
            file: { data: buffer, mimetype: file.type, name: file.name, size: file.size },
          })
          uploadedFiles.push(String(media.id))
        }
      }
    } else {
      const body = await req.json()
      ;({ name, phone, email, message, serviceText, category, source } = body)
      state = body.state || ''
      city = body.city || ''
    }

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
    }

    const payload = await getPayloadClient()
    await payload.create({
      collection: 'inquiries',
      data: { name, phone, email, message, serviceText, category, state, city, source, status: 'new' },
    })

    const fromEmail = process.env.SES_FROM_EMAIL || 'info@delhifiling.com'
    const toEmail = process.env.LEAD_NOTIFICATION_EMAIL || 'info@delhifiling.com'

    await ses.send(new SendEmailCommand({
      Source: fromEmail,
      Destination: { ToAddresses: [toEmail] },
      Message: {
        Subject: { Data: `New Inquiry — ${serviceText || category || 'General'} — ${name}` },
        Body: {
          Html: {
            Data: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
                <div style="background:#0F1C3F;padding:20px;border-radius:8px 8px 0 0">
                  <h2 style="color:#C9A84C;margin:0">New Inquiry — Delhi Filing</h2>
                </div>
                <div style="background:#f9f9f9;padding:20px;border-radius:0 0 8px 8px">
                  <table style="width:100%;border-collapse:collapse">
                    <tr><td style="padding:8px 0;color:#666;width:140px">Name</td><td style="padding:8px 0;font-weight:bold">${name}</td></tr>
                    <tr><td style="padding:8px 0;color:#666">Phone</td><td style="padding:8px 0;font-weight:bold"><a href="tel:${phone}">${phone}</a></td></tr>
                    ${email ? `<tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0">${email}</td></tr>` : ''}
                    ${serviceText ? `<tr><td style="padding:8px 0;color:#666">Service</td><td style="padding:8px 0">${serviceText}</td></tr>` : ''}
                    ${category ? `<tr><td style="padding:8px 0;color:#666">Category</td><td style="padding:8px 0">${category}</td></tr>` : ''}
                    ${message ? `<tr><td style="padding:8px 0;color:#666">Message</td><td style="padding:8px 0">${message}</td></tr>` : ''}
                    ${uploadedFiles.length ? `<tr><td style="padding:8px 0;color:#666">Documents</td><td style="padding:8px 0">${uploadedFiles.length} file(s) uploaded</td></tr>` : ''}
                    ${source ? `<tr><td style="padding:8px 0;color:#666">Source</td><td style="padding:8px 0;font-size:12px">${source}</td></tr>` : ''}
                  </table>
                  <div style="margin-top:20px;padding:12px;background:#fff3cd;border-radius:6px;font-size:13px">
                    ⚡ Respond within 2 hours for best conversion
                  </div>
                </div>
              </div>
            `,
          },
        },
      },
    })).catch(() => {}) // don't fail if email fails

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Inquiry error:', err)
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 })
  }
}
