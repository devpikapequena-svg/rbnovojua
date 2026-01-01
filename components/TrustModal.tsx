'use client'

import { useEffect, useMemo, useState } from 'react'
import './TrustModal.css'

type Props = {
  storageKey?: string
  onlyTikTokTraffic?: boolean
  deliveries?: number
  days?: number
}

function isTikTokTraffic() {
  if (typeof window === 'undefined') return false
  const qs = new URLSearchParams(window.location.search)
  const ref = document.referrer || ''
  const hasTtclid = qs.has('ttclid')
  const utm = (qs.get('utm_source') || '').toLowerCase()
  const fromTiktokRef = /tiktok\.com/i.test(ref)
  return hasTtclid || utm === 'tiktok' || fromTiktokRef
}

export default function TrustModal({
  storageKey = 'rbx_human_verified_v1',
  onlyTikTokTraffic = false,
  deliveries = 2344,
  days = 2,
}: Props) {
  const [open, setOpen] = useState(false)

  const alreadyShown = useMemo(() => {
    if (typeof window === 'undefined') return false
    try {
      return window.sessionStorage.getItem(storageKey) === '1'
    } catch {
      return false
    }
  }, [storageKey])

  useEffect(() => {
    if (alreadyShown) return
    if (onlyTikTokTraffic && !isTikTokTraffic()) return
    setOpen(true)
  }, [alreadyShown, onlyTikTokTraffic])

  const closeBackdrop = () => {
    try {
      window.sessionStorage.setItem(storageKey, '1')
    } catch {}
    setOpen(false)
  }

  const closeButton = () => {
    // ✅ dispara SOMENTE no botão (clique humano explícito)
    try {
      const w = window as any
      if (w.ttq && typeof w.ttq.page === 'function') {
        w.ttq.page()
      }
    } catch {}

    try {
      window.sessionStorage.setItem(storageKey, '1')
    } catch {}
    setOpen(false)
  }

  if (!open) return null

  const formatted = deliveries.toLocaleString('pt-BR')

  return (
    <div className="tm-overlay" role="dialog" aria-modal="true" aria-label="Informação">
      {/* Backdrop NÃO dispara evento */}
      <div className="tm-backdrop" onClick={closeBackdrop} />

      <div className="tm-wrap">
        <div className="tm-modal">
          <div className="tm-badge" aria-hidden="true">
            <div className="tm-badgeInner">✓</div>
          </div>

          <div className="tm-title">Compra protegida</div>

          <div className="tm-subtitle">
            Mais de <b>{formatted}</b> produtos entregues com sucesso nos últimos <b>{days}</b> dias.
          </div>

          {/* Botão é o ÚNICO que dispara ttq.page() */}
          <button className="tm-btn" type="button" onClick={closeButton}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
