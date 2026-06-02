import { Navbar, MobileNav } from '@/components/layout/navbar'
import { StoriesBar } from '@/components/feed/stories-bar'
import { FeedList } from '@/components/feed/feed-post'
import { FeedSidebar } from '@/components/feed/feed-sidebar'

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-20 md:pb-0">
        <StoriesBar />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-8">
            {/* Main Feed */}
            <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
              <FeedList />
            </div>
            {/* Sidebar */}
            <FeedSidebar />
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  )
}
