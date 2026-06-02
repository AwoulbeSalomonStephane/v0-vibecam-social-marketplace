'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Users,
  Heart,
  SlidersHorizontal,
  X,
  ChevronDown,
} from 'lucide-react'
import { Navbar, MobileNav } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'all', name: 'All Events', icon: '🎉' },
  { id: 'pool-parties', name: 'Pool Parties', icon: '🏊' },
  { id: 'concerts', name: 'Concerts', icon: '🎵' },
  { id: 'festivals', name: 'Festivals', icon: '🎪' },
  { id: 'nightlife', name: 'Nightlife', icon: '🌙' },
  { id: 'cultural', name: 'Cultural', icon: '🎭' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'conferences', name: 'Conferences', icon: '💼' },
  { id: 'tourism', name: 'Tourism', icon: '🗺️' },
  { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦' },
]

const cities = ['All Cities', 'Douala', 'Yaoundé', 'Kribi', 'Limbe', 'Buea', 'Bamenda', 'Bafoussam']

const events = [
  {
    id: '1',
    title: 'Sunset Pool Party',
    organizer: { name: 'Vibe Events', verified: true },
    date: 'Dec 15, 2025',
    time: '4:00 PM',
    location: 'Douala',
    venue: 'Aqua Palace',
    price: 15000,
    currency: 'XAF',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80',
    attendees: 234,
    likes: 456,
    ticketsLeft: 45,
    category: 'Pool Party',
    featured: true,
  },
  {
    id: '2',
    title: 'Afrobeats Night Live',
    organizer: { name: 'Club 237', verified: true },
    date: 'Dec 18, 2025',
    time: '10:00 PM',
    location: 'Yaoundé',
    venue: 'Club Prestige',
    price: 10000,
    currency: 'XAF',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80',
    attendees: 512,
    likes: 789,
    ticketsLeft: 120,
    category: 'Nightlife',
    featured: false,
  },
  {
    id: '3',
    title: 'Beach Festival 2025',
    organizer: { name: 'Kribi Events', verified: true },
    date: 'Dec 20-22, 2025',
    time: 'All Day',
    location: 'Kribi',
    venue: 'Kribi Beach',
    price: 25000,
    currency: 'XAF',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=80',
    attendees: 1200,
    likes: 1543,
    ticketsLeft: 300,
    category: 'Festival',
    featured: true,
  },
  {
    id: '4',
    title: 'Jazz & Wine Evening',
    organizer: { name: 'Culture Hub', verified: true },
    date: 'Dec 16, 2025',
    time: '7:00 PM',
    location: 'Douala',
    venue: 'Le Meridien',
    price: 20000,
    currency: 'XAF',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    attendees: 89,
    likes: 234,
    ticketsLeft: 15,
    category: 'Concert',
    featured: false,
  },
  {
    id: '5',
    title: 'Tech Conference Cameroon',
    organizer: { name: 'Tech Hub CMR', verified: false },
    date: 'Dec 25, 2025',
    time: '9:00 AM',
    location: 'Douala',
    venue: 'Palais des Congrès',
    price: 50000,
    currency: 'XAF',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    attendees: 450,
    likes: 320,
    ticketsLeft: 50,
    category: 'Conference',
    featured: false,
  },
  {
    id: '6',
    title: 'Cultural Dance Festival',
    organizer: { name: 'Heritage Cameroon', verified: true },
    date: 'Dec 28, 2025',
    time: '2:00 PM',
    location: 'Yaoundé',
    venue: 'Cultural Center',
    price: 5000,
    currency: 'XAF',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop&q=80',
    attendees: 678,
    likes: 890,
    ticketsLeft: 200,
    category: 'Cultural',
    featured: true,
  },
]

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price)
}

function EventCard({ event, index }: { event: typeof events[0]; index: number }) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/events/${event.id}`}>
        <div className="relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                {event.category}
              </Badge>
              {event.featured && (
                <Badge className="bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
            </div>

            {/* Like Button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsLiked(!isLiked)
              }}
              className="absolute top-3 right-3 p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Heart className={cn('h-4 w-4', isLiked && 'fill-red-500 text-red-500')} />
            </button>

            {/* Tickets Left Badge */}
            {event.ticketsLeft < 50 && (
              <div className="absolute bottom-3 left-3">
                <Badge variant="destructive" className="text-xs">
                  Only {event.ticketsLeft} tickets left
                </Badge>
              </div>
            )}

            {/* Price Badge */}
            <div className="absolute bottom-3 right-3">
              <Badge variant="secondary" className="bg-primary text-primary-foreground text-sm font-semibold px-3 py-1">
                {formatPrice(event.price, event.currency)}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{event.date} • {event.time}</span>
            </div>
            
            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
              {event.title}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <MapPin className="h-4 w-4" />
              <span>{event.venue}, {event.location}</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {event.attendees}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {event.likes}
                </span>
              </div>
              <span className="text-sm font-medium text-primary">
                by {event.organizer.name}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 100000])

  return (
    <div className="space-y-6">
      {/* Date Filter */}
      <div>
        <h4 className="font-semibold mb-3">Date</h4>
        <div className="space-y-2">
          {['Today', 'Tomorrow', 'This Weekend', 'This Week', 'This Month'].map((date) => (
            <label key={date} className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm">{date}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            defaultValue={[0, 100000]}
            max={100000}
            step={5000}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(priceRange[0], 'XAF')}</span>
            <span>{formatPrice(priceRange[1], 'XAF')}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-semibold mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.slice(1).map((category) => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Event Type */}
      <div>
        <h4 className="font-semibold mb-3">Event Type</h4>
        <div className="space-y-2">
          {['In-Person', 'Virtual', 'Hybrid'].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('All Cities')

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-20 md:pb-0">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Discover Events</h1>
            <p className="text-muted-foreground mb-6">
              Find the hottest events happening near you
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search events, artists, venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12"
                />
              </div>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full sm:w-48 h-12">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-12 lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar py-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-20 bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </h3>
                <FilterSidebar />
              </div>
            </aside>

            {/* Events Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{events.length}</span> events
                </p>
                <Select defaultValue="date">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Events
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
