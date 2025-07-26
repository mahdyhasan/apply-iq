import { PrismaClient } from '@prisma/client'

async function checkConnection() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔗 Testing database connection...')
    
    // Test the connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Check if tables exist
    const userCount = await prisma.user.count()
    console.log(`📊 Current users in database: ${userCount}`)
    
    if (userCount === 0) {
      console.log('💡 Database is empty. Run "npm run db:setup" to add sample data.')
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:')
    
    if (error instanceof Error) {
      if (error.message.includes('P1001')) {
        console.error('🔧 Cannot reach database server.')
        console.error('📝 Please update your DATABASE_URL in the .env file with your actual Prisma connection string.')
        console.error('🌐 Get it from: https://console.prisma.io')
      } else if (error.message.includes('P2021')) {
        console.error('🗄️ Database tables do not exist.')
        console.error('📝 Run "npm run db:push" to create tables first.')
      } else {
        console.error('Error:', error.message)
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}

checkConnection()
