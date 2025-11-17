import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface TopicBadgeProps {
  topic: string
  count: number
  maxCount: number
}

export function TopicBadge({ topic, count, maxCount }: TopicBadgeProps) {
  const scale = count / maxCount

  const sizeClasses = cn({
    'text-xs px-2 py-0.5': scale < 0.2,
    'text-sm px-2.5 py-1': scale >= 0.2 && scale < 0.5,
    'text-base px-3 py-1.5': scale >= 0.5 && scale < 0.8,
    'text-lg px-3.5 py-2 font-semibold': scale >= 0.8,
  })

  const colorClasses = cn({
    'bg-stone-200 text-stone-700 hover:bg-stone-300': scale < 0.2,
    'bg-teal-200 text-teal-800 hover:bg-teal-300': scale >= 0.2 && scale < 0.5,
    'bg-teal-400 text-white hover:bg-teal-500': scale >= 0.5 && scale < 0.8,
    'bg-teal-600 text-white hover:bg-teal-700': scale >= 0.8,
  })

  return (
    <Badge
      variant="default"
      className={cn(
        'whitespace-nowrap cursor-pointer transition-all duration-200',
        sizeClasses,
        colorClasses,
      )}
    >
      {topic}
    </Badge>
  )
}
