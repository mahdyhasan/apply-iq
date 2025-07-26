import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample templates for Bangladesh job market
  const templates = await Promise.all([
    prisma.template.create({
      data: {
        name: 'Professional Bangladesh',
        category: 'Corporate',
        previewUrl: '/templates/professional-bd-preview.png',
        fileUrl: '/templates/professional-bd.pdf',
      },
    }),
    prisma.template.create({
      data: {
        name: 'Tech Modern',
        category: 'Technology',
        previewUrl: '/templates/tech-modern-preview.png',
        fileUrl: '/templates/tech-modern.pdf',
      },
    }),
    prisma.template.create({
      data: {
        name: 'Banking Executive',
        category: 'Finance',
        previewUrl: '/templates/banking-exec-preview.png',
        fileUrl: '/templates/banking-exec.pdf',
      },
    }),
    prisma.template.create({
      data: {
        name: 'Creative Designer',
        category: 'Creative',
        previewUrl: '/templates/creative-designer-preview.png',
        fileUrl: '/templates/creative-designer.pdf',
      },
    }),
  ])

  // Create sample company insights for major Bangladesh companies
  const companies = await Promise.all([
    prisma.companyInsight.create({
      data: {
        companyName: 'BRAC Bank',
        employeeSize: '5000+',
        cultureSummary: 'Leading financial institution in Bangladesh with strong emphasis on digital banking and customer service. Known for professional development opportunities.',
        layoffInfo: 'No recent layoffs. Stable employment with growth trajectory.',
        recentHiringNews: 'Actively hiring for digital banking positions and customer service roles. Focus on tech talent.',
        mediaLinks: JSON.stringify([
          { type: 'linkedin', url: 'https://linkedin.com/company/brac-bank' },
          { type: 'website', url: 'https://bracbank.com' }
        ]),
        friendlinessScore: 4.2,
        aiRating: 'Excellent workplace culture with strong employee satisfaction',
      },
    }),
    prisma.companyInsight.create({
      data: {
        companyName: 'Grameenphone',
        employeeSize: '3000+',
        cultureSummary: 'Largest telecom operator in Bangladesh. Progressive work environment with focus on innovation and technology.',
        layoffInfo: 'Some restructuring in 2023 but overall stable employment.',
        recentHiringNews: 'Expanding digital services team. Looking for software engineers and data scientists.',
        mediaLinks: JSON.stringify([
          { type: 'linkedin', url: 'https://linkedin.com/company/grameenphone' },
          { type: 'website', url: 'https://grameenphone.com' }
        ]),
        friendlinessScore: 4.0,
        aiRating: 'Good work-life balance with competitive benefits',
      },
    }),
    prisma.companyInsight.create({
      data: {
        companyName: 'Pathao',
        employeeSize: '2000+',
        cultureSummary: 'Fast-growing tech startup focused on logistics and ride-sharing. Dynamic and entrepreneurial culture.',
        layoffInfo: 'Minor workforce adjustments in 2023 to optimize operations.',
        recentHiringNews: 'Aggressively hiring tech talent for expansion. Multiple openings in engineering and product.',
        mediaLinks: JSON.stringify([
          { type: 'linkedin', url: 'https://linkedin.com/company/pathao' },
          { type: 'website', url: 'https://pathao.com' }
        ]),
        friendlinessScore: 4.1,
        aiRating: 'Innovative environment with high growth potential',
      },
    }),
    prisma.companyInsight.create({
      data: {
        companyName: 'Daraz Bangladesh',
        employeeSize: '1000+',
        cultureSummary: 'Leading e-commerce platform in Bangladesh. Fast-paced environment with focus on customer experience.',
        layoffInfo: 'Stable operations with consistent hiring patterns.',
        recentHiringNews: 'Expanding logistics and technology teams. Focus on e-commerce specialists.',
        mediaLinks: JSON.stringify([
          { type: 'linkedin', url: 'https://linkedin.com/company/daraz-bangladesh' },
          { type: 'website', url: 'https://daraz.com.bd' }
        ]),
        friendlinessScore: 3.9,
        aiRating: 'Competitive environment with learning opportunities',
      },
    }),
  ])

  console.log('Database seeded successfully!')
  console.log(`Created ${templates.length} templates`)
  console.log(`Created ${companies.length} company insights`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
