'use client'
import { UserButton } from '@clerk/nextjs'
import { FileText, MessageSquare, Settings, Plus, LayoutDashboard } from 'lucide-react'

export type TabType = 'dashboard' | 'my-documents' | 'chat-history' | 'settings'

interface AppSidebarProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  onNewChat: () => void
}

export default function AppSidebar({ activeTab, onTabChange, onNewChat }: AppSidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-documents', label: 'My Documents', icon: FileText },
    { id: 'chat-history', label: 'Chat History', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-full flex-shrink-0 hidden md:flex">
      <div className="p-4 flex items-center gap-2 text-primary font-bold text-lg border-b border-border">
        <FileText className="w-6 h-6" />
        <span className="text-foreground">PDF RAG Chat</span>
      </div>
      
      <div className="p-4">
        <button 
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              activeTab === item.id 
                ? 'bg-secondary text-foreground' 
                : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
            }`}
          >
            <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-primary' : ''}`} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border flex items-center gap-3">
        <UserButton />
        <div className="flex flex-col text-left">
          <span className="text-sm font-medium text-foreground">Account</span>
          <span className="text-xs text-muted-foreground">Manage profile</span>
        </div>
      </div>
    </aside>
  )
}
