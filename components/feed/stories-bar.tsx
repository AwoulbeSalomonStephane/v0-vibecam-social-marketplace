'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const stories = [
  {
    id: 'create',
    type: 'create' as const,
    user: { name: 'Your Story', avatar: '' },
  },
  {
    id: '1',
    type: 'story' as const,
    user: {
      name: 'Vibe Events',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    },
    hasNewStory: true,
    previewImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    type: 'story' as const,
    user: {
      name: 'Beach Club',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    },
    hasNewStory: true,
    previewImage: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    type: 'story' as const,
    user: {
      name: 'Club 237',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    },
    hasNewStory: true,
    previewImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    type: 'story' as const,
    user: {
      name: 'Kribi Resort',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    },
    hasNewStory: false,
    previewImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: '5',
    type: 'story' as const,
    user: {
      name: 'DJ Maestro',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&auto=format&fit=crop&q=80',
    },
    hasNewStory: true,
    previewImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: '6',
    type: 'story' as const,
    user: {
      name: 'Culture Hub',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    },
    hasNewStory: false,
    previewImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&auto=format&fit=crop&q=80',
  },
]

const storyContent = [
  {
    id: '1',
    userId: '1',
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80',
    caption: 'Pool party this weekend! Get your tickets now',
    timestamp: '2h ago',
  },
  {
    id: '2',
    userId: '2',
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=80',
    caption: 'Sunset vibes at the beach',
    timestamp: '4h ago',
  },
]

interface StoryViewerProps {
  storyId: string
  onClose: () => void
}

function StoryViewer({ storyId, onClose }: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const story = stories.find(s => s.id === storyId && s.type === 'story')
  
  if (!story || story.type !== 'story') return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <X className="h-6 w-6 text-white" />
      </button>

      {/* Navigation */}
      <button
        onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
        className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={onClose}
        className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Story Content */}
      <div className="relative w-full max-w-md aspect-[9/16] mx-4">
        <Image
          src={story.previewImage}
          alt="Story"
          fill
          className="object-cover rounded-2xl"
        />
        
        {/* Progress Bar */}
        <div className="absolute top-4 left-4 right-4 flex gap-1">
          <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
              className="h-full bg-white"
              onAnimationComplete={onClose}
            />
          </div>
        </div>

        {/* User Info */}
        <div className="absolute top-8 left-4 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
            <Image
              src={story.user.avatar}
              alt={story.user.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{story.user.name}</p>
            <p className="text-white/70 text-xs">2h ago</p>
          </div>
        </div>

        {/* Caption */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white text-sm bg-black/30 backdrop-blur-sm rounded-lg p-3">
            Pool party this weekend! Get your tickets now
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function StoriesBar() {
  const [selectedStory, setSelectedStory] = useState<string | null>(null)

  return (
    <>
      <div className="bg-card border-b border-border">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            {stories.map((story) => (
              <button
                key={story.id}
                onClick={() => story.type === 'story' && setSelectedStory(story.id)}
                className="flex flex-col items-center gap-2 flex-shrink-0"
              >
                <div
                  className={cn(
                    'relative w-16 h-16 rounded-full p-[2px]',
                    story.type === 'story' && story.hasNewStory
                      ? 'bg-gradient-to-br from-primary to-accent'
                      : 'bg-border'
                  )}
                >
                  {story.type === 'create' ? (
                    <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center">
                      <Plus className="h-6 w-6 text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-background p-[2px]">
                      <Image
                        src={story.user.avatar}
                        alt={story.user.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground truncate w-16 text-center">
                  {story.user.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Story Viewer */}
      <AnimatePresence>
        {selectedStory && (
          <StoryViewer
            storyId={selectedStory}
            onClose={() => setSelectedStory(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
