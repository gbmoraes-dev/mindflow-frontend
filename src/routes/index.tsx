import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: Landing,
})

function Landing() {
  return (
    <div className="h-screen relative">
      <div className="absolute top-0 left-0 w-full h-[45%] bg-pattern bg-no-repeat bg-top z-0" />
      <div className="h-screen flex flex-col items-center justify-center relative px-5">
        <div className="flex flex-col items-center justify-center">
          <img src="/mindflow.svg" alt="MindFlow" className="h-32 w-32 m-5" />
          <div className="flex flex-col items-center text-center">
            <h1 className="text-6xl leading-none font-bold tracking-tighter text-balance">
              Bem vindo ao seu espaço de clareza.
            </h1>
            <p className="pt-5 text-base md:text-xl text-stone-400 leading-relaxed">
              Cansado de sentir ansiedade sem saber exatamente por quê? Conheça
              o MindFlow. O diário inteligente que usa IA para transformar caos
              mental em clareza, de um jeito{' '}
              <span className="italic text-teal-400/70 font-display">
                empático, privado e sem julgamentos
              </span>
              .
            </p>
            <div className="grid grid-cols-2 gap-5 items-center justify-center pt-10">
              <Button
                asChild
                variant="default"
                size="lg"
                className="bg-teal-500"
              >
                <Link to="/sign-up">Começar agora!</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/sign-in">Entrar</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
