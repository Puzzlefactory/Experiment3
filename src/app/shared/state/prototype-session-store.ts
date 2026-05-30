import { create } from 'zustand'
import type { PrototypeSession } from '@/app/shared/auth/types'
import {
  clearPrototypeSession,
  loadPrototypeSession,
  savePrototypeSession,
} from '@/app/shared/auth/session-storage'

interface PrototypeSessionStore {
  session: PrototypeSession | null
  setSession(session: PrototypeSession): void
  logout(): void
}

export const usePrototypeSessionStore = create<PrototypeSessionStore>((set) => ({
  session: loadPrototypeSession(),
  setSession: (session) => {
    savePrototypeSession(session)
    set({ session })
  },
  logout: () => {
    clearPrototypeSession()
    set({ session: null })
  },
}))
