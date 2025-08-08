"use client"

import { RefreshCw } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
}

export function LoadingSpinner({ size = "md", text = "加载中...", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className="animate-spin">
        <RefreshCw className={`${sizeClasses[size]} text-purple-600`} />
      </div>
      {text && (
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {text}
        </p>
      )}
    </div>
  )
}

interface LoadingCardProps {
  count?: number
}

export function LoadingCard({ count = 1 }: LoadingCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-800 rounded-lg p-6"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded animate-pulse"></div>
                <div className="h-3 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded animate-pulse w-3/4"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded animate-pulse"></div>
              <div className="h-3 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded animate-pulse w-5/6"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

interface ErrorDisplayProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorDisplay({ 
  title = "出错了", 
  message = "抱歉，出现了一些问题，请稍后再试。", 
  onRetry,
  className = "" 
}: ErrorDisplayProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="mb-6">
        <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            重试
          </button>
        )}
      </div>
    </div>
  )
}

interface EmptyStateProps {
  title?: string
  message?: string
  action?: {
    label: string
    onClick: () => void
  }
  icon?: React.ReactNode
  className?: string
}

export function EmptyState({ 
  title = "暂无数据", 
  message = "这里还没有任何内容。", 
  action,
  icon,
  className = "" 
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="mb-6">
        {icon && (
          <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {message}
        </p>
        {action && (
          <button
            onClick={action.onClick}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  )
}