import { cn } from "@/utils/cn"
import { Button } from "@/components/ui/button"
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  PenBox,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react"
import { Playlist } from "./data/playlists"
import Link from "next/link"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[]
}

export function Sidebar({ className, playlists }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Certificate
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>

              Certificate List
            </Button>
            <Link href="/studio">
              <Button variant="ghost" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                Create Template
              </Button>
            </Link>

          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            NFT
          </h2>
          <div className="space-y-1">


            <Button variant="ghost" className="w-full justify-start">
              <File className="h-4 w-4" /> Drafts

            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Send className="h-4 w-4" />
              Sent
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Trash2 className="h-4 w-4" />
              Trash
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Archive className="h-4 w-4" />
              Archive
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
