import { createFileRoute } from '@tanstack/react-router'
import { CirclePlus } from 'lucide-react'
import { Menu } from '@/components/menu'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const Route = createFileRoute('/_authenticated/home')({
  component: Home,
})

function Home() {
  const { user } = Route.useRouteContext()
  const navigate = Route.useNavigate()

  function handleTodaysWriting() {
    navigate({
      to: '/calendar',
      search: {
        openModal: true,
      },
    })
  }

  return (
    <div className="h-screen pt-20 pb-28 flex flex-col">
      <div className="flex flex-col items-center justify-center">
        <img src="/mindflow.svg" alt="Mindflow" className="" />
      </div>

      <div className="flex flex-col items-left pl-5 text-left gap-1 mt-auto md:items-center">
        <h1 className="text-stone-700 text-4xl md:text-5xl font-bold">
          Bem vindo, {user.name.split(' ')[0]}!
        </h1>
        <span className="text-md text-stone-500 font-semibold">
          Hoje é{' '}
          {new Intl.DateTimeFormat('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          }).format(new Date())}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center mt-auto">
        <Card className="w-85 h-100 relative overflow-hidden">
          <img
            src="/effect.svg"
            alt="Mindflow"
            className="absolute inset-0 z-0 h-full w-full object-cover text-teal-500"
          />
          <div className="relative z-10 flex h-full flex-col">
            <CardHeader className="mb-auto pt-5">
              <CardTitle className="text-center text-xl font-medium text-stone-700">
                Como você está se sentindo hoje?
              </CardTitle>
            </CardHeader>
            <CardContent className="mb-auto pt-5">
              <p className="text-stone-600">
                Escreva livremente sobre o seu dia. Seus pensamentos são
                analisados de forma privada por IA para te ajudar a identificar
                padrões.
              </p>
            </CardContent>
            <CardFooter className="items-center justify-center mt-auto pt-5">
              <Button
                variant="outline"
                size="lg"
                onClick={handleTodaysWriting}
                className="bg-stone-50 text-stone-400 rounded-full w-60"
              >
                <CirclePlus /> Escrever sobre hoje
              </Button>
            </CardFooter>
          </div>
        </Card>
      </div>

      <Menu />
    </div>
  )
}
