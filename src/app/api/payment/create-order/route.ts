import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { amount, serviceName, customerName, customerPhone, customerEmail } = await req.json()

    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Payment not configured' }, { status: 503 })
    }

    const Razorpay = (await import('razorpay')).default
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret })

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `df_${Date.now()}`,
      notes: {
        serviceName: serviceName || '',
        customerName: customerName || '',
        customerPhone: customerPhone || '',
        customerEmail: customerEmail || '',
      },
    })

    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency })
  } catch (err) {
    console.error('Razorpay order error:', err)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
