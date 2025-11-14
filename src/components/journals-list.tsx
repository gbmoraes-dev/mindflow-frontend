import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { journalListSchema } from '@/http/schemas/journals'
import { JournalCard } from './journal-card'

export function JournalsList() {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ['journals'],
      queryFn: async ({ pageParam }) => {
        const url = new URL('http://localhost:3333/journal')

        if (pageParam) {
          url.searchParams.set('cursor', pageParam)
        }

        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
        })

        const data = await response.json()

        return journalListSchema.parse(data)
      },
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor ?? undefined
      },
      initialPageParam: undefined as string | undefined,
    })

  const journals = data.pages.flatMap((page) => page.journals)

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <>
      {journals.map((journal) => (
        <JournalCard key={journal.id} journal={journal} />
      ))}

      <div ref={loadMoreRef} className="col-span-2 md:col-span-3" />
      {isFetchingNextPage && (
        <div className="col-span-2 md:col-span-3 text-center text-muted-foreground">
          Carregando mais...
        </div>
      )}
    </>
  )
}
