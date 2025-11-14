import { createFileRoute } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { Menu } from '@/components/menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'

export const Route = createFileRoute('/_authenticated/settings')({
  component: Settings,
})

function Settings() {
  const { user } = Route.useRouteContext()
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

      <div className="flex flex-row items-center justify-center pb-10">
        <Avatar>
          <AvatarImage
            src={user.image ? user.image : undefined}
            alt="User avatar"
          />
          <AvatarFallback className="bg-teal-500 text-stone-200">
            {user.name[0]}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-start justify-center pl-3">
          <p className="text-lg">{user.name}</p>
          <p className="text-sm text-stone-500">{user.email}</p>
        </div>
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
