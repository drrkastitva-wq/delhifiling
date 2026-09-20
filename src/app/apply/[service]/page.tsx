import { Suspense } from 'react'
import ApplyFormClient from './ApplyFormClient'

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f0f0f0' }}>
        <div className="text-[#003366] text-[13px]">Loading...</div>
      </div>
    }>
      <ApplyFormClient />
    </Suspense>
  )
}
