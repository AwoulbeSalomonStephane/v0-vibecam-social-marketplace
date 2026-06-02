"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  LayoutDashboard, Users, Calendar, Building2, DollarSign, Shield,
  TrendingUp, TrendingDown, Eye, AlertTriangle, CheckCircle, XCircle,
  ChevronRight, Bell, Search, Menu, X, Home, LogOut, Settings,
  BarChart3, Flag, MessageSquare, FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const platformStats = [
  { label: "Total Users", value: "45,234", change: "+12.5%", trend: "up", icon: Users },
  { label: "Active Events", value: "234", change: "+8.2%", trend: "up", icon: Calendar },
  { label: "Listed Villas", value: "89", change: "+15.1%", trend: "up", icon: Building2 },
  { label: "Platform Revenue", value: "12.5M FCFA", change: "+23.4%", trend: "up", icon: DollarSign },
]

const pendingApprovals = [
  { id: 1, type: "organizer", name: "DJ Makossa Events", submitted: "2 hours ago", status: "pending" },
  { id: 2, type: "villa", name: "Sunset Villa Limbe", submitted: "5 hours ago", status: "pending" },
  { id: 3, type: "event", name: "New Year Beach Party", submitted: "1 day ago", status: "pending" },
  { id: 4, type: "organizer", name: "Afro Vibes Production", submitted: "1 day ago", status: "pending" },
]

const recentReports = [
  { id: 1, type: "event", item: "Underground Party Douala", reason: "Inappropriate content", reporter: "Jean P.", date: "Today" },
  { id: 2, type: "user", item: "@fake_profile", reason: "Spam account", reporter: "Admin", date: "Yesterday" },
  { id: 3, type: "review", item: "Review on Villa Paloma", reason: "False information", reporter: "Marie N.", date: "2 days ago" },
]

const recentUsers = [
  { id: 1, name: "Christelle M.", email: "christelle@email.com", type: "user", joined: "Today", status: "active" },
  { id: 2, name: "Vibe Productions", email: "contact@vibe.cm", type: "organizer", joined: "Yesterday", status: "pending" },
  { id: 3, name: "Paul Biya Jr.", email: "paul@email.com", type: "user", joined: "2 days ago", status: "active" },
]

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Calendar, label: "Events", href: "/admin/events" },
  { icon: Building2, label: "Villas", href: "/admin/villas" },
  { icon: Shield, label: "Approvals", href: "/admin/approvals", badge: 4 },
  { icon: Flag, label: "Reports", href: "/admin/reports", badge: 3 },
  { icon: DollarSign, label: "Transactions", href: "/admin/transactions" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminDashboard() {
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
            <Link href="/admin" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-destructive flex items-center justify-center">
                <Shield className="h-4 w-4 text-destructive-foreground" />
              </div>
              <span className="font-bold text-lg">Admin Panel</span>
            </Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </div>
                {item.badge && (
                  <Badge className="bg-destructive text-destructive-foreground h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom */}
          <div className="p-4 border-t border-border">
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <Home className="h-5 w-5" />
              Back to Site
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
                <Input placeholder="Search users, events, villas..." className="pl-9 w-80 bg-secondary/50" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Admin Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex flex-col items-start py-3">
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      New report submitted
                    </span>
                    <span className="text-xs text-muted-foreground">5 min ago</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start py-3">
                    <span className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-accent" />
                      Organizer verification pending
                    </span>
                    <span className="text-xs text-muted-foreground">1 hour ago</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline font-medium">Super Admin</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Activity Log</DropdownMenuItem>
                  <DropdownMenuItem>System Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Platform overview and management</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {platformStats.map((stat, i) => (
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pending Approvals */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    Pending Approvals
                    <Badge className="bg-destructive text-destructive-foreground">{pendingApprovals.length}</Badge>
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/approvals">
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pendingApprovals.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          item.type === 'organizer' ? 'bg-primary/10' :
                          item.type === 'villa' ? 'bg-accent/10' : 'bg-secondary'
                        }`}>
                          {item.type === 'organizer' ? <Users className="h-5 w-5 text-primary" /> :
                           item.type === 'villa' ? <Building2 className="h-5 w-5 text-accent" /> :
                           <Calendar className="h-5 w-5 text-muted-foreground" />}
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">{item.type} - {item.submitted}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Reports */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="h-5 w-5 text-destructive" />
                    Recent Reports
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/reports">
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 text-sm font-medium text-muted-foreground">Type</th>
                          <th className="text-left py-3 text-sm font-medium text-muted-foreground">Item</th>
                          <th className="text-left py-3 text-sm font-medium text-muted-foreground">Reason</th>
                          <th className="text-left py-3 text-sm font-medium text-muted-foreground">Date</th>
                          <th className="text-right py-3 text-sm font-medium text-muted-foreground">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentReports.map((report) => (
                          <tr key={report.id} className="border-b border-border last:border-0">
                            <td className="py-3">
                              <Badge variant="outline" className="capitalize">{report.type}</Badge>
                            </td>
                            <td className="py-3 font-medium">{report.item}</td>
                            <td className="py-3 text-muted-foreground">{report.reason}</td>
                            <td className="py-3 text-muted-foreground">{report.date}</td>
                            <td className="py-3 text-right">
                              <Button variant="ghost" size="sm">Review</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Users */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>New Users</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/users">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{user.type}</p>
                        </div>
                      </div>
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className={user.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}>
                        {user.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Today&apos;s Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">New Users</span>
                    <span className="font-semibold">+127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tickets Sold</span>
                    <span className="font-semibold">+456</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Bookings</span>
                    <span className="font-semibold">+23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-semibold text-green-600">+1.2M FCFA</span>
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      API Server
                    </span>
                    <span className="text-sm text-green-600">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Database
                    </span>
                    <span className="text-sm text-green-600">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Payment Gateway
                    </span>
                    <span className="text-sm text-green-600">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      CDN
                    </span>
                    <span className="text-sm text-accent">Degraded</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
