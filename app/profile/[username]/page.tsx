"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  MapPin, Calendar, Users, Star, Heart, MessageCircle, 
  Share2, Settings, Grid3X3, Bookmark, Tag, BadgeCheck,
  Camera, Music, Sparkles, Trophy
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

const user = {
  id: "1",
  name: "Christelle Mbarga",
  username: "@christelle_m",
  avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&h=400&fit=crop",
  bio: "Event lover | Party queen | Living my best life in Douala. Always looking for the next vibe!",
  location: "Douala, Cameroon",
  joinedDate: "March 2023",
  followers: 2847,
  following: 892,
  eventsAttended: 156,
  isVerified: true,
  interests: ["Afrobeats", "Pool Parties", "Nightlife", "Beach Events", "Live Music"],
  badges: [
    { icon: Trophy, label: "Top Vibe-r", color: "text-accent" },
    { icon: Camera, label: "Photo Master", color: "text-primary" },
    { icon: Music, label: "Party Animal", color: "text-destructive" },
  ],
}

const posts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop",
    likes: 234,
    comments: 18,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    likes: 189,
    comments: 12,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=400&fit=crop",
    likes: 445,
    comments: 34,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    likes: 312,
    comments: 28,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
    likes: 178,
    comments: 9,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1571266028243-d220c6a74fe4?w=400&h=400&fit=crop",
    likes: 267,
    comments: 21,
  },
]

const savedEvents = [
  {
    id: 1,
    title: "Sunset Beach Party",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop",
    date: "Dec 20, 2024",
    location: "Kribi",
  },
  {
    id: 2,
    title: "NYE Gala Night",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
    date: "Dec 31, 2024",
    location: "Douala",
  },
]

export default function UserProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 lg:h-80">
          <Image
            src={user.coverImage}
            alt="Cover"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4">
          {/* Profile Header */}
          <div className="relative -mt-16 md:-mt-20 mb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative"
              >
                <Avatar className="h-28 w-28 md:h-36 md:w-36 border-4 border-background ring-4 ring-primary/20">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-3xl">{user.name[0]}</AvatarFallback>
                </Avatar>
                {user.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1.5">
                    <BadgeCheck className="h-5 w-5 text-primary-foreground" />
                  </div>
                )}
              </motion.div>

              {/* Name & Actions */}
              <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    {user.name}
                  </h1>
                  <p className="text-muted-foreground">{user.username}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={isFollowing ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : "cameroon-gradient text-primary-foreground"}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="mt-4 text-foreground max-w-xl">{user.bio}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {user.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined {user.joinedDate}
              </span>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-4">
              <button className="hover:underline">
                <span className="font-bold">{user.followers.toLocaleString()}</span>
                <span className="text-muted-foreground ml-1">followers</span>
              </button>
              <button className="hover:underline">
                <span className="font-bold">{user.following.toLocaleString()}</span>
                <span className="text-muted-foreground ml-1">following</span>
              </button>
              <div>
                <span className="font-bold">{user.eventsAttended}</span>
                <span className="text-muted-foreground ml-1">events</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {user.badges.map((badge, i) => (
                <Badge key={i} variant="secondary" className="gap-1.5 py-1.5 px-3">
                  <badge.icon className={`h-3.5 w-3.5 ${badge.color}`} />
                  {badge.label}
                </Badge>
              ))}
            </div>

            {/* Interests */}
            <div className="flex flex-wrap gap-2 mt-4">
              {user.interests.map((interest, i) => (
                <Badge key={i} variant="outline" className="font-normal">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="posts" className="pb-12">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="posts" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                Posts
              </TabsTrigger>
              <TabsTrigger 
                value="saved" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Saved
              </TabsTrigger>
              <TabsTrigger 
                value="tagged" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                <Tag className="h-4 w-4 mr-2" />
                Tagged
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-6">
              <div className="grid grid-cols-3 gap-1 md:gap-3">
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    whileHover={{ scale: 0.98 }}
                    className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg"
                  >
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                      <span className="flex items-center gap-1">
                        <Heart className="h-5 w-5 fill-white" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-5 w-5 fill-white" />
                        {post.comments}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedEvents.map((event) => (
                  <Link key={event.id} href={`/events/${event.id}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-card rounded-xl overflow-hidden border border-border card-shadow"
                    >
                      <div className="relative aspect-video">
                        <Image src={event.image} alt={event.title} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">{event.title}</h3>
                        <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <span>{event.date}</span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tagged" className="mt-6">
              <div className="text-center py-12 text-muted-foreground">
                <Tag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No tagged posts yet</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
