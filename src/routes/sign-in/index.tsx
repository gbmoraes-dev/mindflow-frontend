import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { FieldGroup, FieldSeparator } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { auth } from '@/lib/auth'

const signInSchema = z.object({
  email: z.email('Por favor, insira um email válido'),
  password: z
    .string()
    .min(8, 'A senha deve conter pelo menos 8 caracteres')
    .max(128),
})

type SignInSchema = z.infer<typeof signInSchema>

export const Route = createFileRoute('/sign-in/')({
  component: SignIn,
})

function SignIn() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: signInSchema,
    },
    onSubmit: async ({ value }) => {
      await handleEmailSignIn(value)
    },
    onSubmitInvalid: ({ formApi }) => {
      const fields = ['email', 'password'] as const

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

  async function handleEmailSignIn({ email, password }: SignInSchema) {
    const { error } = await auth.signIn.email({
      email,
      password,
      callbackURL: 'http://localhost:5173/home',
    })

    if (error) {
      toast.error('Email ou senha inválidos')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col gap-2 items-center justify-center pb-5 md:gap-4">
        <img src="/mindflow.svg" alt="Mindflow" className="pb-5" />
        <h1 className="text-stone-800 text-3xl md:text-5xl font-bold">
          Bem vindo de volta!
        </h1>
        <p className="text-stone-500 text-sm md:text-lg">
          Entre na sua conta MindFlow.
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
        <form.Field name="password">
          {(field) => (
            <Input
              type="password"
              placeholder="Senha"
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
        Não possui uma conta?{' '}
        <Link to="/sign-up" className="text-teal-500 font-semibold">
          Criar
        </Link>
      </span>
    </div>
  )
}
