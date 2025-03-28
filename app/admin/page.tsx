"use client"

import { useState, useEffect } from "react"
import { dataStore, type Registration } from "@/lib/client-data-store"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Search, Download, RefreshCw } from "lucide-react"

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  useEffect(() => {
    // Load data from client-side store
    loadRegistrations()
  }, [])

  function loadRegistrations() {
    setLoading(true)
    // Simulate network delay for a more realistic experience
    setTimeout(() => {
      const data = dataStore.getRegistrations()
      setRegistrations(data)
      setLoading(false)
    }, 500)
  }

  const filteredRegistrations = registrations.filter((reg) => {
    // Apply program filter
    if (filter !== "all" && reg.program !== filter) {
      return false
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      return (
        reg.first_name.toLowerCase().includes(searchLower) ||
        reg.last_name.toLowerCase().includes(searchLower) ||
        reg.email.toLowerCase().includes(searchLower) ||
        reg.school.toLowerCase().includes(searchLower) ||
        reg.team_name.toLowerCase().includes(searchLower)
      )
    }

    return true
  })

  const exportToCSV = () => {
    // Create CSV content
    const headers = [
      "ID",
      "Created At",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "School",
      "Grade",
      "Team Name",
      "Team Size",
      "Project Idea",
      "How Heard",
      "Program",
      "Status",
    ]

    const csvRows = [
      headers.join(","),
      ...filteredRegistrations.map((reg) =>
        [
          reg.id,
          reg.created_at,
          `"${reg.first_name.replace(/"/g, '""')}"`,
          `"${reg.last_name.replace(/"/g, '""')}"`,
          `"${reg.email.replace(/"/g, '""')}"`,
          `"${reg.phone.replace(/"/g, '""')}"`,
          `"${reg.school.replace(/"/g, '""')}"`,
          reg.grade,
          `"${reg.team_name.replace(/"/g, '""')}"`,
          reg.team_size,
          `"${reg.project_idea.replace(/"/g, '""')}"`,
          reg.how_heard,
          reg.program,
          reg.status,
        ].join(","),
      ),
    ]

    const csvContent = csvRows.join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `registrations-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Registrations</h1>
        <div className="flex gap-2">
          <Button onClick={loadRegistrations} variant="outline" size="icon" className="h-9 w-9" title="Refresh data">
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
          <Button
            onClick={exportToCSV}
            className="bg-primary text-white hover:bg-primary/90"
            disabled={filteredRegistrations.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export to CSV
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search registrations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
          <Button variant="ghost" className="px-3">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by program" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
            <SelectItem value="sharkathon">Sharkathon</SelectItem>
            <SelectItem value="financial-literacy">Financial Literacy</SelectItem>
            <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
            <SelectItem value="leadership">Leadership</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredRegistrations.length === 0 ? (
        <div className="rounded-md bg-gray-50 p-8 text-center text-gray-500">No registrations found</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegistrations.map((reg) => (
                <TableRow key={reg.id}>
                  <TableCell className="font-medium">
                    {reg.first_name} {reg.last_name}
                  </TableCell>
                  <TableCell>{reg.email}</TableCell>
                  <TableCell>{reg.school}</TableCell>
                  <TableCell>
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {reg.program}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(reg.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={reg.status}
                      onValueChange={(value) => {
                        // Update in client-side store
                        dataStore.updateRegistration(reg.id, { status: value })
                        // Update local state
                        setRegistrations((prev) => prev.map((r) => (r.id === reg.id ? { ...r, status: value } : r)))
                      }}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

