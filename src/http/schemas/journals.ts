import z from 'zod/v4'

const aiAnalysisSchema = z.object({
  sentiment: z.enum(['positivo', 'negativo', 'neutro']),
  topics: z.array(z.string()),
  summary: z.string(),
  suggestion: z.string(),
})

export const journalListItemSchema = z.object({
  id: z.uuidv7(),
  sentiment: z.enum(['positivo', 'negativo', 'neutro']),
  createdAt: z.coerce.date(),
})

export const journalListSchema = z.object({
  journals: z.array(journalListItemSchema),
  nextCursor: z.string().nullable(),
})

export const journalDetailsSchema = z.object({
  id: z.uuidv7(),
  content: z.string(),
  aiAnalysis: aiAnalysisSchema,
  analysisStatus: z.string(),
  createdAt: z.coerce.date(),
})

export const journalSchema = z.object({
  id: z.uuidv7(),
  userId: z.uuidv7(),
  content: z.string(),
  aiAnalysis: aiAnalysisSchema,
  analysisStatus: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
