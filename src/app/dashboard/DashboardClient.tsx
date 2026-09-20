'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Upload, FileText, Clock, CheckCircle, AlertCircle, Loader2, User, Phone, Building2 } from 'lucide-react'

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700',
  'in-progress': 'bg-yellow-50 text-yellow-700',
  completed: 'bg-green-50 text-green-700',
  closed: 'bg-gray-100 text-gray-500',
}

export default function DashboardClient({ token }: { token: string }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [inquiries, setInquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploadForm, setUploadForm] = useState({ service: '', notes: '' })
  const [files, setFiles] = useState<FileList | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadMsg, setUploadMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (!d.user) { router.push('/login'); return }
      setUser(d.user)
    })
    fetch('/api/dashboard/inquiries', { headers: { Authorization: `JWT ${token}` } })
      .then(r => r.json()).then(d => { setInquiries(d.inquiries || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [token, router])

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!files?.length) return
    setUploading(true)
    setUploadMsg('')
    const fd = new FormData()
    fd.append('service', uploadForm.service)
    fd.append('notes', uploadForm.notes)
    Array.from(files).forEach(f => fd.append('files', f))
    const res = await fetch('/api/dashboard/upload', { method: 'POST', body: fd })
    setUploading(false)
    if (res.ok) {
      setUploadMsg('Documents uploaded successfully!')
      setUploadForm({ service: '', notes: '' })
      setFiles(null)
      if (fileRef.current) fileRef.current.value = ''
    } else {
      setUploadMsg('Upload failed. Please try again.')
    }
  }

  if (!user) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 size={32} className="animate-spin text-navy" />
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">My Dashboard</h1>
          <p className="text-text-muted text-sm mt-1">Track your services and uploaded documents</p>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-text-muted hover:text-navy hover:border-navy transition">
          <LogOut size={15} /> Sign Out
        </button>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-border p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-navy rounded-full flex items-center justify-center shrink-0">
            <User size={26} className="text-gold" />
          </div>
          <div>
            <div className="font-semibold text-navy text-lg">{user.name}</div>
            <div className="text-text-muted text-sm">{user.email}</div>
            <div className="flex gap-4 mt-1">
              {user.phone && <span className="flex items-center gap-1 text-xs text-text-muted"><Phone size={12} />{user.phone}</span>}
              {user.company && <span className="flex items-center gap-1 text-xs text-text-muted"><Building2 size={12} />{user.company}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Inquiries */}
        <div>
          <h2 className="font-heading text-lg font-bold text-navy mb-4 flex items-center gap-2">
            <FileText size={18} className="text-gold" /> My Inquiries
          </h2>
          {loading ? (
            <div className="flex items-center gap-2 text-text-muted text-sm py-8 justify-center">
              <Loader2 size={18} className="animate-spin" /> Loading...
            </div>
          ) : inquiries.length === 0 ? (
            <div className="bg-cream rounded-xl p-8 text-center border border-border">
              <AlertCircle size={32} className="text-text-muted mx-auto mb-2" />
              <p className="text-text-muted text-sm">No inquiries yet.</p>
              <a href="/contact" className="text-navy text-sm font-semibold hover:text-gold transition mt-2 inline-block">Submit an inquiry →</a>
            </div>
          ) : (
            <div className="space-y-3">
              {inquiries.map((inq: any) => (
                <div key={inq.id} className="bg-white rounded-xl border border-border p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium text-navy text-sm">{inq.serviceText || inq.category || 'General Inquiry'}</div>
                      {inq.message && <p className="text-text-muted text-xs mt-1 line-clamp-2">{inq.message}</p>}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${STATUS_STYLES[inq.status] || STATUS_STYLES.new}`}>
                      {inq.status || 'new'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-text-muted">
                    <Clock size={11} />
                    {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Document Upload */}
        <div>
          <h2 className="font-heading text-lg font-bold text-navy mb-4 flex items-center gap-2">
            <Upload size={18} className="text-gold" /> Upload Documents
          </h2>
          <div className="bg-white rounded-2xl border border-border p-6">
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-navy mb-1.5">Service / Matter</label>
                <input
                  type="text" required
                  value={uploadForm.service}
                  onChange={e => setUploadForm(f => ({ ...f, service: e.target.value }))}
                  placeholder="e.g. Company Registration, Court Filing..."
                  className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-navy transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-navy mb-1.5">Notes (optional)</label>
                <textarea
                  rows={2}
                  value={uploadForm.notes}
                  onChange={e => setUploadForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Any specific instructions..."
                  className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-navy transition resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-navy mb-1.5">Select Files *</label>
                <div
                  className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-navy transition"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload size={24} className="text-text-muted mx-auto mb-2" />
                  <p className="text-sm text-text-muted">
                    {files?.length ? `${files.length} file(s) selected` : 'Click to select files'}
                  </p>
                  <p className="text-xs text-text-muted mt-1">PDF, JPG, PNG, DOC — max 10MB each</p>
                  <input
                    ref={fileRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                    onChange={e => setFiles(e.target.files)}
                  />
                </div>
              </div>
              {uploadMsg && (
                <div className={`flex items-center gap-2 text-sm px-4 py-3 rounded-lg ${uploadMsg.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                  {uploadMsg.includes('success') ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
                  {uploadMsg}
                </div>
              )}
              <button type="submit" disabled={uploading || !files?.length}
                className="w-full py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-dark transition flex items-center justify-center gap-2 disabled:opacity-50">
                {uploading && <Loader2 size={16} className="animate-spin" />}
                {uploading ? 'Uploading...' : 'Upload Documents'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
