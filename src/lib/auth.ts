import { createAuthClient } from 'better-auth/react'

export const auth = createAuthClient({
  baseURL: process.env.VITE_BACKEND_URL,
})
