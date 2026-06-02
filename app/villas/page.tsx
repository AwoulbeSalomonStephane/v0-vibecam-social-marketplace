'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Search,
  MapPin,
  Star,
  Heart,
  SlidersHorizontal,
  Bed,
  Bath,
  Users,
  Wifi,
  Car,
  Waves,
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

const cities = ['All Cities', 'Kribi', 'Douala', 'Limbe', 'Yaoundé', 'Buea', 'Bafoussam']

const amenities = [
  { id: 'pool', name: 'Swimming Pool', icon: Waves },
  { id: 'wifi', name: 'WiFi', icon: Wifi },
  { id: 'parking', name: 'Parking', icon: Car },
  { id: 'beach', name: 'Beach Access', icon: Waves },
]

const villas = [
  {
    id: '1',
    name: 'Ocean View Paradise',
    owner: { name: 'Jean-Pierre M.', verified: true },
    location: 'Kribi',
    pricePerNight: 150000,
    currency: 'XAF',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 4.9,
    reviews: 48,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    amenities: ['Pool', 'WiFi', 'Parking', 'Beach Access', 'BBQ'],
    featured: true,
    instantBook: true,
  },
  {
    id: '2',
    name: 'Luxury Hillside Retreat',
    owner: { name: 'Marie C.', verified: true },
    location: 'Limbe',
    pricePerNight: 120000,
    currency: 'XAF',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 4.8,
    reviews: 32,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ['Pool', 'WiFi', 'Garden', 'BBQ'],
    featured: false,
    instantBook: false,
  },
  {
    id: '3',
    name: 'Modern City Penthouse',
    owner: { name: 'Emmanuel A.', verified: true },
    location: 'Douala',
    pricePerNight: 200000,
    currency: 'XAF',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 5.0,
    reviews: 67,
    bedrooms: 5,
    bathrooms: 4,
    guests: 10,
    amenities: ['Pool', 'WiFi', 'Gym', 'Concierge', 'City View'],
    featured: true,
    instantBook: true,
  },
  {
    id: '4',
    name: 'Tropical Garden Estate',
    owner: { name: 'Fatou N.', verified: false },
    location: 'Yaoundé',
    pricePerNight: 95000,
    currency: 'XAF',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 4.7,
    reviews: 23,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ['Pool', 'WiFi', 'Garden', 'Parking'],
    featured: false,
    instantBook: true,
  },
  {
    id: '5',
    name: 'Beachfront Villa Deluxe',
    owner: { name: 'Paul K.', verified: true },
    location: 'Kribi',
    pricePerNight: 180000,
    currency: 'XAF',
    images: [
      'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 4.9,
    reviews: 56,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    amenities: ['Beach Access', 'WiFi', 'Pool', 'Kitchen', 'BBQ'],
    featured: true,
    instantBook: false,
  },
  {
    id: '6',
    name: 'Mountain View Chalet',
    owner: { name: 'Grace M.', verified: true },
    location: 'Buea',
    pricePerNight: 85000,
    currency: 'XAF',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80',
    ],
    rating: 4.6,
    reviews: 19,
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    amenities: ['WiFi', 'Fireplace', 'Mountain View', 'Parking'],
    featured: false,
    instantBook: true,
  },
]

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price)
}

function VillaCard({ villa, index }: { villa: typeof villas[0]; index: number }) {
  const [isLiked, setIsLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/villas/${villa.id}`}>
        <div className="relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={villa.images[currentImageIndex]}
              alt={villa.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {villa.featured && (
                <Badge className="bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
              {villa.instantBook && (
                <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                  Instant Book
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

            {/* Price Badge */}
            <div className="absolute bottom-3 left-3">
              <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <span className="text-lg font-bold">{formatPrice(villa.pricePerNight, villa.currency)}</span>
                <span className="text-sm text-muted-foreground"> /night</span>
              </div>
            </div>

            {/* Image indicators */}
            {villa.images.length > 1 && (
              <div className="absolute bottom-3 right-3 flex gap-1">
                {villa.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'w-1.5 h-1.5 rounded-full transition-all',
                      idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-semibold">{villa.rating}</span>
                <span className="text-sm text-muted-foreground">({villa.reviews})</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {villa.location}
              </div>
            </div>
            
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
              {villa.name}
            </h3>

            {/* Specs */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                {villa.bedrooms} beds
              </span>
              <span className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                {villa.bathrooms} baths
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {villa.guests} guests
              </span>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-1.5">
              {villa.amenities.slice(0, 3).map((amenity) => (
                <Badge key={amenity} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {villa.amenities.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{villa.amenities.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 300000])
  const [bedrooms, setBedrooms] = useState([1, 6])

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-3">Price per Night</h4>
        <div className="px-2">
          <Slider
            defaultValue={[0, 300000]}
            max={300000}
            step={10000}
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

      {/* Bedrooms */}
      <div>
        <h4 className="font-semibold mb-3">Bedrooms</h4>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, '6+'].map((num) => (
            <Button key={num} variant="outline" size="sm" className="px-4">
              {num}
            </Button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h4 className="font-semibold mb-3">Amenities</h4>
        <div className="space-y-2">
          {['Swimming Pool', 'WiFi', 'Parking', 'Beach Access', 'BBQ', 'Garden', 'Gym', 'Kitchen'].map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <h4 className="font-semibold mb-3">Property Type</h4>
        <div className="space-y-2">
          {['Villa', 'Apartment', 'House', 'Penthouse', 'Cottage'].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Booking Options */}
      <div>
        <h4 className="font-semibold mb-3">Booking Options</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox />
            <span className="text-sm">Instant Book</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox />
            <span className="text-sm">Free Cancellation</span>
          </label>
        </div>
      </div>

      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}

export default function VillasPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('All Cities')

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-20 md:pb-0">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Luxury Villas</h1>
            <p className="text-muted-foreground mb-6">
              Find your perfect getaway from our curated collection of premium properties
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search villas, amenities..."
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

        {/* Quick Filters */}
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar py-4">
              {['All', 'Pool', 'Beachfront', 'City View', 'Mountain', 'Garden', 'Luxury'].map((filter) => (
                <button
                  key={filter}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                    filter === 'All'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  )}
                >
                  {filter}
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
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </h3>
                <FilterSidebar />
              </div>
            </aside>

            {/* Villas Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{villas.length}</span> properties
                </p>
                <Select defaultValue="recommended">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {villas.map((villa, index) => (
                  <VillaCard key={villa.id} villa={villa} index={index} />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Villas
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
