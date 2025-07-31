import { supabase } from "./supabase";
import type {
  User,
  UserProfile,
  Package,
  UserSubscription,
  Resume,
  ResumeRevision,
  JobMatch,
  UsageStats,
} from "./supabase";

// Database service layer for ApplyIQ Bangladesh
export class DatabaseService {
  // User Management
  static async getCurrentUser(): Promise<User | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    return data;
  }

  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    return data;
  }

  static async updateUserProfile(
    userId: string,
    profile: Partial<UserProfile>,
  ): Promise<UserProfile | null> {
    const { data } = await supabase
      .from("user_profiles")
      .update(profile)
      .eq("user_id", userId)
      .select()
      .single();

    return data;
  }

  static async completeOnboarding(
    userId: string,
    profileData: Partial<UserProfile>,
  ): Promise<void> {
    await supabase
      .from("user_profiles")
      .update({ ...profileData, onboarding_completed: true })
      .eq("user_id", userId);
  }

  // Package Management
  static async getAllPackages(): Promise<Package[]> {
    const { data } = await supabase
      .from("packages")
      .select("*")
      .eq("is_active", true)
      .order("price_bdt");

    return data || [];
  }

  static async getUserSubscription(
    userId: string,
  ): Promise<UserSubscription | null> {
    const { data } = await supabase
      .from("user_subscriptions")
      .select(
        `
        *,
        packages (*)
      `,
      )
      .eq("user_id", userId)
      .eq("status", "active")
      .single();

    return data;
  }

  static async upgradeUserPackage(
    userId: string,
    packageId: string,
    paymentData?: any,
  ): Promise<UserSubscription> {
    // End current subscription
    await supabase
      .from("user_subscriptions")
      .update({ status: "cancelled", end_date: new Date().toISOString() })
      .eq("user_id", userId)
      .eq("status", "active");

    // Create new subscription
    const { data } = await supabase
      .from("user_subscriptions")
      .insert({
        user_id: userId,
        package_id: packageId,
        status: "active",
        payment_method: paymentData?.method,
        transaction_id: paymentData?.transactionId,
      })
      .select()
      .single();

    return data;
  }

  // Resume Management
  static async getUserResumes(userId: string): Promise<Resume[]> {
    const { data } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });

    return data || [];
  }

  static async createResume(
    userId: string,
    resumeData: Partial<Resume>,
  ): Promise<Resume> {
    const { data } = await supabase
      .from("resumes")
      .insert({
        user_id: userId,
        ...resumeData,
      })
      .select()
      .single();

    // Update usage stats
    await this.incrementUsageStats(userId, "resumes_created");

    return data;
  }

  static async updateResume(
    resumeId: string,
    resumeData: Partial<Resume>,
  ): Promise<Resume> {
    const { data } = await supabase
      .from("resumes")
      .update(resumeData)
      .eq("id", resumeId)
      .select()
      .single();

    return data;
  }

  static async createResumeRevision(
    resumeId: string,
    userId: string,
    changes: any,
  ): Promise<ResumeRevision> {
    // Get current revision count
    const { count } = await supabase
      .from("resume_revisions")
      .select("*", { count: "exact", head: true })
      .eq("resume_id", resumeId);

    const { data } = await supabase
      .from("resume_revisions")
      .insert({
        resume_id: resumeId,
        user_id: userId,
        changes,
        revision_number: (count || 0) + 1,
      })
      .select()
      .single();

    // Update usage stats
    await this.incrementUsageStats(userId, "revisions_used");

    return data;
  }

  // Job Matching
  static async getUserJobMatches(
    userId: string,
    limit?: number,
  ): Promise<JobMatch[]> {
    let query = supabase
      .from("job_matches")
      .select("*")
      .eq("user_id", userId)
      .order("match_score", { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data } = await query;
    return data || [];
  }

  static async saveJobMatch(
    userId: string,
    jobData: Partial<JobMatch>,
  ): Promise<JobMatch> {
    const { data } = await supabase
      .from("job_matches")
      .insert({
        user_id: userId,
        ...jobData,
        saved_at: new Date().toISOString(),
      })
      .select()
      .single();

    return data;
  }

  static async markJobAsApplied(jobId: string): Promise<void> {
    await supabase
      .from("job_matches")
      .update({ applied_at: new Date().toISOString() })
      .eq("id", jobId);
  }

  // Usage Statistics
  static async getUserUsageStats(userId: string): Promise<UsageStats | null> {
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format

    const { data } = await supabase
      .from("usage_stats")
      .select("*")
      .eq("user_id", userId)
      .eq("month_year", currentMonth)
      .single();

    return data;
  }

  static async incrementUsageStats(
    userId: string,
    field: "resumes_created" | "revisions_used" | "jobs_viewed",
  ): Promise<void> {
    const currentMonth = new Date().toISOString().slice(0, 7);

    // Try to increment existing record, or create new one
    const { data: existing } = await supabase
      .from("usage_stats")
      .select("*")
      .eq("user_id", userId)
      .eq("month_year", currentMonth)
      .single();

    if (existing) {
      await supabase
        .from("usage_stats")
        .update({
          [field]: existing[field] + 1,
          last_updated: new Date().toISOString(),
        })
        .eq("id", existing.id);
    } else {
      await supabase.from("usage_stats").insert({
        user_id: userId,
        month_year: currentMonth,
        [field]: 1,
      });
    }
  }

  // Authentication helpers
  static async signUp(email: string, password: string, userData: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });

    if (error) throw error;
    return data;
  }

  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  // Demo data helpers
  static async createSampleJobs(userId: string): Promise<void> {
    const { error } = await supabase.rpc("create_sample_jobs_for_user", {
      user_uuid: userId,
    });

    if (error) throw error;
  }

  static async createSampleResume(userId: string): Promise<string> {
    const { data, error } = await supabase.rpc(
      "create_sample_resume_for_user",
      {
        user_uuid: userId,
      },
    );

    if (error) throw error;
    return data;
  }
}

// Hook for checking user package limits
export async function checkUserLimits(userId: string) {
  const [subscription, usageStats] = await Promise.all([
    DatabaseService.getUserSubscription(userId),
    DatabaseService.getUserUsageStats(userId),
  ]);

  if (!subscription) return null;

  const packageLimits = {
    resume_limit: subscription.packages?.resume_limit || 0,
    revision_limit: subscription.packages?.revision_limit || 0,
    job_match_limit: subscription.packages?.job_match_limit || 0,
  };

  const currentUsage = {
    resumes_created: usageStats?.resumes_created || 0,
    revisions_used: usageStats?.revisions_used || 0,
    jobs_viewed: usageStats?.jobs_viewed || 0,
  };

  return {
    packageLimits,
    currentUsage,
    canCreateResume:
      packageLimits.resume_limit === -1 ||
      currentUsage.resumes_created < packageLimits.resume_limit,
    canMakeRevision:
      packageLimits.revision_limit === -1 ||
      currentUsage.revisions_used < packageLimits.revision_limit,
    canViewJobs:
      packageLimits.job_match_limit === -1 ||
      currentUsage.jobs_viewed < packageLimits.job_match_limit,
  };
}
