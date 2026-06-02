"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  LayoutDashboard, Calendar, Users, Ticket, BarChart3, Settings,
  Plus, TrendingUp, TrendingDown, DollarSign, Eye, Star,
  ChevronRight, Bell, Search, Menu, X, Home, LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const stats = [
  { label: "Total Revenue", value: "2,450,000 FCFA", change: "+12.5%", trend: "up", icon: DollarSign },
  { label: "Tickets Sold", value: "1,234", change: "+8.2%", trend: "up", icon: Ticket },
  { label: "Total Views", value: "45.2K", change: "+23.1%", trend: "up", icon: Eye },
  { label: "Avg Rating", value: "4.8", change: "-0.1", trend: "down", icon: Star },
]

const recentEvents = [
  { id: 1, name: "Afro Nation Douala", date: "Dec 21", status: "upcoming", tickets: 2340, revenue: "35,100,000" },
  { id: 2, name: "White Pool Party", date: "Dec 25", status: "upcoming", tickets: 180, revenue: "1,800,000" },
  { id: 3, name: "NYE Countdown", date: "Dec 31", status: "draft", tickets: 0, revenue: "0" },
  { id: 4, name: "Summer Splash", date: "Aug 15", status: "completed", tickets: 3200, revenue: "48,000,000" },
]

const notifications = [
  { id: 1, message: "New ticket sale for Afro Nation", time: "2 min ago" },
  { id: 2, message: "Review received: 5 stars", time: "1 hour ago" },
  { id: 3, message: "Payout processed: 5,000,000 FCFA", time: "3 hours ago" },
]

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/organizer", active: true },
  { icon: Calendar, label: "Events", href: "/dashboard/organizer/events" },
  { icon: Ticket, label: "Tickets", href: "/dashboard/organizer/tickets" },
  { icon: Users, label: "Attendees", href: "/dashboard/organizer/attendees" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/organizer/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/organizer/settings" },
]

export default function OrganizerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg cameroon-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">V</span>
              </div>
              <span className="font-bold text-lg">VibeCam</span>
            </Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Bottom */}
          <div className="p-4 border-t border-border">
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30">
          <div className="h-full flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </button>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search events, attendees..." className="pl-9 w-64 bg-secondary/50" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button className="cameroon-gradient text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((notif) => (
                    <DropdownMenuItem key={notif.id} className="flex flex-col items-start py-3">
                      <span>{notif.message}</span>
                      <span className="text-xs text-muted-foreground">{notif.time}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop" />
                      <AvatarFallback>VP</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline font-medium">Vibe Productions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6 lg:p-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Welcome back, Vibe Productions!</h1>
            <p className="text-muted-foreground mt-1">Here&apos;s what&apos;s happening with your events</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-destructive'}`}>
                        {stat.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {stat.change}
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Events */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Events</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/organizer/events">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Event</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tickets</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Revenue</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEvents.map((event) => (
                      <tr key={event.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                        <td className="py-3 px-4 font-medium">{event.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{event.date}</td>
                        <td className="py-3 px-4">
                          <Badge variant={
                            event.status === 'upcoming' ? 'default' :
                            event.status === 'draft' ? 'secondary' : 'outline'
                          } className={
                            event.status === 'upcoming' ? 'bg-primary/10 text-primary' :
                            event.status === 'draft' ? 'bg-accent/10 text-accent' : ''
                          }>
                            {event.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{event.tickets.toLocaleString()}</td>
                        <td className="py-3 px-4">{event.revenue} FCFA</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            Manage
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="cursor-pointer hover:border-primary/50 transition-colors">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl cameroon-gradient flex items-center justify-center">
                  <Plus className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Create New Event</h3>
                  <p className="text-sm text-muted-foreground">Start planning your next event</p>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:border-primary/50 transition-colors">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">View Analytics</h3>
                  <p className="text-sm text-muted-foreground">Check your performance stats</p>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:border-primary/50 transition-colors">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Users className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Manage Attendees</h3>
                  <p className="text-sm text-muted-foreground">View and export guest lists</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
