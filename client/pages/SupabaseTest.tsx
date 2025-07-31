import SupabaseTest from '@/components/SupabaseTest'

export default function SupabaseTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Supabase Database Test
          </h1>
          <p className="text-gray-600">
            Testing connection to ApplyIQ Bangladesh database
          </p>
        </div>
        
        <SupabaseTest />
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            If the test fails, follow the setup instructions in{' '}
            <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
              SUPABASE_SETUP_INSTRUCTIONS.md
            </code>
          </p>
        </div>
      </div>
    </div>
  )
}
