import { z } from 'zod/v4'

const viteEnvSchema = z.object({
  MODE: z.enum(['development', 'production', 'test']).default('development'),
  VITE_BASE_URL: z.string(),
  VITE_BACKEND_URL: z.string(),
})

const parsedViteEnv = viteEnvSchema.parse(import.meta.env)

export const env = {
  NODE_ENV: parsedViteEnv.MODE,
  BASE_URL: parsedViteEnv.VITE_BASE_URL,
  BACKEND_URL: parsedViteEnv.VITE_BACKEND_URL,
}
