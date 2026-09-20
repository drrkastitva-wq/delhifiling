import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const path = req.nextUrl.searchParams.get('path') || '/'
  if (secret !== (process.env.REVALIDATE_SECRET || 'df-revalidate-2025'))
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  revalidatePath(path)
  return NextResponse.json({ revalidated: true, path })
}
