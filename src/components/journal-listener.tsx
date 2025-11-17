import { useWebSocketListener } from '@/hooks/use-websocket-listener'

export function JournalListener({ journalId }: { journalId: string }) {
  useWebSocketListener({ journalId })
  return null
}
