import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { auth } from '@/lib/auth'
import { useSignUpData } from './route'

const validation = z.object({
  password: z
    .string()
    .min(8, 'A senha deve conter pelo menos 8 caracteres')
    .max(128),
})

const signUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
})

type SignUpSchema = z.infer<typeof signUpSchema>

export const Route = createFileRoute('/sign-up/password')({
  component: SignUpPassword,
})

function SignUpPassword() {
  const navigate = Route.useNavigate()
  const { formData } = useSignUpData()

  const form = useForm({
    defaultValues: {
      password: '',
    },
    validators: {
      onChange: validation,
    },
    onSubmit: async ({ value }) => {
      if (!formData.email || !formData.name) {
        return navigate({ to: '/sign-up' })
      }

      const data = {
        email: formData.email,
        name: formData.name,
        password: value.password,
      }

      await handleEmailSignUp(data)

      navigate({ to: '/home' })
    },
    onSubmitInvalid: ({ formApi }) => {
      const fields = ['password'] as const

      const firstError = fields
        .map((field) => formApi.getFieldMeta(field)?.errors?.[0])
        .find(Boolean)

      if (firstError) {
        toast.error(firstError.message)
      }
    },
  })

  async function handleEmailSignUp({ name, email, password }: SignUpSchema) {
    const { error } = await auth.signUp.email({
      name,
      email,
      password,
      callbackURL: 'http://localhost:5173/home',
    })

    if (error) {
      toast.error('Não foi possível criar a conta')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/mindflow.svg" alt="Mindflow" />
      <div className="flex flex-row gap-2 w-50 p-5">
        <div className="h-0.5 w-1/3 rounded bg-teal-400"></div>
        <div className="h-0.5 w-1/3 rounded bg-teal-400"></div>
        <div className="h-0.5 w-1/3 rounded bg-stone-200"></div>
      </div>

      <div className="flex flex-col gap-2 items-center justify-center pb-5 md:gap-4">
        <h1 className="text-stone-800 text-3xl md:text-5xl font-bold">
          Crie sua senha.
        </h1>
        <p className="text-stone-500 text-sm md:text-lg">
          Deve conter pelo menos 8 caracteres.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        noValidate
        className="flex flex-col gap-3 w-75 md:w-100 md:gap-5"
      >
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
      <Link to="/sign-up/name" className="text-teal-500 font-semibold pt-2">
        Voltar
      </Link>
    </div>
  )
}
