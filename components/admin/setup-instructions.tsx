"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SetupInstructions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-primary">Database Setup Required</CardTitle>
        <CardDescription>
          The database tables for this application have not been created yet. Follow the instructions below to set up
          your Supabase database.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="instructions">
          <TabsList className="mb-4">
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="sql">SQL Script</TabsTrigger>
          </TabsList>
          <TabsContent value="instructions" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Step 1: Access your Supabase project</h3>
              <p className="text-sm text-gray-600">Log in to your Supabase dashboard and select your project.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Step 2: Open the SQL Editor</h3>
              <p className="text-sm text-gray-600">Navigate to the SQL Editor in the left sidebar.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Step 3: Run the SQL Script</h3>
              <p className="text-sm text-gray-600">
                Copy the SQL script from the "SQL Script" tab and paste it into the SQL Editor. Then click "Run".
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Step 4: Refresh this page</h3>
              <p className="text-sm text-gray-600">After running the script, refresh this page to see your data.</p>
            </div>
          </TabsContent>
          <TabsContent value="sql">
            <div className="relative">
              <pre className="max-h-[400px] overflow-auto rounded-md bg-gray-100 p-4 text-sm">
                <code>{`-- Create tables for Veriseek Education website

-- Registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    school TEXT NOT NULL,
    grade TEXT NOT NULL,
    team_name TEXT NOT NULL,
    team_size TEXT NOT NULL,
    project_idea TEXT NOT NULL,
    how_heard TEXT NOT NULL,
    program TEXT NOT NULL DEFAULT 'sharkathon',
    status TEXT NOT NULL DEFAULT 'pending'
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new'
);

-- Newsletter subscriptions table
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS registrations_email_idx ON public.registrations (email);
CREATE INDEX IF NOT EXISTS registrations_program_idx ON public.registrations (program);
CREATE INDEX IF NOT EXISTS registrations_status_idx ON public.registrations (status);

CREATE INDEX IF NOT EXISTS contact_submissions_email_idx ON public.contact_submissions (email);
CREATE INDEX IF NOT EXISTS contact_submissions_status_idx ON public.contact_submissions (status);

CREATE INDEX IF NOT EXISTS newsletter_subscriptions_email_idx ON public.newsletter_subscriptions (email);
CREATE INDEX IF NOT EXISTS newsletter_subscriptions_status_idx ON public.newsletter_subscriptions (status);

-- Set up Row Level Security (RLS) policies
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admin)
CREATE POLICY "Enable all access for authenticated users" ON public.registrations
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users" ON public.contact_submissions
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users" ON public.newsletter_subscriptions
    FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for anonymous users (website visitors)
-- They can only insert new records, not read or modify existing ones
CREATE POLICY "Enable insert for anonymous users" ON public.registrations
    FOR INSERT WITH CHECK (auth.role() = 'anon');

CREATE POLICY "Enable insert for anonymous users" ON public.contact_submissions
    FOR INSERT WITH CHECK (auth.role() = 'anon');

CREATE POLICY "Enable insert for anonymous users" ON public.newsletter_subscriptions
    FOR INSERT WITH CHECK (auth.role() = 'anon');`}</code>
              </pre>
              <Button
                className="absolute right-2 top-2 bg-primary text-white hover:bg-primary/90"
                onClick={() => {
                  const sqlScript = document.querySelector("pre code")?.textContent
                  if (sqlScript) {
                    navigator.clipboard.writeText(sqlScript)
                  }
                }}
              >
                Copy
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
        <Button
          className="bg-primary text-white hover:bg-primary/90"
          onClick={() => window.open("https://supabase.com/dashboard", "_blank")}
        >
          Go to Supabase Dashboard
        </Button>
      </CardFooter>
    </Card>
  )
}

