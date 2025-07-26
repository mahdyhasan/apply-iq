import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function setupDatabase() {
  console.log('🚀 Setting up ApplyIQ Bangladesh database...')

  try {
    // Clear existing data (optional - remove in production)
    console.log('🧹 Clearing existing data...')
    await prisma.userCompanyView.deleteMany()
    await prisma.savedJob.deleteMany()
    await prisma.job.deleteMany()
    await prisma.jobScrape.deleteMany()
    await prisma.resumeTemplate.deleteMany()
    await prisma.resumeInput.deleteMany()
    await prisma.resume.deleteMany()
    await prisma.template.deleteMany()
    await prisma.companyInsight.deleteMany()
    await prisma.user.deleteMany()

    // Create templates for Bangladesh job market
    console.log('📄 Creating resume templates...')
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
      prisma.template.create({
        data: {
          name: 'Startup Professional',
          category: 'Startup',
          previewUrl: '/templates/startup-professional-preview.png',
          fileUrl: '/templates/startup-professional.pdf',
        },
      }),
    ])

    // Create company insights for major Bangladesh companies
    console.log('🏢 Creating company insights...')
    const companies = await Promise.all([
      prisma.companyInsight.create({
        data: {
          companyName: 'BRAC Bank',
          employeeSize: '5000+',
          cultureSummary: 'Leading financial institution in Bangladesh with strong emphasis on digital banking and customer service. Known for professional development opportunities and competitive benefits.',
          layoffInfo: 'No recent layoffs. Stable employment with consistent growth trajectory. Company has been expanding digital services division.',
          recentHiringNews: 'Actively hiring for digital banking positions, software engineers, and customer service roles. Major focus on fintech talent and mobile banking specialists.',
          mediaLinks: JSON.stringify([
            { type: 'linkedin', url: 'https://linkedin.com/company/brac-bank' },
            { type: 'website', url: 'https://bracbank.com' },
            { type: 'careers', url: 'https://bracbank.com/careers' }
          ]),
          friendlinessScore: 4.2,
          aiRating: 'Excellent workplace culture with strong employee satisfaction and growth opportunities',
        },
      }),
      prisma.companyInsight.create({
        data: {
          companyName: 'Grameenphone',
          employeeSize: '3000+',
          cultureSummary: 'Largest telecom operator in Bangladesh, part of Telenor Group. Progressive work environment with focus on innovation, diversity, and technology advancement.',
          layoffInfo: 'Some organizational restructuring in 2023 for efficiency but overall stable employment. Focus on digital transformation roles.',
          recentHiringNews: 'Expanding digital services and 5G infrastructure teams. Looking for software engineers, data scientists, and network specialists.',
          mediaLinks: JSON.stringify([
            { type: 'linkedin', url: 'https://linkedin.com/company/grameenphone' },
            { type: 'website', url: 'https://grameenphone.com' },
            { type: 'careers', url: 'https://grameenphone.com/careers' }
          ]),
          friendlinessScore: 4.0,
          aiRating: 'Good work-life balance with competitive benefits and international exposure',
        },
      }),
      prisma.companyInsight.create({
        data: {
          companyName: 'Pathao',
          employeeSize: '2000+',
          cultureSummary: 'Fast-growing tech startup focused on logistics, ride-sharing, and fintech. Dynamic and entrepreneurial culture with rapid decision-making.',
          layoffInfo: 'Minor workforce adjustments in 2023 to optimize operations and focus on profitable segments. Overall growth trajectory maintained.',
          recentHiringNews: 'Aggressively hiring tech talent for expansion into fintech and logistics. Multiple openings in engineering, product management, and data analytics.',
          mediaLinks: JSON.stringify([
            { type: 'linkedin', url: 'https://linkedin.com/company/pathao' },
            { type: 'website', url: 'https://pathao.com' },
            { type: 'careers', url: 'https://pathao.com/careers' }
          ]),
          friendlinessScore: 4.1,
          aiRating: 'Innovative environment with high growth potential and startup culture',
        },
      }),
      prisma.companyInsight.create({
        data: {
          companyName: 'Daraz Bangladesh',
          employeeSize: '1000+',
          cultureSummary: 'Leading e-commerce platform in Bangladesh, part of Alibaba Group. Fast-paced environment with focus on customer experience and market expansion.',
          layoffInfo: 'Stable operations with consistent hiring patterns. No major layoffs reported. Focus on local talent development.',
          recentHiringNews: 'Expanding logistics, technology, and customer service teams. Focus on e-commerce specialists, supply chain, and digital marketing.',
          mediaLinks: JSON.stringify([
            { type: 'linkedin', url: 'https://linkedin.com/company/daraz-bangladesh' },
            { type: 'website', url: 'https://daraz.com.bd' },
            { type: 'careers', url: 'https://daraz.com.bd/careers' }
          ]),
          friendlinessScore: 3.9,
          aiRating: 'Competitive environment with learning opportunities and e-commerce growth',
        },
      }),
      prisma.companyInsight.create({
        data: {
          companyName: 'SSL Commerz',
          employeeSize: '500+',
          cultureSummary: 'Leading payment gateway and fintech company in Bangladesh. Technology-focused culture with emphasis on digital payments innovation.',
          layoffInfo: 'Stable employment with growth in digital payment sector. No recent layoffs reported.',
          recentHiringNews: 'Hiring for fintech roles, payment specialists, and software developers. Focus on blockchain and digital wallet technologies.',
          mediaLinks: JSON.stringify([
            { type: 'linkedin', url: 'https://linkedin.com/company/ssl-commerz' },
            { type: 'website', url: 'https://sslcommerz.com' },
            { type: 'careers', url: 'https://sslcommerz.com/careers' }
          ]),
          friendlinessScore: 4.0,
          aiRating: 'Growing fintech company with good career prospects in payments industry',
        },
      }),
      prisma.companyInsight.create({
        data: {
          companyName: 'Brain Station 23',
          employeeSize: '1500+',
          cultureSummary: 'Leading software development company in Bangladesh. Strong engineering culture with focus on international projects and cutting-edge technology.',
          layoffInfo: 'Stable growth with consistent hiring. Company has been expanding internationally.',
          recentHiringNews: 'Actively hiring software engineers, DevOps specialists, and project managers. Focus on full-stack developers and cloud specialists.',
          mediaLinks: JSON.stringify([
            { type: 'linkedin', url: 'https://linkedin.com/company/brainstation-23' },
            { type: 'website', url: 'https://brainstation-23.com' },
            { type: 'careers', url: 'https://brainstation-23.com/careers' }
          ]),
          friendlinessScore: 4.3,
          aiRating: 'Excellent engineering culture with international exposure and growth opportunities',
        },
      }),
    ])

    // Create sample users
    console.log('👥 Creating sample users...')
    const users = await Promise.all([
      prisma.user.create({
        data: {
          email: 'user@applyiq.com',
          passwordHash: 'hashedpassword123', // In real app, this would be properly hashed
          fullName: 'John Doe',
          photoUrl: null,
        },
      }),
      prisma.user.create({
        data: {
          email: 'admin@applyiq.com',
          passwordHash: 'hashedadminpass123', // In real app, this would be properly hashed
          fullName: 'Admin User',
          photoUrl: null,
        },
      }),
      prisma.user.create({
        data: {
          email: 'jane.smith@example.com',
          passwordHash: 'hashedpassword456',
          fullName: 'Jane Smith',
          photoUrl: null,
        },
      }),
    ])

    // Create sample resumes
    console.log('📄 Creating sample resumes...')
    const resume = await prisma.resume.create({
      data: {
        userId: users[0].id,
        originalResumeUrl: '/uploads/john-doe-resume-original.pdf',
        aiGeneratedResumeUrl: '/uploads/john-doe-resume-optimized.pdf',
        promptUsed: 'Optimize for software engineering roles in Bangladesh banking sector',
        status: 'optimized',
      },
    })

    // Create resume input
    await prisma.resumeInput.create({
      data: {
        resumeId: resume.id,
        education: JSON.stringify([
          {
            degree: 'Bachelor of Science in Computer Science',
            institution: 'BUET (Bangladesh University of Engineering and Technology)',
            year: '2020',
            gpa: '3.75'
          }
        ]),
        experience: JSON.stringify([
          {
            title: 'Junior Software Developer',
            company: 'Tech Solutions BD',
            duration: '2021-2023',
            description: 'Developed web applications using React and Node.js'
          }
        ]),
        skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'Express.js'],
        certifications: ['AWS Certified Cloud Practitioner', 'React Professional Certificate'],
        projects: JSON.stringify([
          {
            name: 'E-commerce Platform',
            description: 'Built a full-stack e-commerce platform for local businesses',
            technologies: ['React', 'Node.js', 'MongoDB']
          }
        ]),
        extracurricular: JSON.stringify([
          {
            activity: 'Programming Club President',
            organization: 'BUET Computer Society',
            year: '2019-2020'
          }
        ]),
        careerSummary: 'Passionate software developer with 2+ years experience in full-stack development, specializing in React and Node.js applications for the Bangladesh market.',
        preferredRole: 'Software Engineer',
        preferredIndustry: 'Banking & Fintech',
      },
    })

    // Link resume to template
    await prisma.resumeTemplate.create({
      data: {
        resumeId: resume.id,
        templateId: templates[1].id, // Tech Modern template
      },
    })

    // Create sample job scrape
    console.log('💼 Creating sample jobs...')
    const jobScrape = await prisma.jobScrape.create({
      data: {
        userId: users[0].id,
        scrapeDate: new Date(),
        dateRangeStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        dateRangeEnd: new Date(),
        totalJobsFound: 25,
      },
    })

    // Create sample jobs
    const jobs = await Promise.all([
      prisma.job.create({
        data: {
          scrapeId: jobScrape.id,
          title: 'Software Engineer',
          companyName: 'BRAC Bank',
          location: 'Dhaka, Bangladesh',
          industry: 'Banking & Finance',
          experienceRequired: '2-4 years',
          publishDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          source: 'BDJobs',
          applyLink: 'https://bdjobs.com/apply/software-engineer-brac-bank',
          matchScore: 92.5,
          rating: 'Excellent Match',
        },
      }),
      prisma.job.create({
        data: {
          scrapeId: jobScrape.id,
          title: 'Frontend Developer',
          companyName: 'Grameenphone',
          location: 'Dhaka, Bangladesh',
          industry: 'Telecommunications',
          experienceRequired: '1-3 years',
          publishDate: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
          deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
          source: 'LinkedIn',
          applyLink: 'https://linkedin.com/jobs/grameenphone-frontend-developer',
          matchScore: 88.0,
          rating: 'Very Good Match',
        },
      }),
      prisma.job.create({
        data: {
          scrapeId: jobScrape.id,
          title: 'Full Stack Developer',
          companyName: 'Pathao',
          location: 'Dhaka, Bangladesh',
          industry: 'Technology',
          experienceRequired: '2-5 years',
          publishDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
          source: 'Pathao Careers',
          applyLink: 'https://pathao.com/careers/full-stack-developer',
          matchScore: 85.5,
          rating: 'Good Match',
        },
      }),
      prisma.job.create({
        data: {
          scrapeId: jobScrape.id,
          title: 'React Developer',
          companyName: 'Daraz Bangladesh',
          location: 'Dhaka, Bangladesh',
          industry: 'E-commerce',
          experienceRequired: '1-4 years',
          publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          source: 'Company Website',
          applyLink: 'https://daraz.com.bd/careers/react-developer',
          matchScore: 82.0,
          rating: 'Good Match',
        },
      }),
    ])

    // Create saved jobs
    console.log('⭐ Creating saved jobs...')
    await Promise.all([
      prisma.savedJob.create({
        data: {
          userId: users[0].id,
          jobId: jobs[0].id,
          status: 'applied',
        },
      }),
      prisma.savedJob.create({
        data: {
          userId: users[0].id,
          jobId: jobs[1].id,
          status: 'saved',
        },
      }),
    ])

    // Create company views
    console.log('👀 Creating company views...')
    await Promise.all([
      prisma.userCompanyView.create({
        data: {
          userId: users[0].id,
          companyId: companies[0].id, // BRAC Bank
        },
      }),
      prisma.userCompanyView.create({
        data: {
          userId: users[0].id,
          companyId: companies[2].id, // Pathao
        },
      }),
    ])

    console.log('✅ Database setup completed successfully!')
    console.log(`📊 Created:`)
    console.log(`   - ${templates.length} resume templates`)
    console.log(`   - ${companies.length} company insights`)
    console.log(`   - ${users.length} users`)
    console.log(`   - 1 resume with optimization`)
    console.log(`   - ${jobs.length} job listings`)
    console.log(`   - 2 saved jobs`)
    console.log(`   - 2 company views`)

  } catch (error) {
    console.error('❌ Error setting up database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the setup
setupDatabase()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
