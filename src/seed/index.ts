import { getPayload } from 'payload'
import config from '../../payload.config'
import { CATEGORIES, ECOURT_SUBCATEGORIES, ETENDER_SUBCATEGORIES, INCORPORATION_SUBCATEGORIES, COMPLIANCE_SUBCATEGORIES } from './categories'
import { ECOURT_SERVICES } from './ecourt-services'
import { ETENDER_SERVICES, INCORPORATION_SERVICES } from './incorporation-services'
import { COMPLIANCE_SERVICES } from './compliance-services'

async function seed() {
  const payload = await getPayload({ config })
  console.log('🌱 Starting seed...')

  // 1. Seed Categories
  console.log('📁 Seeding categories...')
  const categoryMap: Record<string, string> = {}
  for (const cat of CATEGORIES) {
    const existing = await payload.find({ collection: 'categories', where: { slug: { equals: cat.slug } }, limit: 1 })
    if (existing.docs.length === 0) {
      const created = await payload.create({ collection: 'categories', data: { ...cat, active: true } })
      categoryMap[cat.slug] = created.id
      console.log(`  ✅ Category: ${cat.name}`)
    } else {
      categoryMap[cat.slug] = existing.docs[0].id
      console.log(`  ⏭️  Category exists: ${cat.name}`)
    }
  }

  // 2. Seed Subcategories
  console.log('📂 Seeding subcategories...')
  const subcategoryMap: Record<string, string> = {}

  const allSubcategories = [
    ...ECOURT_SUBCATEGORIES.map(s => ({ ...s, categorySlug: 'ecourt-filing' })),
    ...ETENDER_SUBCATEGORIES.map(s => ({ ...s, categorySlug: 'etender-procurement' })),
    ...INCORPORATION_SUBCATEGORIES.map(s => ({ ...s, categorySlug: 'business-incorporation' })),
    ...COMPLIANCE_SUBCATEGORIES.map(s => ({ ...s, categorySlug: 'annual-compliance' })),
  ]

  for (const sub of allSubcategories) {
    const existing = await payload.find({ collection: 'subcategories', where: { slug: { equals: sub.slug } }, limit: 1 })
    if (existing.docs.length === 0) {
      const created = await payload.create({
        collection: 'subcategories',
        data: { name: sub.name, slug: sub.slug, order: sub.order, category: categoryMap[sub.categorySlug], active: true },
      })
      subcategoryMap[sub.slug] = created.id
      console.log(`  ✅ Subcategory: ${sub.name}`)
    } else {
      subcategoryMap[sub.slug] = existing.docs[0].id
    }
  }

  // 3. Seed Master Services + Mappings
  console.log('🔧 Seeding services...')
  const allServices = [...ECOURT_SERVICES, ...ETENDER_SERVICES, ...INCORPORATION_SERVICES, ...COMPLIANCE_SERVICES]

  for (const svc of allServices) {
    let serviceId: string
    const existing = await payload.find({ collection: 'services', where: { slug: { equals: svc.slug } }, limit: 1 })

    if (existing.docs.length === 0) {
      const created = await payload.create({
        collection: 'services',
        data: {
          name: svc.name,
          slug: svc.slug,
          shortDescription: svc.shortDescription,
          timeline: svc.timeline,
          professionalFee: svc.professionalFee,
          active: true,
          whoNeedsIt: '',
          documentsRequired: [],
          process: [],
          faqs: [],
        },
      })
      serviceId = created.id
      console.log(`  ✅ Service: ${svc.name}`)
    } else {
      serviceId = existing.docs[0].id
    }

    // Create mappings
    for (const subSlug of svc.subcategories) {
      const subId = subcategoryMap[subSlug]
      if (!subId) { console.warn(`  ⚠️  Subcategory not found: ${subSlug}`); continue }
      const existingMapping = await payload.find({
        collection: 'service-mappings',
        where: { service: { equals: serviceId }, subcategory: { equals: subId } },
        limit: 1,
      })
      if (existingMapping.docs.length === 0) {
        await payload.create({ collection: 'service-mappings', data: { service: serviceId, subcategory: subId, order: 0 } })
      }
    }
  }

  // 4. Seed default Stats
  console.log('📊 Seeding stats...')
  const stats = [
    { value: '500+', label: 'Services Offered', icon: 'Scale', order: 1 },
    { value: '10,000+', label: 'Cases Filed', icon: 'FileText', order: 2 },
    { value: '5,000+', label: 'Companies Incorporated', icon: 'Building2', order: 3 },
    { value: '15+', label: 'Years Experience', icon: 'ClipboardCheck', order: 4 },
  ]
  for (const stat of stats) {
    const existing = await payload.find({ collection: 'stats', where: { label: { equals: stat.label } }, limit: 1 })
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'stats', data: { ...stat, active: true } })
    }
  }

  // 5. Seed default Trust Points
  console.log('🛡️  Seeding trust points...')
  const trustPoints = [
    { title: 'Expert Professionals', description: 'Qualified advocates, CAs and compliance experts with years of domain experience.', icon: 'Award', order: 1 },
    { title: 'Fast Turnaround', description: 'We understand deadlines. Most services delivered within committed timelines.', icon: 'Clock', order: 2 },
    { title: '100% Confidential', description: 'Your documents and information are handled with complete confidentiality.', icon: 'Shield', order: 3 },
    { title: 'End-to-End Support', description: 'From documentation to filing to follow-up — we handle everything.', icon: 'FileCheck', order: 4 },
    { title: 'Dedicated Account Manager', description: 'A single point of contact for all your legal and compliance needs.', icon: 'Users', order: 5 },
    { title: 'Always Reachable', description: 'Call, WhatsApp or email — our team responds within 2 hours.', icon: 'Phone', order: 6 },
  ]
  for (const tp of trustPoints) {
    const existing = await payload.find({ collection: 'trust-points', where: { title: { equals: tp.title } }, limit: 1 })
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'trust-points', data: { ...tp, active: true } })
    }
  }

  // 6. Seed default Hero Banner
  console.log('🎨 Seeding hero banner...')
  const heroBanners = await payload.find({ collection: 'hero-banners', limit: 1 })
  if (heroBanners.docs.length === 0) {
    await payload.create({
      collection: 'hero-banners',
      data: {
        heading: 'Professional Legal & Compliance Services',
        subheading: 'eCourt Filing • eTender & Procurement • Business Incorporation • Annual Compliance — Expert-led, end-to-end services for businesses, advocates and individuals.',
        ctaPrimaryText: 'Get Free Consultation',
        ctaPrimaryLink: '/contact',
        ctaSecondaryText: 'Explore Services',
        ctaSecondaryLink: '/#services',
        order: 1,
        active: true,
      },
    })
  }

  // 7. Seed admin user
  console.log('👤 Seeding admin user...')
  const adminUsers = await payload.find({ collection: 'users', limit: 1 })
  if (adminUsers.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: { name: 'Admin', email: 'admin@delhifiling.com', password: 'ChangeMe@2025', role: 'admin' },
    })
    console.log('  ✅ Admin user created: admin@delhifiling.com / ChangeMe@2025')
  }

  console.log('\n✅ Seed complete!')
  process.exit(0)
}

seed().catch(err => { console.error('❌ Seed failed:', err); process.exit(1) })
