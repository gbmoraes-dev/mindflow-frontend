import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Spinner } from './ui/spinner'

interface WritingJournalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

const validation = z.object({
  content: z.string().min(1, 'Por favor, escreva algo antes de salvar'),
})

export function WritingJournal({
  children,
  open,
  onOpenChange,
}: WritingJournalProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: async (content: string) => {
      const response = await fetch('http://localhost:3333/journal', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })

      const data = await response.json()

      return data
    },
    onSuccess: () => {
      form.reset()
      onOpenChange(false)
    },
    onError: () => {
      toast.error('Erro ao criar diário')
    },
  })

  const form = useForm({
    defaultValues: {
      content: '',
    },
    validators: {
      onChange: validation,
    },
    onSubmit: async ({ value }) => {
      mutate(value.content)
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
        className="sm:max-w-[600px]"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          noValidate
        >
          <DialogHeader>
            <DialogTitle>Novo Diário</DialogTitle>
            <DialogDescription>
              Escreva sobre como foi seu dia, seus pensamentos e sentimentos.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form.Field name="content">
              {(field) => (
                <div className="grid gap-2">
                  <textarea
                    id={field.name}
                    name={field.name}
                    placeholder="Como foi seu dia hoje?"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    rows={10}
                    className="resize-none rounded-lg border border-stone-200 bg-stone-50 p-6 leading-relaxed text-stone-700 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    disabled={isPending}
                  />
                </div>
              )}
            </form.Field>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending} className="bg-teal-500">
              {isPending && <Spinner />}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
