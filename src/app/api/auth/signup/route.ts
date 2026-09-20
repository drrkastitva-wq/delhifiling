import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone, company } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 })
    }
    const payload = await getPayloadClient()
    const user = await payload.create({
      collection: 'client-users',
      data: { name, email, password, phone, company },
    })
    const login = await payload.login({ collection: 'client-users', data: { email, password } })
    const res = NextResponse.json({ user })
    res.cookies.set('payload-token', login.token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })
    return res
  } catch (err: any) {
    const msg = err?.message?.includes('duplicate') ? 'Email already registered' : 'Signup failed'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
