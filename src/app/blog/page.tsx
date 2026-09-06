import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight, Tag } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { getBlogPosts, getSiteSettings } from '@/lib/payload'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Legal Blog & Updates',
  description: 'Stay updated with legal news, compliance updates, court filing guides and business registration tips from Delhi Filing experts.',
}

const CATEGORY_LABELS: Record<string, string> = {
  'ecourt-filing': 'eCourt Filing',
  'etender-procurement': 'eTender & Procurement',
  'business-incorporation': 'Business Incorporation',
  'annual-compliance': 'Annual Compliance',
  'legal-updates': 'Legal Updates',
  'general': 'General',
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams
  const [posts, settings] = await Promise.all([
    getBlogPosts({ limit: 50, category }).catch(() => []),
    getSiteSettings().catch(() => null),
  ])

  return (
    <Layout settings={settings}>
      <section className="bg-navy py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb crumbs={[{ label: 'Blog' }]} />
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mt-4 mb-2">Legal Blog & Updates</h1>
          <p className="text-white/60">Expert insights on legal, compliance and business topics</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link href="/blog"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${!category ? 'bg-navy text-white' : 'bg-cream text-navy hover:bg-navy hover:text-white'}`}>
            All
          </Link>
          {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
            <Link key={val} href={`/blog?category=${val}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${category === val ? 'bg-navy text-white' : 'bg-cream text-navy hover:bg-navy hover:text-white'}`}>
              {label}
            </Link>
          ))}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">No posts published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(posts as any[]).map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}
                className="group bg-white border border-border rounded-2xl overflow-hidden card-hover">
                {post.featuredImage?.url && (
                  <div className="relative h-48 overflow-hidden">
                    <Image src={post.featuredImage.url} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    {post.category && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                        <Tag size={10} />{CATEGORY_LABELS[post.category] || post.category}
                      </span>
                    )}
                  </div>
                  <h2 className="font-heading font-bold text-navy text-lg mb-2 group-hover:text-gold transition line-clamp-2">{post.title}</h2>
                  <p className="text-text-muted text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><User size={12} />{post.author || 'Delhi Filing Team'}</span>
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                    <ArrowRight size={14} className="text-gold group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
