import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getPayloadClient } from '@/lib/payload'

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      serviceName,
      customerName,
      customerPhone,
      customerEmail,
      amount,
    } = await req.json()

    const secret = process.env.RAZORPAY_KEY_SECRET || ''
    const body = `${razorpay_order_id}|${razorpay_payment_id}`
    const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    const payload = await getPayloadClient()

    // Save to Payments collection
    await payload.create({
      collection: 'payments',
      data: {
        customerName: customerName || 'Unknown',
        customerPhone: customerPhone || '',
        customerEmail: customerEmail || '',
        serviceName: serviceName || '',
        amount: Number(amount) || 0,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        status: 'paid',
      },
    })

    // Also create an inquiry so team is notified
    await payload.create({
      collection: 'inquiries',
      data: {
        name: customerName || 'Payment Customer',
        phone: customerPhone || '',
        email: customerEmail || '',
        serviceText: serviceName || '',
        message: `Payment received ₹${amount}. Order: ${razorpay_order_id} | Payment: ${razorpay_payment_id}`,
        status: 'in-progress',
        source: 'payment',
      },
    })

    return NextResponse.json({ success: true, paymentId: razorpay_payment_id })
  } catch (err) {
    console.error('Payment verify error:', err)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
