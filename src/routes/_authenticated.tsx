import { createFileRoute, redirect } from '@tanstack/react-router'
import { auth } from '@/lib/auth'

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
})
