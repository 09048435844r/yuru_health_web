'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FoldableLayoutProps {
  children: ReactNode
  className?: string
}

export function FoldableLayout({ children, className }: FoldableLayoutProps) {
  return (
    <div className={cn(
      // Base: モバイルファースト
      'px-4 py-2',
      // カバーディスプレイ (~280px): 縦スクロール最適化
      'max-[320px]:px-2 max-[320px]:py-1',
      // タブレット (768px+): 2カラム
      'md:px-6 md:py-4',
      // メインディスプレイ (1768px+): 3-4カラム
      'min-[1768px]:px-8 min-[1768px]:py-6',
      className
    )}>
      {children}
    </div>
  )
}

interface ResponsiveGridProps {
  children: ReactNode
  className?: string
}

export function ResponsiveGrid({ children, className }: ResponsiveGridProps) {
  return (
    <div className={cn(
      // Base: 1カラム
      'grid grid-cols-1 gap-4',
      // カバーディスプレイ: gap縮小
      'max-[320px]:gap-2',
      // タブレット: 2カラム
      'md:grid-cols-2 md:gap-6',
      // メインディスプレイ: 3カラム
      'min-[1768px]:grid-cols-3 min-[1768px]:gap-8',
      className
    )}>
      {children}
    </div>
  )
}

interface MetricsGridProps {
  children: ReactNode
  className?: string
}

export function MetricsGrid({ children, className }: MetricsGridProps) {
  return (
    <div className={cn(
      // Base: 縦積み
      'flex flex-col gap-3',
      // カバーディスプレイ: gap縮小
      'max-[320px]:gap-2',
      // タブレット: 横並び2列
      'md:flex-row md:flex-wrap md:gap-4',
      // メインディスプレイ: 横並び4列
      'min-[1768px]:gap-6',
      className
    )}>
      {children}
    </div>
  )
}
