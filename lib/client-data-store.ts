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

// Mock data
const mockRegistrations: Registration[] = [
  {
    id: "1",
    created_at: new Date().toISOString(),
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    school: "Example High School",
    grade: "11",
    team_name: "Innovators",
    team_size: "3",
    project_idea: "An app that helps students find study partners",
    how_heard: "school",
    program: "sharkathon",
    status: "pending",
  },
  {
    id: "2",
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    phone: "+1987654321",
    school: "Demo Academy",
    grade: "10",
    team_name: "Tech Wizards",
    team_size: "2",
    project_idea: "A platform for recycling unused school supplies",
    how_heard: "social",
    program: "entrepreneurship",
    status: "approved",
  },
  {
    id: "3",
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    first_name: "Rohit",
    last_name: "Kumar",
    email: "rohit.kumar@example.com",
    phone: "+9198765432",
    school: "Global School",
    grade: "12",
    team_name: "Finance Wizards",
    team_size: "4",
    project_idea: "A financial literacy app for teenagers",
    how_heard: "friend",
    program: "sharkathon",
    status: "pending",
  },
  {
    id: "4",
    created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    first_name: "Priya",
    last_name: "Sharma",
    email: "priya.sharma@example.com",
    phone: "+9187654321",
    school: "International School",
    grade: "11",
    team_name: "Eco Warriors",
    team_size: "3",
    project_idea: "A sustainable fashion marketplace for teens",
    how_heard: "school",
    program: "sharkathon",
    status: "approved",
  },
  {
    id: "5",
    created_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    first_name: "Alex",
    last_name: "Johnson",
    email: "alex.johnson@example.com",
    phone: "+1122334455",
    school: "City High School",
    grade: "10",
    team_name: "Tech Innovators",
    team_size: "2",
    project_idea: "An AI-powered homework assistant",
    how_heard: "social",
    program: "entrepreneurship",
    status: "pending",
  },
]

const mockContactSubmissions: ContactSubmission[] = [
  {
    id: "1",
    created_at: new Date().toISOString(),
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+919876543210",
    subject: "sharkathon",
    message: "I would like to know more about the Sharkathon competition and how my school can participate.",
    status: "new",
  },
  {
    id: "2",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    name: "Rahul Patel",
    email: "rahul.patel@example.com",
    phone: "+918765432109",
    subject: "partnership",
    message:
      "Our organization is interested in partnering with Veriseek Education for our upcoming educational initiative.",
    status: "read",
  },
  {
    id: "3",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    name: "Ananya Singh",
    email: "ananya.singh@example.com",
    phone: null,
    subject: "general",
    message: "I have some questions about your educational programs. Could someone from your team contact me?",
    status: "responded",
  },
  {
    id: "4",
    created_at: new Date(Date.now() - 259200000).toISOString(),
    name: "Vikram Mehta",
    email: "vikram.mehta@example.com",
    phone: "+917654321098",
    subject: "programs",
    message: "I'm interested in learning more about your financial literacy programs for high school students.",
    status: "new",
  },
  {
    id: "5",
    created_at: new Date(Date.now() - 345600000).toISOString(),
    name: "Neha Gupta",
    email: "neha.gupta@example.com",
    phone: "+916543210987",
    subject: "sharkathon",
    message: "When is the next Sharkathon competition scheduled? Our school would like to participate.",
    status: "read",
  },
]

const mockNewsletterSubscriptions: NewsletterSubscription[] = [
  {
    id: "1",
    created_at: new Date().toISOString(),
    email: "newsletter1@example.com",
    status: "active",
  },
  {
    id: "2",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    email: "newsletter2@example.com",
    status: "active",
  },
  {
    id: "3",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    email: "newsletter3@example.com",
    status: "unsubscribed",
  },
  {
    id: "4",
    created_at: new Date(Date.now() - 259200000).toISOString(),
    email: "newsletter4@example.com",
    status: "active",
  },
  {
    id: "5",
    created_at: new Date(Date.now() - 345600000).toISOString(),
    email: "newsletter5@example.com",
    status: "active",
  },
]

// Helper to generate a unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// LocalStorage keys
const STORAGE_KEYS = {
  REGISTRATIONS: "veriseek_registrations",
  CONTACT_SUBMISSIONS: "veriseek_contact_submissions",
  NEWSLETTER_SUBSCRIPTIONS: "veriseek_newsletter_subscriptions",
}

// Client-side data store
class ClientDataStore {
  private registrations: Registration[] = []
  private contactSubmissions: ContactSubmission[] = []
  private newsletterSubscriptions: NewsletterSubscription[] = []

  constructor() {
    this.loadFromLocalStorage()
  }

  // Load data from localStorage or use mock data
  private loadFromLocalStorage() {
    try {
      // Try to load from localStorage
      const storedRegistrations = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS)
      const storedContactSubmissions = localStorage.getItem(STORAGE_KEYS.CONTACT_SUBMISSIONS)
      const storedNewsletterSubscriptions = localStorage.getItem(STORAGE_KEYS.NEWSLETTER_SUBSCRIPTIONS)

      // Use stored data if available, otherwise use mock data
      this.registrations = storedRegistrations ? JSON.parse(storedRegistrations) : mockRegistrations
      this.contactSubmissions = storedContactSubmissions ? JSON.parse(storedContactSubmissions) : mockContactSubmissions
      this.newsletterSubscriptions = storedNewsletterSubscriptions
        ? JSON.parse(storedNewsletterSubscriptions)
        : mockNewsletterSubscriptions
    } catch (error) {
      console.error("Error loading data from localStorage:", error)
      // Fall back to mock data
      this.registrations = mockRegistrations
      this.contactSubmissions = mockContactSubmissions
      this.newsletterSubscriptions = mockNewsletterSubscriptions
    }
  }

  // Save data to localStorage
  private saveToLocalStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(this.registrations))
      localStorage.setItem(STORAGE_KEYS.CONTACT_SUBMISSIONS, JSON.stringify(this.contactSubmissions))
      localStorage.setItem(STORAGE_KEYS.NEWSLETTER_SUBSCRIPTIONS, JSON.stringify(this.newsletterSubscriptions))
    } catch (error) {
      console.error("Error saving data to localStorage:", error)
    }
  }

  // Registrations methods
  getRegistrations(): Registration[] {
    return [...this.registrations].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  addRegistration(registration: Omit<Registration, "id" | "created_at">): Registration {
    const newRegistration: Registration = {
      ...registration,
      id: generateId(),
      created_at: new Date().toISOString(),
    }

    this.registrations.push(newRegistration)
    this.saveToLocalStorage()
    return newRegistration
  }

  updateRegistration(id: string, updates: Partial<Registration>): Registration | null {
    const index = this.registrations.findIndex((r) => r.id === id)
    if (index === -1) return null

    this.registrations[index] = { ...this.registrations[index], ...updates }
    this.saveToLocalStorage()
    return this.registrations[index]
  }

  // Contact submissions methods
  getContactSubmissions(): ContactSubmission[] {
    return [...this.contactSubmissions].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
  }

  addContactSubmission(submission: Omit<ContactSubmission, "id" | "created_at">): ContactSubmission {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: generateId(),
      created_at: new Date().toISOString(),
    }

    this.contactSubmissions.push(newSubmission)
    this.saveToLocalStorage()
    return newSubmission
  }

  updateContactSubmission(id: string, updates: Partial<ContactSubmission>): ContactSubmission | null {
    const index = this.contactSubmissions.findIndex((s) => s.id === id)
    if (index === -1) return null

    this.contactSubmissions[index] = { ...this.contactSubmissions[index], ...updates }
    this.saveToLocalStorage()
    return this.contactSubmissions[index]
  }

  // Newsletter subscriptions methods
  getNewsletterSubscriptions(): NewsletterSubscription[] {
    return [...this.newsletterSubscriptions].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
  }

  addNewsletterSubscription(email: string): NewsletterSubscription {
    // Check if email already exists
    const existingIndex = this.newsletterSubscriptions.findIndex((s) => s.email === email)

    if (existingIndex !== -1) {
      // Update existing subscription
      this.newsletterSubscriptions[existingIndex].status = "active"
      this.saveToLocalStorage()
      return this.newsletterSubscriptions[existingIndex]
    }

    // Add new subscription
    const newSubscription: NewsletterSubscription = {
      id: generateId(),
      created_at: new Date().toISOString(),
      email,
      status: "active",
    }

    this.newsletterSubscriptions.push(newSubscription)
    this.saveToLocalStorage()
    return newSubscription
  }

  updateNewsletterSubscription(id: string, updates: Partial<NewsletterSubscription>): NewsletterSubscription | null {
    const index = this.newsletterSubscriptions.findIndex((s) => s.id === id)
    if (index === -1) return null

    this.newsletterSubscriptions[index] = { ...this.newsletterSubscriptions[index], ...updates }
    this.saveToLocalStorage()
    return this.newsletterSubscriptions[index]
  }

  // Reset all data to mock data (for testing)
  resetToMockData() {
    this.registrations = [...mockRegistrations]
    this.contactSubmissions = [...mockContactSubmissions]
    this.newsletterSubscriptions = [...mockNewsletterSubscriptions]
    this.saveToLocalStorage()
  }
}

// Create and export a singleton instance
export const dataStore = new ClientDataStore()

