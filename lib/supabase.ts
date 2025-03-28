import { createClient } from "@supabase/supabase-js"

// Types for our database tables
export type Registration = {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
  phone: string
  school: string
  grade: string
  team_name: string
  team_size: string
  project_idea: string
  how_heard: string
  program: string // 'sharkathon', 'financial-literacy', etc.
  status: string // 'pending', 'approved', 'rejected'
}

export type ContactSubmission = {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: string // 'new', 'read', 'responded'
}

export type NewsletterSubscription = {
  id: string
  created_at: string
  email: string
  status: string // 'active', 'unsubscribed'
}

// Flag to track if Supabase is available
export let isSupabaseAvailable = false

// Create a dummy client that logs operations but doesn't actually connect to Supabase
const createDummyClient = () => {
  console.warn("Using dummy Supabase client - operations will be logged but not executed")

  return {
    from: (table: string) => ({
      select: () => {
        console.log(`[DUMMY] SELECT from ${table}`)
        return {
          order: () => {
            console.log(`[DUMMY] ORDER in ${table}`)
            return {
              then: (callback: Function) => callback({ data: [], error: null }),
              catch: () => ({ data: [], error: null }),
            }
          },
          eq: () => {
            console.log(`[DUMMY] EQ in ${table}`)
            return {
              then: (callback: Function) => callback({ data: null, error: null }),
              catch: () => ({ data: null, error: null }),
            }
          },
        }
      },
      insert: (data: any) => {
        console.log(`[DUMMY] INSERT into ${table}:`, data)
        return Promise.resolve({ error: null })
      },
      upsert: (data: any) => {
        console.log(`[DUMMY] UPSERT into ${table}:`, data)
        return Promise.resolve({ error: null })
      },
      update: (data: any) => {
        console.log(`[DUMMY] UPDATE in ${table}:`, data)
        return {
          eq: () => Promise.resolve({ error: null }),
        }
      },
    }),
  }
}

// Initialize Supabase clients with dummy implementations by default
let supabase: any = createDummyClient()
let supabaseClient: any = createDummyClient()

// Function to test if Supabase is available
export async function testSupabaseConnection() {
  try {
    // Get Supabase URL and keys from environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Missing Supabase URL or anon key")
      isSupabaseAvailable = false
      return false
    }

    // Create a temporary client just for testing
    const testClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    })

    // Try a simple query with a timeout
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Connection test timed out")), 3000),
    )

    const testPromise = testClient.from("registrations").select("count", { count: "exact", head: true })

    await Promise.race([testPromise, timeoutPromise])

    console.log("Supabase connection test successful")
    isSupabaseAvailable = true
    return true
  } catch (error) {
    console.error("Supabase connection test failed:", error)
    isSupabaseAvailable = false
    return false
  }
}

// Initialize Supabase clients only if needed
export function initializeSupabaseClients() {
  try {
    // Get Supabase URL and keys from environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseKey = process.env.SUPABASE_KEY || ""
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

    if (supabaseUrl && supabaseKey) {
      try {
        supabase = createClient(supabaseUrl, supabaseKey)
        console.log("Server-side Supabase client initialized")
      } catch (error) {
        console.error("Failed to initialize server-side Supabase client:", error)
        supabase = createDummyClient()
      }
    }

    if (supabaseUrl && supabaseAnonKey) {
      try {
        supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
        console.log("Client-side Supabase client initialized")
      } catch (error) {
        console.error("Failed to initialize client-side Supabase client:", error)
        supabaseClient = createDummyClient()
      }
    }
  } catch (error) {
    console.error("Error initializing Supabase clients:", error)
  }
}

// Try to initialize on import, but don't worry if it fails
try {
  initializeSupabaseClients()
} catch (e) {
  console.warn("Failed to initialize Supabase clients on import:", e)
}

export { supabase, supabaseClient }

