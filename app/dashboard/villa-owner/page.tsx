"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  LayoutDashboard, Home as HomeIcon, Calendar, DollarSign, Star,
  Plus, TrendingUp, Eye, MessageSquare, Settings, Menu, X,
  ChevronRight, Bell, Search, LogOut, Building2, Users, Bed
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
  { label: "Monthly Revenue", value: "1,850,000 FCFA", change: "+18.3%", trend: "up", icon: DollarSign },
  { label: "Total Bookings", value: "47", change: "+12 this month", trend: "up", icon: Calendar },
  { label: "Page Views", value: "12.4K", change: "+32%", trend: "up", icon: Eye },
  { label: "Avg Rating", value: "4.9", change: "127 reviews", trend: "up", icon: Star },
]

const properties = [
  { 
    id: 1, 
    name: "Villa Paloma Kribi", 
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
    status: "active", 
    bookings: 12, 
    revenue: "1,800,000",
    rating: 4.9,
    occupancy: "78%"
  },
  { 
    id: 2, 
    name: "Beach House Limbe", 
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    status: "active", 
    bookings: 8, 
    revenue: "920,000",
    rating: 4.7,
    occupancy: "65%"
  },
  { 
    id: 3, 
    name: "Mountain Retreat Buea", 
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
    status: "draft", 
    bookings: 0, 
    revenue: "0",
    rating: 0,
    occupancy: "0%"
  },
]

const upcomingBookings = [
  { id: 1, guest: "Jean-Pierre K.", property: "Villa Paloma", dates: "Dec 20-23", guests: 6, status: "confirmed" },
  { id: 2, guest: "Aminata F.", property: "Villa Paloma", dates: "Dec 25-28", guests: 8, status: "pending" },
  { id: 3, guest: "Paul M.", property: "Beach House", dates: "Dec 24-26", guests: 4, status: "confirmed" },
]

const recentMessages = [
  { id: 1, guest: "Sarah N.", message: "Is the pool heated?", time: "10 min ago", unread: true },
  { id: 2, guest: "Marc T.", message: "Thank you for a wonderful stay!", time: "2 hours ago", unread: false },
]

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/villa-owner", active: true },
  { icon: Building2, label: "Properties", href: "/dashboard/villa-owner/properties" },
  { icon: Calendar, label: "Bookings", href: "/dashboard/villa-owner/bookings" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/villa-owner/messages" },
  { icon: DollarSign, label: "Earnings", href: "/dashboard/villa-owner/earnings" },
  { icon: Settings, label: "Settings", href: "/dashboard/villa-owner/settings" },
]

export default function VillaOwnerDashboard() {
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
              <HomeIcon className="h-5 w-5" />
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
                <Input placeholder="Search properties, bookings..." className="pl-9 w-64 bg-secondary/50" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button className="cameroon-gradient text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
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
                  <DropdownMenuItem className="flex flex-col items-start py-3">
                    <span>New booking request</span>
                    <span className="text-xs text-muted-foreground">5 min ago</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start py-3">
                    <span>Payment received: 450,000 FCFA</span>
                    <span className="text-xs text-muted-foreground">1 hour ago</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" />
                      <AvatarFallback>MN</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline font-medium">Marie Ndongo</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Payouts</DropdownMenuItem>
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
            <h1 className="text-2xl md:text-3xl font-bold">Welcome back, Marie!</h1>
            <p className="text-muted-foreground mt-1">Here&apos;s how your properties are performing</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <TrendingUp className="h-4 w-4" />
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Properties */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Your Properties</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/villa-owner/properties">
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="flex gap-4 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer">
                      <div className="relative h-20 w-28 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={property.image} alt={property.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold truncate">{property.name}</h3>
                          <Badge variant={property.status === 'active' ? 'default' : 'secondary'} className={property.status === 'active' ? 'bg-primary/10 text-primary' : ''}>
                            {property.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Bookings</p>
                            <p className="font-medium">{property.bookings}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Revenue</p>
                            <p className="font-medium">{property.revenue}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Occupancy</p>
                            <p className="font-medium">{property.occupancy}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Bookings */}
              <Card className="mt-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Upcoming Bookings</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/villa-owner/bookings">
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{booking.guest[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{booking.guest}</p>
                            <p className="text-sm text-muted-foreground">{booking.property} - {booking.dates}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right text-sm">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              {booking.guests}
                            </div>
                          </div>
                          <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'} className={booking.status === 'confirmed' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Messages */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    Messages
                    <Badge className="bg-destructive text-destructive-foreground">2</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentMessages.map((msg) => (
                    <div key={msg.id} className={`p-3 rounded-lg ${msg.unread ? 'bg-primary/5 border border-primary/20' : 'bg-secondary/30'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{msg.guest}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Messages
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Property
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Update Availability
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Request Payout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
