import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Menu } from '@/components/menu'
import { SentimentChart } from '@/components/sentiment-chart'
import { TopicBadge } from '@/components/topic-badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { summaryResponseSchema } from '@/http/schemas/journals'
import { env } from '@/env'

export const Route = createFileRoute('/_authenticated/stats')({
  component: StatsPage,
})

function StatsPage() {
  const [timeRange, setTimeRange] = useState('7d')

  const { data: summary } = useSuspenseQuery({
    queryKey: ['stats', 'summary', timeRange],
    queryFn: async () => {
      const url = new URL(`${env.BACKEND_URL}/insights/summary`)

      url.searchParams.set('period', timeRange)

      const response = await fetch(url, {
        credentials: 'include',
      })

      const data = await response.json()

      return summaryResponseSchema.parse(data)
    },
  })

  const wordCloudData = useMemo(() => {
    if (!summary?.recurringTopics || summary.recurringTopics.length === 0)
      return { topics: [], maxCount: 1 }

    const maxCount = Math.max(
      ...summary.recurringTopics.map((topic) => topic.count),
    )

    return {
      topics: summary.recurringTopics,
      maxCount,
    }
  }, [summary?.recurringTopics])

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto pt-20 pb-28 px-4 space-y-4">
        <div className="flex flex-col items-center justify-center">
          <img src="/mindflow.svg" alt="Mindflow" className="" />
        </div>

        <div className="flex flex-col gap-2 pt-10">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Evolução dos Sentimentos</CardTitle>
                <CardDescription>
                  Sentimentos registrados ao longo do tempo.
                </CardDescription>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger
                  className="w-40 rounded-lg"
                  aria-label="Selecionar período"
                >
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="90d" className="rounded-lg">
                    Últimos 90 dias
                  </SelectItem>
                  <SelectItem value="30d" className="rounded-lg">
                    Últimos 30 dias
                  </SelectItem>
                  <SelectItem value="7d" className="rounded-lg">
                    Últimos 7 dias
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <SentimentChart data={summary.sentimentHistory} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tópicos Recorrentes</CardTitle>
              <CardDescription>
                Os assuntos mais mencionados em seus diários.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3 justify-center">
              {wordCloudData.topics.length > 0 ? (
                wordCloudData.topics.map((topicData) => (
                  <TopicBadge
                    key={topicData.topic}
                    topic={topicData.topic}
                    count={topicData.count}
                    maxCount={wordCloudData.maxCount}
                  />
                ))
              ) : (
                <p className="text-stone-500 text-sm">
                  Nenhum tópico recorrente encontrado neste período.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Menu />
    </div>
  )
}
