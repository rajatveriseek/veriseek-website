-- Create tables for Veriseek Education website

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
    FOR INSERT WITH CHECK (auth.role() = 'anon');

