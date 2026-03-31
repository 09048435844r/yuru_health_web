'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  Home, 
  LineChart, 
  Brain, 
  Utensils, 
  Settings, 
  Activity 
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'ダッシュボード', icon: Home },
  { href: '/timeline', label: 'Timeline', icon: LineChart },
  { href: '/insights', label: 'AI Insights', icon: Brain },
  { href: '/intake', label: '摂取記録', icon: Utensils },
  { href: '/settings', label: '設定', icon: Settings },
  { href: '/health', label: 'サーバー', icon: Activity },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background">
      <div className="flex items-center overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap',
                'hover:bg-accent hover:text-accent-foreground',
                'max-[320px]:px-2 max-[320px]:text-xs',
                'min-[1768px]:px-6',
                isActive 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground'
              )}
            >
              <Icon className="h-4 w-4 max-[320px]:h-3 max-[320px]:w-3" />
              <span className="max-[320px]:hidden">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
