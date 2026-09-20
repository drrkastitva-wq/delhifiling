import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getSiteSettings } from '@/lib/payload'
import Layout from '@/components/layout/Layout'
import DashboardClient from './DashboardClient'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value
  if (!token) redirect('/login')

  const settings = await getSiteSettings().catch(() => null)

  return (
    <Layout settings={settings}>
      <DashboardClient token={token} />
    </Layout>
  )
}
