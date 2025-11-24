import { useEffect } from 'react'
import { useJournalStatus } from '@/store/journal-status'

interface WebSocketProps {
  journalId: string
}

export function useWebSocketListener({ journalId }: WebSocketProps) {
  const { showResults, reset } = useJournalStatus()

  useEffect(() => {
    const ws = new WebSocket(`http://localhost:3333/ws/journal/${journalId}`)

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)

      if (message.event === 'analysis_completed') {
        showResults(message.data.aiAnalysis)
      }
    }

    ws.onclose = (event) => {
      const { status } = useJournalStatus.getState()

      if (
        status === 'waiting_for_ai' &&
        event.code !== 1000 &&
        event.code !== 1005
      ) {
        setTimeout(() => reset(), 5000)
      }
    }

    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close()
      }
    }
  }, [journalId, showResults, reset])
}
