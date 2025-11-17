import { create } from 'zustand'

interface Journal {
  id: string
  content: string
  createdAt: Date
}

interface AiAnalysis {
  sentiment: string
  topics: string[]
  summary: string
  suggestion: string
}

type JournalResult = Journal & { aiAnalysis: AiAnalysis }

interface JournalStatusStore {
  status: 'idle' | 'saving' | 'waiting_for_ai' | 'showing_results'
  activeJournalId: string | null
  activeJournal: Journal | null
  results: JournalResult | null
  openModalJournalId: string | null
  startSaving: () => void
  startWaitingForAi: (journal: Journal) => void
  showResults: (data: AiAnalysis) => void
  setOpenModal: (journalId: string | null) => void
  reset: () => void
}

export const useJournalStatus = create<JournalStatusStore>((set) => ({
  status: 'idle',
  activeJournalId: null,
  activeJournal: null,
  results: null,
  openModalJournalId: null,
  startSaving: () => set({ status: 'saving' }),
  startWaitingForAi: (journal) =>
    set({
      status: 'waiting_for_ai',
      activeJournal: journal,
      activeJournalId: journal.id,
    }),
  showResults: (data) =>
    set((state) => ({
      status: 'showing_results',
      results: state.activeJournal
        ? { ...state.activeJournal, aiAnalysis: data }
        : null,
      openModalJournalId: state.activeJournalId,
    })),
  setOpenModal: (journalId) => set({ openModalJournalId: journalId }),
  reset: () =>
    set({
      status: 'idle',
      results: null,
      activeJournalId: null,
      activeJournal: null,
      openModalJournalId: null,
    }),
}))
