"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  MapPin, Calendar, Users, Star, Heart, MessageCircle, 
  Share2, BadgeCheck, Music, Sparkles, Trophy, ExternalLink,
  Instagram, Twitter, Globe, Play, TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

const organizer = {
  id: "1",
  name: "Vibe Productions",
  handle: "@vibeproductions",
  avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&h=500&fit=crop",
  bio: "Cameroon&apos;s premier event production company. We create unforgettable experiences across music, nightlife, and cultural events. Let&apos;s party!",
  location: "Douala & Yaounde",
  joinedDate: "January 2021",
  followers: 45600,
  eventsHosted: 234,
  totalAttendees: 150000,
  rating: 4.9,
  reviewCount: 1847,
  isVerified: true,
  categories: ["Nightlife", "Concerts", "Festivals", "Pool Parties"],
  socials: {
    instagram: "vibeproductions",
    twitter: "vibeprod237",
    website: "vibeproductions.cm",
  },
  stats: {
    thisMonth: 8,
    avgAttendance: 650,
    repeatRate: "78%",
  },
}

const upcomingEvents = [
  {
    id: 1,
    title: "Afro Nation Douala",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop",
    date: "Dec 21, 2024",
    time: "8:00 PM",
    location: "Stade Omnisport",
    price: "15,000 FCFA",
    attendees: 2340,
    isFeatured: true,
  },
  {
    id: 2,
    title: "White Pool Party",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop",
    date: "Dec 25, 2024",
    time: "2:00 PM",
    location: "Villa Paloma, Kribi",
    price: "10,000 FCFA",
    attendees: 180,
    isFeatured: false,
  },
  {
    id: 3,
    title: "NYE Countdown 2025",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
    date: "Dec 31, 2024",
    time: "10:00 PM",
    location: "Hilton Yaounde",
    price: "25,000 FCFA",
    attendees: 890,
    isFeatured: true,
  },
]

const pastEvents = [
  {
    id: 4,
    title: "Summer Splash Festival",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=300&fit=crop",
    date: "Aug 15, 2024",
    attendees: 3200,
    rating: 4.8,
  },
  {
    id: 5,
    title: "Afrobeats Night",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
    date: "Jul 28, 2024",
    attendees: 890,
    rating: 4.9,
  },
]

const reviews = [
  {
    id: 1,
    user: { name: "Pascal N.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    rating: 5,
    event: "Afro Nation Douala 2023",
    comment: "The best event I&apos;ve ever attended in Cameroon! Sound quality was amazing, the lineup was fire, and the organization was top-notch.",
    date: "Dec 2023",
  },
  {
    id: 2,
    user: { name: "Ines M.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    rating: 5,
    event: "Summer Splash 2024",
    comment: "Vibe Productions never disappoints! The pool party was incredible, great music, beautiful venue, and amazing crowd.",
    date: "Aug 2024",
  },
]

export default function OrganizerProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        {/* Cover Image */}
        <div className="relative h-56 md:h-72 lg:h-96">
          <Image
            src={organizer.coverImage}
            alt="Cover"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <Play className="h-8 w-8 text-white fill-white ml-1" />
            </motion.button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4">
          {/* Profile Header */}
          <div className="relative -mt-16 md:-mt-20 mb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative"
              >
                <Avatar className="h-28 w-28 md:h-40 md:w-40 border-4 border-background ring-4 ring-primary/20">
                  <AvatarImage src={organizer.avatar} />
                  <AvatarFallback className="text-3xl">{organizer.name[0]}</AvatarFallback>
                </Avatar>
                {organizer.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-2">
                    <BadgeCheck className="h-6 w-6 text-primary-foreground" />
                  </div>
                )}
              </motion.div>

              {/* Name & Actions */}
              <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold">{organizer.name}</h1>
                    <Badge className="bg-primary/10 text-primary">Organizer</Badge>
                  </div>
                  <p className="text-muted-foreground">{organizer.handle}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="font-semibold">{organizer.rating}</span>
                    <span className="text-muted-foreground">({organizer.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    size="lg"
                    className={isFollowing ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : "cameroon-gradient text-primary-foreground"}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline" size="lg">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="mt-6 text-foreground max-w-2xl text-lg">{organizer.bio}</p>

            {/* Meta & Social Links */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {organizer.location}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Since {organizer.joinedDate}
              </span>
              <div className="flex items-center gap-3">
                <a href={`https://instagram.com/${organizer.socials.instagram}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href={`https://twitter.com/${organizer.socials.twitter}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href={`https://${organizer.socials.website}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <Globe className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-card border border-border rounded-xl p-4 text-center card-shadow">
                <p className="text-2xl font-bold text-foreground">{organizer.followers.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 text-center card-shadow">
                <p className="text-2xl font-bold text-foreground">{organizer.eventsHosted}</p>
                <p className="text-sm text-muted-foreground">Events Hosted</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 text-center card-shadow">
                <p className="text-2xl font-bold text-foreground">{(organizer.totalAttendees / 1000).toFixed(0)}K+</p>
                <p className="text-sm text-muted-foreground">Total Attendees</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 text-center card-shadow">
                <p className="text-2xl font-bold text-foreground">{organizer.stats.repeatRate}</p>
                <p className="text-sm text-muted-foreground">Repeat Guests</p>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-6">
              {organizer.categories.map((cat, i) => (
                <Badge key={i} variant="secondary" className="py-1.5 px-4">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="upcoming" className="pb-12">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="upcoming" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Upcoming Events
              </TabsTrigger>
              <TabsTrigger 
                value="past" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Past Events
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                <Star className="h-4 w-4 mr-2" />
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-6">
              <div className="grid gap-6">
                {upcomingEvents.map((event) => (
                  <Link key={event.id} href={`/events/${event.id}`}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className={`bg-card border rounded-2xl overflow-hidden card-shadow flex flex-col md:flex-row ${event.isFeatured ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border'}`}
                    >
                      <div className="relative w-full md:w-72 h-48 md:h-auto flex-shrink-0">
                        <Image src={event.image} alt={event.title} fill className="object-cover" />
                        {event.isFeatured && (
                          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1 p-5 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {event.date} at {event.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{event.attendees.toLocaleString()} going</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-primary">{event.price}</span>
                            <Button size="sm" className="cameroon-gradient text-primary-foreground">
                              Get Tickets
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {pastEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ y: -4 }}
                    className="bg-card border border-border rounded-xl overflow-hidden card-shadow"
                  >
                    <div className="relative aspect-video">
                      <Image src={event.image} alt={event.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/30" />
                      <Badge className="absolute top-3 right-3 bg-background/80 text-foreground">
                        {event.date}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <div className="flex items-center justify-between mt-3 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {event.attendees.toLocaleString()} attended
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          {event.rating}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-card border border-border rounded-xl p-5 card-shadow">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.user.image} />
                        <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{review.user.name}</h4>
                            <p className="text-sm text-muted-foreground">{review.event}</p>
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                          ))}
                        </div>
                        <p className="mt-3 text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6">
                Load More Reviews
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
