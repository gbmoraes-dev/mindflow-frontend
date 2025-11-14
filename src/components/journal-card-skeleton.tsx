import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from './ui/skeleton'

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  )
}
