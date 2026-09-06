import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import Breadcrumb from '@/components/ui/Breadcrumb'
import InquiryForm from '@/components/ui/InquiryForm'
import RichText from '@/components/ui/RichText'
import { getBlogPostBySlug, getBlogPosts, getSiteSettings } from '@/lib/payload'

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getBlogPosts({ limit: 200 }).catch(() => [])
  return (posts as any[]).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug).catch(() => null)
  if (!post) return {}
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImage?.url ? [post.featuredImage.url] : [],
    },
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  'ecourt-filing': 'eCourt Filing',
  'etender-procurement': 'eTender & Procurement',
  'business-incorporation': 'Business Incorporation',
  'annual-compliance': 'Annual Compliance',
  'legal-updates': 'Legal Updates',
  'general': 'General',
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, settings] = await Promise.all([
    getBlogPostBySlug(params.slug).catch(() => null),
    getSiteSettings().catch(() => null),
  ])
  if (!post) notFound()

  const relatedPosts = await getBlogPosts({ limit: 3, category: post.category }).catch(() => [])
  const related = (relatedPosts as any[]).filter((p) => p.id !== post.id).slice(0, 2)

  return (
    <Layout settings={settings}>
      <section className="bg-navy py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb crumbs={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />
          <div className="flex items-center gap-3 mt-4 mb-4">
            {post.category && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">
                <Tag size={10} />{CATEGORY_LABELS[post.category] || post.category}
              </span>
            )}
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 max-w-3xl">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1.5"><User size={14} />{post.author || 'Delhi Filing Team'}</span>
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10">
        <article className="lg:col-span-2">
          {post.featuredImage?.url && (
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
              <Image src={post.featuredImage.url} alt={post.title} fill className="object-cover" />
            </div>
          )}
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy prose-a:text-gold prose-strong:text-navy">
            <RichText content={post.content} />
          </div>
          <div className="mt-10 pt-6 border-t border-border">
            <Link href="/blog" className="inline-flex items-center gap-2 text-navy font-medium hover:text-gold transition text-sm">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
          </div>

          {related.length > 0 && (
            <div className="mt-10">
              <h3 className="font-heading text-xl font-bold text-navy mb-4">Related Articles</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((p: any) => (
                  <Link key={p.id} href={`/blog/${p.slug}`}
                    className="group bg-cream border border-border rounded-xl p-4 hover:border-navy transition">
                    <h4 className="font-semibold text-navy text-sm group-hover:text-gold transition line-clamp-2">{p.title}</h4>
                    <p className="text-text-muted text-xs mt-1 line-clamp-2">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <InquiryForm />
          </div>
        </aside>
      </div>
    </Layout>
  )
}
