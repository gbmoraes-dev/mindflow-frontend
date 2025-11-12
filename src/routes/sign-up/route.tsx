import { createFileRoute, Outlet } from '@tanstack/react-router'
import { createContext, useContext, useState } from 'react'
import { z } from 'zod'

const signUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
})

type SignUpSchema = z.infer<typeof signUpSchema>

type SignUpContextType = {
  formData: Partial<SignUpSchema>
  setFormData: (data: Partial<SignUpSchema>) => void
}

const SignUpContext = createContext<SignUpContextType | null>(null)

export function SignUpProvider() {
  const [formData, setFormData] = useState<Partial<SignUpSchema>>({})

  const updateData = (data: Partial<SignUpSchema>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  return (
    <SignUpContext.Provider value={{ formData, setFormData: updateData }}>
      <Outlet />
    </SignUpContext.Provider>
  )
}

export function useSignUpData() {
  const context = useContext(SignUpContext)

  if (!context) {
    throw new Error('useSignUpData must be used within a SignUpProvider')
  }

  return context
}

export const Route = createFileRoute('/sign-up')({
  component: SignUpProvider,
})
