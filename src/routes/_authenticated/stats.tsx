import { createFileRoute } from '@tanstack/react-router'
import { Menu } from '@/components/menu'

export const Route = createFileRoute('/_authenticated/stats')({
  component: Stats,
})

function Stats() {
  return (
    <div className="h-screen pt-20 pb-5 flex flex-col">
      <div className="flex flex-col items-center justify-center">
        <img src="/mindflow.svg" alt="Mindflow" className="pb-10" />
      </div>

      <Menu />
    </div>
  )
}
