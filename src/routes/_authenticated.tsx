import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { FullScreenLoader } from '@/components/full-screen-loader'
import { JournalListener } from '@/components/journal-listener'
import { auth } from '@/lib/auth'
import { useJournalStatus } from '@/store/journal-status'

function AuthenticatedLayout() {
  const { status, activeJournalId } = useJournalStatus()

  if (status === 'saving' || status === 'waiting_for_ai') {
    return (
      <>
        <FullScreenLoader />
        {activeJournalId && <JournalListener journalId={activeJournalId} />}
      </>
    )
  }

  return (
    <>
      {status === 'showing_results' && activeJournalId && (
        <JournalListener journalId={activeJournalId} />
      )}

      <Outlet />
    </>
  )
}

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const { data } = await auth.getSession()

    if (!data) {
      throw redirect({ to: '/sign-in' })
    }

    const { user, session } = data

    return {
      user: user,
      session: session,
    }
  },
  component: AuthenticatedLayout,
})
