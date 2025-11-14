import { createFileRoute } from '@tanstack/react-router'
import { CirclePlus } from 'lucide-react'
import { Suspense } from 'react'
import { JournalSkeletonItems } from '@/components/journal-skeleton-items'
import { JournalsList } from '@/components/journals-list'
import { Menu } from '@/components/menu'
import { Button } from '@/components/ui/button'
import { WritingJournal } from '@/components/writing-journal'
import { z } from 'zod'

const calendarSearchSchema = z.object({
  openModal: z.coerce.boolean().catch(false),
})

export const Route = createFileRoute('/_authenticated/calendar')({
  validateSearch: calendarSearchSchema,
  component: CalendarPage,
})

function CalendarPage() {
  const { openModal } = Route.useSearch()
  const navigate = Route.useNavigate()

  function handleModalOpenChange(isOpen: boolean) {
    navigate({
      search: (prev) => ({ ...prev, openModal: isOpen }),
      replace: true,
    })
  }

  return (
    <div className="h-screen pt-20 pb-5 flex flex-col items-center overflow-y-auto">
      <img src="/mindflow.svg" alt="Mindflow" className="pb-10" />

      <div className="w-full max-w-7xl px-4">
        <div className="flex justify-center mb-4">
          <WritingJournal open={openModal} onOpenChange={handleModalOpenChange}>
            <Button
              variant="outline"
              size="default"
              className="text-stone-500 w-56"
            >
              <CirclePlus /> Escrever!
            </Button>
          </WritingJournal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Suspense fallback={<JournalSkeletonItems />}>
            <JournalsList />
          </Suspense>
        </div>
      </div>

      <Menu />
    </div>
  )
}
