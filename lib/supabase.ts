import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

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
  program: string
  status: string
}

export type ContactSubmission = {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: string
}

export type NewsletterSubscription = {
  id: string
  created_at: string
  email: string
  status: string
}

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _supabase: any = null
try {
  if (supabaseUrl && supabaseAnonKey) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey)
  } else {
    console.warn('Missing Supabase environment variables. Supabase features will be disabled.')
  }
} catch {
  console.warn('Failed to initialise Supabase client (invalid credentials). Supabase features will be disabled.')
}

export const supabase = _supabase
export const supabaseClient = _supabase