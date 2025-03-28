# Veriseek Education Website Setup

This document provides instructions for setting up the Veriseek Education website with Supabase integration.

## Environment Variables

The following environment variables need to be set up in your Vercel project:

1. `SUPABASE_URL` - Your Supabase project URL (server-side access)
2. `SUPABASE_KEY` - Your Supabase service role key (server-side access)
3. `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL (client-side access)
4. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key (client-side access)

## Supabase Setup

1. Create a new Supabase project
2. Go to the SQL Editor in your Supabase dashboard
3. Copy and paste the contents of the `supabase-setup.sql` file
4. Run the SQL script to create the necessary tables and security policies

## Admin Access

The admin dashboard is accessible at `/admin` with the following credentials:

- Username: `admin`
- Password: `admin123`

## Features

The website includes the following features:

1. **Registration Forms**
   - Sharkathon registration form
   - Contact form
   - Newsletter subscription

2. **Admin Dashboard**
   - View and manage registrations
   - View and manage contact submissions
   - View and manage newsletter subscribers
   - Export data to CSV

## Security

- The admin dashboard is protected with basic authentication
- Supabase Row Level Security (RLS) policies are in place to protect data
- Server-side actions use the service role key for full database access
- Client-side components use the anon key with limited permissions

## Customization

You can customize the following aspects of the website:

1. **Admin Credentials**
   - Edit the `app/admin/login/page.tsx` file to change the username and password

2. **Form Fields**
   - Edit the form components to add or remove fields
   - Update the server actions in `app/actions/registration.ts` to handle the new fields
   - Update the database schema in Supabase if necessary

3. **Admin Dashboard**
   - Edit the admin pages to customize the tables and filters
   - Add new features or reports as needed

