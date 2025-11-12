import { createFileRoute } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { Menu } from '@/components/menu'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'

export const Route = createFileRoute('/_authenticated/settings')({
  component: Settings,
})

function Settings() {
  const navigate = Route.useNavigate()

  async function handleSignOut() {
    await auth.signOut()
    navigate({ to: '/sign-in' })
  }

  return (
    <div className="h-screen pt-20 pb-5 flex flex-col">
      <div className="flex flex-col items-center justify-center">
        <img src="/mindflow.svg" alt="Mindflow" className="pb-10" />
      </div>

      <div className="flex flex-col items-center justify-center">
        <Button
          variant="outline"
          onClick={handleSignOut}
          className="h-10 w-50 text-lg font-semibold text-destructive/60"
        >
          <LogOut className="h-5 w-5" /> Sair
        </Button>
      </div>

      <Menu />
    </div>
  )
}
