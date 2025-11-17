import { Frown, Meh, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { JournalDetails } from './journal-details'

type JournalFeedItem = {
  id: string
  createdAt: Date
  sentiment: 'positivo' | 'negativo' | 'neutro'
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const moodEmojis = {
  positivo: <Smile className="text-teal-400" />,
  negativo: <Frown className="text-stone-400" />,
  neutro: <Meh className="text-stone-400" />,
}

export function JournalCard({ journal }: { journal: JournalFeedItem }) {
  const emoji = moodEmojis[journal.sentiment]

  const day = journal.createdAt.toLocaleDateString('pt-BR', { day: '2-digit' })
  const monthYear = journal.createdAt.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <Dialog open={journal.open} onOpenChange={journal.onOpenChange}>
      <Card>
        <CardHeader className="flex flex-row justify-between items-start">
          <CardTitle className="flex flex-row justify-between items-start">
            <div>
              <div className="text-4xl font-bold tracking-tighter">{day}</div>
              <div className="text-sm text-muted-foreground">{monthYear}</div>
            </div>
            <span className="text-2xl">{emoji}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full">
              Ver detalhes
            </Button>
          </DialogTrigger>
        </CardFooter>
      </Card>

      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <JournalDetails id={journal.id} />
      </DialogContent>
    </Dialog>
  )
}
