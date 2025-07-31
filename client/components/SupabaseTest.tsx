import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { CheckCircle, XCircle, Database, Loader2 } from 'lucide-react'

interface ConnectionStatus {
  connected: boolean
  packages: any[]
  error?: string
  userCount?: number
}

export default function SupabaseTest() {
  const [status, setStatus] = useState<ConnectionStatus>({ connected: false, packages: [] })
  const [loading, setLoading] = useState(true)
  const [testing, setTesting] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setTesting(true)
    
    try {
      // Test packages table
      const { data: packages, error: packagesError } = await supabase
        .from('packages')
        .select('*')
        .order('price_bdt')

      // Test user count (auth.users is protected, so we'll check our users table)
      const { count: userCount, error: userError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })

      if (packagesError) {
        setStatus({
          connected: false,
          packages: [],
          error: packagesError.message
        })
      } else {
        setStatus({
          connected: true,
          packages: packages || [],
          userCount: userCount || 0
        })
      }
    } catch (error: any) {
      setStatus({
        connected: false,
        packages: [],
        error: error.message
      })
    }
    
    setLoading(false)
    setTesting(false)
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <span>Supabase Connection Test</span>
          {status.connected ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Connection Status:</span>
          <Badge variant={status.connected ? "default" : "destructive"}>
            {status.connected ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Project URL:</span>
          <span className="text-sm text-gray-600">qzalbwldhvcgrceixfeq.supabase.co</span>
        </div>

        {status.error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">
              <strong>Error:</strong> {status.error}
            </p>
            <p className="text-xs text-red-600 mt-1">
              Make sure you've run the SQL schema in your Supabase dashboard.
            </p>
          </div>
        )}

        {status.connected && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Packages Found:</span>
              <Badge variant="outline">{status.packages.length}</Badge>
            </div>

            {status.packages.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {status.packages.map((pkg) => (
                  <div key={pkg.id} className="p-2 bg-gray-50 rounded-md">
                    <div className="text-sm font-medium">{pkg.name}</div>
                    <div className="text-xs text-gray-600">
                      {pkg.price_bdt ? `৳${pkg.price_bdt}` : 'Free'}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Registered Users:</span>
              <Badge variant="outline">{status.userCount || 0}</Badge>
            </div>
          </div>
        )}

        <Button 
          onClick={testConnection} 
          disabled={testing}
          className="w-full"
        >
          {testing ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Database className="h-4 w-4 mr-2" />
          )}
          Test Connection
        </Button>

        {!status.connected && (
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              To set up your database, follow the instructions in:
            </p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              SUPABASE_SETUP_INSTRUCTIONS.md
            </code>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
