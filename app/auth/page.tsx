'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

/* ── tiny country list ── */
const COUNTRIES = [
  { flag:'🇯🇴', code:'+962', name:'Jordan' },
  { flag:'🇸🇦', code:'+966', name:'Saudi Arabia' },
  { flag:'🇦🇪', code:'+971', name:'UAE' },
  { flag:'🇪🇬', code:'+20',  name:'Egypt' },
  { flag:'🇱🇧', code:'+961', name:'Lebanon' },
  { flag:'🇰🇼', code:'+965', name:'Kuwait' },
  { flag:'🇮🇶', code:'+964', name:'Iraq' },
  { flag:'🇧🇭', code:'+973', name:'Bahrain' },
  { flag:'🇶🇦', code:'+974', name:'Qatar' },
  { flag:'🇴🇲', code:'+968', name:'Oman' },
]

function mask(phone: string) {
  if (phone.length < 6) return phone
  return phone.slice(0, 3) + ' ' + 'X'.repeat(Math.max(0, phone.length - 6)) + ' ' + phone.slice(-3)
}

function AuthInner() {
  const router = useRouter()
  const sp = useSearchParams()
  const returnTo = sp.get('returnTo') || '/'

  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [country, setCountry] = useState(COUNTRIES[0])
  const [showCountries, setShowCountries] = useState(false)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resent, setResent] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  /* countdown timer */
  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const handleSend = () => {
    if (phone.replace(/\s/g, '').length < 7) { setError('Please enter a valid phone number'); return }
    setError('')
    setLoading(true)
    /* In production: POST /api/auth/send-otp */
    setTimeout(() => {
      setLoading(false)
      setStep('otp')
      setCountdown(30)
      setTimeout(() => inputRefs.current[0]?.focus(), 100)
    }, 1000)
  }

  const handleOtpChange = (i: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[i] = digit
    setOtp(next)
    if (digit && i < 5) inputRefs.current[i + 1]?.focus()
    if (next.every(d => d !== '') && next.join('').length === 6) {
      verifyOtp(next.join(''))
    }
  }

  const handleOtpKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const next = [...otp]
    digits.split('').forEach((d, i) => { next[i] = d })
    setOtp(next)
    if (digits.length === 6) verifyOtp(digits)
    else inputRefs.current[digits.length]?.focus()
  }

  const verifyOtp = (code: string) => {
    setError('')
    setLoading(true)
    /* In production: POST /api/auth/verify-otp */
    setTimeout(() => {
      setLoading(false)
      if (code === '000000') { setError('Invalid code. Try again.'); setOtp(['','','','','','']); inputRefs.current[0]?.focus(); return }
      /* Save session */
      try { localStorage.setItem('dalil_user', JSON.stringify({ phone: country.code + phone, verified: true })) } catch {}
      router.push(returnTo)
    }, 900)
  }

  const resend = () => {
    if (countdown > 0) return
    setResent(true)
    setCountdown(30)
    setOtp(['','','','','',''])
    setTimeout(() => { setResent(false); inputRefs.current[0]?.focus() }, 2000)
  }

  const fullPhone = country.code + ' ' + phone

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f3f4f6' }}>
        {step === 'otp'
          ? <button onClick={() => { setStep('phone'); setOtp(['','','','','','']); setError('') }} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#6b7280', padding: 0, marginRight: 12 }}>←</button>
          : <Link href={returnTo} style={{ fontSize: 22, color: '#6b7280', textDecoration: 'none', marginRight: 12 }}>←</Link>
        }
        <span style={{ fontSize: 18, fontWeight: 700, color: '#15803d' }}>Dalil</span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 24px 48px' }}>

        {/* Logo mark */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg,#166534,#14532d)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(22,101,52,0.25)' }}>
            <span style={{ fontSize: 28 }}>📍</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', margin: '0 0 6px' }}>
            {step === 'phone' ? 'Welcome to Dalil' : 'Verify your number'}
          </h1>
          <p style={{ fontSize: 14, color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
            {step === 'phone'
              ? 'Enter your phone number to continue'
              : <>We sent a 6-digit code to<br /><strong style={{ color: '#111' }}>{fullPhone}</strong></>
            }
          </p>
        </div>

        {/* ── STEP 1: Phone ── */}
        {step === 'phone' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Country + number input */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Phone number</label>
              <div style={{ display: 'flex', gap: 0, border: '1.5px solid #e5e7eb', borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s' }} onFocus={e => (e.currentTarget.style.borderColor = '#16a34a')} onBlur={e => (e.currentTarget.style.borderColor = '#e5e7eb')}>

                {/* Country selector */}
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => setShowCountries(s => !s)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px', height: 52, background: '#f9fafb', border: 'none', borderRight: '1.5px solid #e5e7eb', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#374151', whiteSpace: 'nowrap' }}
                  >
                    {country.flag} {country.code} <span style={{ fontSize: 10, color: '#9ca3af' }}>▾</span>
                  </button>
                  {showCountries && (
                    <div style={{ position: 'absolute', top: '110%', left: 0, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 100, minWidth: 200, maxHeight: 280, overflowY: 'auto' }}>
                      {COUNTRIES.map(c => (
                        <button key={c.code} onClick={() => { setCountry(c); setShowCountries(false) }}
                          style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 16px', background: country.code === c.code ? '#f0fdf4' : '#fff', border: 'none', cursor: 'pointer', fontSize: 14, color: country.code === c.code ? '#166534' : '#374151', fontWeight: country.code === c.code ? 600 : 400, textAlign: 'left' }}>
                          <span>{c.flag}</span>
                          <span style={{ flex: 1 }}>{c.name}</span>
                          <span style={{ color: '#9ca3af', fontSize: 13 }}>{c.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Number input */}
                <input
                  type="tel"
                  value={phone}
                  onChange={e => { setPhone(e.target.value.replace(/[^\d\s]/g, '')); setError('') }}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="7X XXX XXXX"
                  autoFocus
                  style={{ flex: 1, padding: '0 16px', height: 52, border: 'none', fontSize: 16, outline: 'none', background: '#fff', color: '#111' }}
                />
              </div>
            </div>

            {error && <p style={{ margin: 0, fontSize: 13, color: '#dc2626', fontWeight: 500 }}>⚠ {error}</p>}

            <button
              onClick={handleSend}
              disabled={loading || phone.replace(/\s/g,'').length < 7}
              style={{ padding: '15px', borderRadius: 14, border: 'none', fontSize: 16, fontWeight: 700, color: '#fff', background: phone.replace(/\s/g,'').length < 7 ? '#d1d5db' : 'linear-gradient(135deg,#166534,#14532d)', cursor: phone.replace(/\s/g,'').length < 7 ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: phone.replace(/\s/g,'').length >= 7 ? '0 4px 12px rgba(22,101,52,0.3)' : 'none' }}
            >
              {loading ? 'Sending…' : 'Continue →'}
            </button>

            <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', margin: 0, lineHeight: 1.6 }}>
              By continuing you agree to receive an SMS verification code. Standard rates may apply.
            </p>
          </div>
        )}

        {/* ── STEP 2: OTP ── */}
        {step === 'otp' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>

            {/* 6 digit boxes */}
            <div style={{ display: 'flex', gap: 10 }} onPaste={handlePaste}>
              {otp.map((d, i) => (
                <input
                  key={i}
                  ref={el => { inputRefs.current[i] = el }}
                  type="tel"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => handleOtpKey(i, e)}
                  style={{
                    width: 46, height: 56, textAlign: 'center', fontSize: 22, fontWeight: 700,
                    border: `2px solid ${d ? '#16a34a' : '#e5e7eb'}`,
                    borderRadius: 12, outline: 'none', color: '#111', background: d ? '#f0fdf4' : '#fff',
                    transition: 'all 0.15s', caretColor: 'transparent'
                  }}
                />
              ))}
            </div>

            {error && <p style={{ margin: 0, fontSize: 13, color: '#dc2626', fontWeight: 500 }}>⚠ {error}</p>}

            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6b7280', fontSize: 14 }}>
                <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid #e5e7eb', borderTopColor: '#166534', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                Verifying…
              </div>
            )}

            {resent && <p style={{ margin: 0, fontSize: 13, color: '#166534', fontWeight: 600 }}>✓ Code resent!</p>}

            {/* Resend */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 8px' }}>Didn't receive a code?</p>
              <button
                onClick={resend}
                disabled={countdown > 0}
                style={{ background: 'none', border: 'none', fontSize: 14, fontWeight: 600, color: countdown > 0 ? '#9ca3af' : '#166534', cursor: countdown > 0 ? 'default' : 'pointer', padding: 0 }}
              >
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
              </button>
            </div>

            {/* Dev hint */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '10px 16px', fontSize: 12, color: '#166534', textAlign: 'center', width: '100%' }}>
              💡 <strong>Dev mode:</strong> enter any code except <code>000000</code> to sign in
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div style={{ maxWidth: 480, margin: '0 auto', padding: 40, textAlign: 'center', color: '#9ca3af' }}>Loading…</div>}>
      <AuthInner />
    </Suspense>
  )
}
