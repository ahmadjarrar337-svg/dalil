'use client'

export type DalilUser = { phone: string; verified: boolean }

export function getUser(): DalilUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('dalil_user')
    if (!raw) return null
    return JSON.parse(raw) as DalilUser
  } catch { return null }
}

export function signOut() {
  try { localStorage.removeItem('dalil_user') } catch {}
  window.location.href = '/'
}
