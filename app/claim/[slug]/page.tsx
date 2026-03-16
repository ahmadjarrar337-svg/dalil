'use client'
import { use, useState } from 'react'
import Link from 'next/link'
import { providers, getProvider, getCat } from '@/lib/data'
import { useLang, tx } from '@/lib/lang'

export default function ClaimPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [l] = useLang()
  const [step, setStep] = useState<'phone'|'otp'|'done'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const p = getProvider(slug)

  if (!p) return <div className="wrap" style={{padding:40,textAlign:'center'}}><div style={{fontSize:40,marginBottom:12}}>🔍</div><Link href="/" style={{color:'#166534',textDecoration:'none'}}>← Home</Link></div>

  const cat = getCat(p.catId)
  const init = p.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()

  return (
    <div className="wrap">
      <nav style={{position:'sticky',top:0,zIndex:50,background:'#fff',borderBottom:'1px solid #f3f4f6',padding:'0 16px',height:56,display:'flex',alignItems:'center',gap:12}}>
        <Link href={`/providers/${p.slug}`} style={{color:'#6b7280',textDecoration:'none',fontSize:20}}>←</Link>
        <span style={{fontSize:15,fontWeight:600,color:'#111'}}>{tx(l,'claim')}</span>
      </nav>

      <div style={{padding:'24px 16px 40px'}} className="anim">
        {/* Provider preview */}
        <div style={{background:'#f9fafb',border:'1px solid #f3f4f6',borderRadius:16,padding:16,display:'flex',alignItems:'center',gap:12,marginBottom:24}}>
          <div style={{width:48,height:48,borderRadius:12,background:'#f0fdf4',border:'1px solid #bbf7d0',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <span style={{color:'#166534',fontWeight:700}}>{init}</span>
          </div>
          <div>
            <div style={{fontWeight:600,fontSize:14,color:'#111'}}>{l==='ar'?p.nameAr:p.name}</div>
            <div style={{fontSize:12,color:'#6b7280'}}>{cat.icon} {l==='ar'?cat.ar:cat.en} · {l==='ar'?p.hoodAr:p.hood}</div>
          </div>
        </div>

        {/* Steps */}
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:28}}>
          {[0,1,2].map(i=>{
            const cur = step==='phone'?0:step==='otp'?1:2
            return (
              <div key={i} style={{display:'flex',alignItems:'center',flex:i<2?1:'initial',gap:8}}>
                <div style={{width:28,height:28,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,background:cur===i?'#166534':cur>i?'#86efac':'#f3f4f6',color:cur===i?'#fff':cur>i?'#14532d':'#9ca3af',flexShrink:0}}>
                  {cur>i?'✓':i+1}
                </div>
                {i<2&&<div style={{flex:1,height:2,borderRadius:1,background:cur>i?'#86efac':'#f3f4f6'}}/>}
              </div>
            )
          })}
        </div>

        {step==='phone'&&(
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div>
              <div style={{fontSize:17,fontWeight:700,color:'#111',marginBottom:4}}>{tx(l,'claim_title')}</div>
              <div style={{fontSize:13,color:'#6b7280',lineHeight:1.6}}>{tx(l,'claim_sub')}</div>
            </div>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:'#374151',marginBottom:6}}>{tx(l,'your_phone')}</div>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+962 7X XXX XXXX"
                style={{width:'100%',padding:'14px',borderRadius:14,border:'1px solid #e5e7eb',fontSize:14,outline:'none'}} />
              <div style={{fontSize:11,color:'#9ca3af',marginTop:6}}>Must match the phone number on this listing.</div>
            </div>
            <button onClick={()=>{ if(phone.trim()) setStep('otp') }}
              style={{padding:'14px',borderRadius:14,border:'none',background:'#166534',color:'#fff',fontSize:15,fontWeight:600,cursor:'pointer'}}>
              {tx(l,'send_code')}
            </button>
          </div>
        )}

        {step==='otp'&&(
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div>
              <div style={{fontSize:17,fontWeight:700,color:'#111',marginBottom:4}}>{tx(l,'enter_code')}</div>
              <div style={{fontSize:13,color:'#6b7280'}}>A 6-digit code was sent to <strong>{phone}</strong></div>
            </div>
            <input value={otp} onChange={e=>setOtp(e.target.value.slice(0,6))} placeholder="_ _ _ _ _ _"
              style={{width:'100%',padding:'14px',borderRadius:14,border:'1px solid #e5e7eb',fontSize:22,textAlign:'center',fontFamily:'monospace',letterSpacing:8,outline:'none'}} />
            <button onClick={()=>{ if(otp.length>=4) setStep('done') }}
              style={{padding:'14px',borderRadius:14,border:'none',background:'#166534',color:'#fff',fontSize:15,fontWeight:600,cursor:'pointer'}}>
              {tx(l,'confirm')}
            </button>
            <button onClick={()=>setStep('phone')} style={{background:'none',border:'none',color:'#9ca3af',fontSize:13,cursor:'pointer'}}>
              ← Change number
            </button>
          </div>
        )}

        {step==='done'&&(
          <div style={{textAlign:'center',paddingTop:16}} className="anim">
            <div style={{width:64,height:64,borderRadius:'50%',background:'#f0fdf4',border:'2px solid #86efac',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',fontSize:28}}>✅</div>
            <div style={{fontSize:20,fontWeight:700,color:'#111',marginBottom:8}}>Listing Claimed!</div>
            <div style={{fontSize:14,color:'#6b7280',marginBottom:24,lineHeight:1.6}}>{tx(l,'claimed_ok')}</div>
            <Link href={`/dashboard/${p.slug}`} style={{display:'block',background:'#166534',color:'#fff',padding:'14px',borderRadius:14,textDecoration:'none',fontSize:15,fontWeight:600,marginBottom:12}}>
              {tx(l,'manage')} →
            </Link>
            <Link href={`/providers/${p.slug}`} style={{color:'#9ca3af',fontSize:13,textDecoration:'none'}}>View public profile</Link>
          </div>
        )}
      </div>
    </div>
  )
}

