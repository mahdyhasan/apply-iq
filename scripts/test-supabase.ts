import { supabase } from "../client/lib/supabase";

async function testSupabaseConnection() {
  try {
    console.log("🔗 Testing Supabase connection...");

    // Test basic connection
    const { data, error } = await supabase
      .from("packages")
      .select("count")
      .limit(1);

    if (error) {
      console.error("❌ Connection failed:", error.message);
      console.log("\n📋 To fix this, you need to:");
      console.log(
        "1. Go to your Supabase dashboard: https://qzalbwldhvcgrceixfeq.supabase.co",
      );
      console.log("2. Navigate to SQL Editor");
      console.log("3. Copy and run the SQL from: database/schema.sql");
      console.log("4. Then run: database/demo-data.sql");
      return false;
    }

    console.log("✅ Supabase connection successful!");
    console.log("📊 Found packages table");
    return true;
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    return false;
  }
}

testSupabaseConnection();
