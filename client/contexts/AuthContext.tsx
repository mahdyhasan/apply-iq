import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { DatabaseService } from '@/lib/database'
import type { User, UserProfile, UserSubscription } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  subscription: UserSubscription | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData: any) => Promise<void>
  signOut: () => Promise<void>
  refreshUserData: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUserData = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (authUser) {
        const [userData, profileData, subscriptionData] = await Promise.all([
          DatabaseService.getCurrentUser(),
          DatabaseService.getUserProfile(authUser.id),
          DatabaseService.getUserSubscription(authUser.id)
        ])
        
        setUser(userData)
        setProfile(profileData)
        setSubscription(subscriptionData)
      } else {
        setUser(null)
        setProfile(null)
        setSubscription(null)
      }
    } catch (error) {
      console.error('Error refreshing user data:', error)
    }
  }

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        await refreshUserData()
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await refreshUserData()
        } else {
          setUser(null)
          setProfile(null)
          setSubscription(null)
        }
        setLoading(false)
      }
    )

    return () => {
      authSubscription?.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      await DatabaseService.signIn(email, password)
      // User data will be refreshed by the auth state change listener
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    setLoading(true)
    try {
      await DatabaseService.signUp(email, password, userData)
      // User data will be refreshed by the auth state change listener
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await DatabaseService.signOut()
      // User data will be cleared by the auth state change listener
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const value = {
    user,
    profile,
    subscription,
    loading,
    signIn,
    signUp,
    signOut,
    refreshUserData
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook for getting user package info
export function useUserPackage() {
  const { subscription } = useAuth()
  
  const packageConfig = {
    free: { resumeLimit: 1, revisionLimit: 3, jobMatches: 0, canRefresh: false, canFilter: false },
    starter: { resumeLimit: 1, revisionLimit: 10, jobMatches: 3, canRefresh: false, canFilter: true },
    premium: { resumeLimit: 5, revisionLimit: -1, jobMatches: -1, canRefresh: true, canFilter: true },
    elite: { resumeLimit: -1, revisionLimit: -1, jobMatches: -1, canRefresh: true, canFilter: true }
  }

  const currentPlan = subscription?.package_id || 'free'
  
  return {
    currentPlan,
    limits: packageConfig[currentPlan as keyof typeof packageConfig],
    isActive: subscription?.status === 'active'
  }
}
