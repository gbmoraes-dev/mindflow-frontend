import { useQuery } from '@tanstack/react-query'
import { journalDetailsSchema } from '@/http/schemas/journals'
import { Badge } from './ui/badge'
import { FieldGroup, FieldSeparator } from './ui/field'
import { Spinner } from './ui/spinner'

interface JournalDetailsProps {
  id: string
}

export function JournalDetails({ id }: JournalDetailsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['journal', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/journal/${id}`, {
        method: 'GET',
        credentials: 'include',
      })

      const data = await response.json()

      return journalDetailsSchema.parse(data)
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner />
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-stone-700">
        Seu diário de{' '}
        {data.createdAt.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
      </h2>

      <div className="rounded-lg border border-stone-200 bg-stone-50 p-6">
        <p className="whitespace-pre-wrap leading-relaxed text-stone-700">
          {data.content}
        </p>
      </div>

      {data.aiAnalysis && (
        <div className="space-y-2">
          <h3 className="font-semibold">Conselho:</h3>
          <div className="relative rounded-md bg-teal-50 p-6 shadow-md before:absolute before:left-0 before:top-0 before:h-full before:w-2 before:bg-teal-100">
            <p className="whitespace-pre-wrap font-handwriting text-stone-900">
              {data.aiAnalysis.suggestion}
            </p>
          </div>
        </div>
      )}

      <FieldGroup>
        <FieldSeparator />
      </FieldGroup>

      {data.aiAnalysis.topics && (
        <div className="flex flex-wrap gap-2">
          {data.aiAnalysis.topics.map((topic) => (
            <Badge key={topic} variant="outline">
              {topic}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
