import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface SentimentHistory {
  date: string
  positive: number
  negative: number
  neutral: number
}

const chartConfig = {
  positive: {
    label: 'Positivo',
    color: '#2dd4bf',
  },
  negative: {
    label: 'Negativo',
    color: '#f43f5e',
  },

  neutral: {
    label: 'Neutro',
    color: '#a8a29e',
  },
} satisfies ChartConfig

export function SentimentChart({ data }: { data: SentimentHistory[] }) {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart data={data}>
        <defs>
          <linearGradient id="fillPositive" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-positive)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-positive)"
              stopOpacity={0.1}
            />
          </linearGradient>

          <linearGradient id="fillNegative" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-negative)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-negative)"
              stopOpacity={0.1}
            />
          </linearGradient>

          <linearGradient id="fillNeutral" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-neutral)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-neutral)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value)
            return date.toLocaleDateString('pt-BR', {
              month: 'short',
              day: 'numeric',
            })
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString('pt-BR', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
              indicator="dot"
            />
          }
        />

        <Area
          dataKey="positive"
          type="natural"
          fill="url(#fillPositive)"
          stroke="var(--color-positive)"
          stackId="a"
        />
        <Area
          dataKey="negative"
          type="natural"
          fill="url(#fillNegative)"
          stroke="var(--color-negative)"
          stackId="a"
        />
        <Area
          dataKey="neutral"
          type="natural"
          fill="url(#fillNeutral)"
          stroke="var(--color-neutral)"
          stackId="a"
        />

        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  )
}
