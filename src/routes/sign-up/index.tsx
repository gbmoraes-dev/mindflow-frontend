import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { Button } from '../../components/ui/button'
import { FieldGroup, FieldSeparator } from '../../components/ui/field'
import { Input } from '../../components/ui/input'
import { useSignUpData } from './route'

const validation = z.object({
  email: z.email('Por favor, insira um email válido'),
})

export const Route = createFileRoute('/sign-up/')({
  component: SignUp,
})

function SignUp() {
  const navigate = Route.useNavigate()
  const { setFormData } = useSignUpData()

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onChange: validation,
    },
    onSubmit: async ({ value }) => {
      setFormData({ email: value.email })
      navigate({ to: '/sign-up/name' })
    },
    onSubmitInvalid: ({ formApi }) => {
      const fields = ['email'] as const

      const firstError = fields
        .map((field) => formApi.getFieldMeta(field)?.errors?.[0])
        .find(Boolean)

      if (firstError) {
        toast.error(firstError.message)
      }
    },
  })

  async function handleSocialSignIn(provider: 'google' | 'github') {
    await auth.signIn.social({
      provider,
      callbackURL: 'http://localhost:5173/home',
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col gap-2 items-center justify-center pb-5 md:gap-4">
        <img src="/mindflow.svg" alt="Mindflow" className="pb-5" />
        <h1 className="text-stone-800 text-3xl md:text-5xl font-bold">
          Seu espaço para clareza.
        </h1>
        <p className="text-stone-500 text-sm md:text-lg">
          Vamos começar com seu email para criar sua conta.
        </p>
      </div>

      <div className="flex flex-col gap-2 w-75 md:w-100 md:gap-4">
        <Button
          variant="outline"
          size="default"
          className="text-sm md:text-base"
          onClick={() => handleSocialSignIn('github')}
        >
          <img src="/github.svg" alt="Github" className="w-4.5 h-4.5" />
          Continuar com Github
        </Button>
        <Button
          variant="outline"
          size="default"
          className="text-sm md:text-base"
          onClick={() => handleSocialSignIn('google')}
        >
          <img src="/google.svg" alt="Google" className="w-4 h-4" />
          Continuar com Google
        </Button>
      </div>

      <FieldGroup className="w-75 p-5 md:w-100">
        <FieldSeparator>Ou continue com</FieldSeparator>
      </FieldGroup>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        noValidate
        className="flex flex-col gap-2 w-75 md:w-100 md:gap-4"
      >
        <form.Field name="email">
          {(field) => (
            <Input
              type="email"
              placeholder="Email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="text-md md:text-lg text-stone-700 selection:bg-teal-600/30"
            />
          )}
        </form.Field>
        <Button
          type="submit"
          variant="default"
          size="default"
          className="bg-teal-400 text-lg md:text-xl hover:bg-teal-500"
        >
          Continuar <ArrowRight />
        </Button>
      </form>

      <span className="text-sm text-stone-500 pt-2">
        Já possui uma conta?{' '}
        <Link to="/sign-in" className="text-teal-500 font-semibold">
          Entrar
        </Link>
      </span>
    </div>
  )
}
