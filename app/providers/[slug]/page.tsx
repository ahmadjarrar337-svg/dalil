'use client'
import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { providers, getProvider, getCat, getReviews } from '@/lib/data'
import { getUser } from '@/lib/auth'
import { useLang, tx } from '@/lib/lang'

function LangBtn({ l, set }: { l:'en'|'ar', set:(x:'en'|'ar')=>void }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{position:'relative'}}>
      <button onClick={()=>setOpen(o=>!o)} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 12px',borderRadius:999,border:'1px solid #e5e7eb',background:'#fff',fontSize:13,fontWeight:500,color:'#374151',cursor:'pointer'}}>
        🌐 {l==='en'?'EN':'ع'} ▾
      </button>
      {open&&<div onClick={()=>setOpen(false)} style={{position:'absolute',top:'110%',right:0,background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,overflow:'hidden',minWidth:130,boxShadow:'0 4px 16px rgba(0,0,0,0.1)',zIndex:100}}>
        {(['en','ar'] as const).map(x=>(
          <button key={x} onClick={()=>set(x)} style={{display:'flex',alignItems:'center',gap:8,width:'100%',padding:'10px 16px',fontSize:13,background:l===x?'#f0fdf4':'#fff',color:l===x?'#15803d':'#374151',border:'none',cursor:'pointer',fontWeight:l===x?600:400}}>
            {x==='en'?'🇬🇧 English':'🇯🇴 العربية'}
          </button>
        ))}
      </div>}
    </div>
  )
}

function ReviewSection({ pid, slug }: { pid: string; slug: string }) {
  const [l] = useLang()
  const router = useRouter()
  const [user, setUser] = useState<{phone:string}|null>(null)
  const [stars, setStars] = useState(0)
  const [hover, setHover] = useState(0)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => { setUser(getUser()) }, [])

  if (done) return (
    <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:16,padding:20,textAlign:'center'}}>
      <div style={{fontSize:32,marginBottom:8}}>✅</div>
      <div style={{fontWeight:600,color:'#14532d'}}>{tx(l,'thanks')}</div>
    </div>
  )

  /* Not logged in — show prompt */
  if (!user) return (
    <div style={{background:'#f9fafb',border:'1px solid #f3f4f6',borderRadius:16,padding:20,textAlign:'center'}}>
      <div style={{fontSize:28,marginBottom:8}}>💬</div>
      <div style={{fontSize:14,fontWeight:600,color:'#111',marginBottom:4}}>{tx(l,'write_review')}</div>
      <div style={{fontSize:13,color:'#6b7280',marginBottom:16}}>Sign in with your phone number to leave a review</div>
      <button
        onClick={() => router.push(`/auth?returnTo=/providers/${slug}`)}
        style={{background:'#166534',color:'#fff',border:'none',borderRadius:12,padding:'12px 24px',fontSize:14,fontWeight:600,cursor:'pointer',width:'100%'}}
      >
        Sign in to review →
      </button>
    </div>
  )

  /* Logged in — show form toggle */
  if (!showForm) return (
    <button
      onClick={() => setShowForm(true)}
      style={{width:'100%',background:'#f0fdf4',border:'1.5px dashed #86efac',borderRadius:16,padding:16,fontSize:14,fontWeight:600,color:'#166534',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}
    >
      ✏️ {tx(l,'write_review')}
    </button>
  )

  return (
    <div style={{background:'#f9fafb',border:'1px solid #f3f4f6',borderRadius:16,padding:16,display:'flex',flexDirection:'column',gap:12}}>
      <div style={{fontSize:14,fontWeight:600,color:'#111'}}>{tx(l,'rate')}</div>
      <div style={{display:'flex',gap:4}}>
        {[1,2,3,4,5].map(i=>(
          <button key={i} onClick={()=>setStars(i)} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(0)}
            style={{fontSize:28,color:i<=(hover||stars)?'#f59e0b':'#e5e7eb',background:'none',border:'none',cursor:'pointer',padding:'0 2px',transition:'color 0.1s'}}>★</button>
        ))}
      </div>
      <div style={{fontSize:12,color:'#6b7280'}}>Posting as <strong>{user.phone}</strong></div>
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder={tx(l,'review_ph')} rows={3} maxLength={280}
        style={{width:'100%',padding:'10px 12px',borderRadius:12,border:'1px solid #e5e7eb',fontSize:14,resize:'none',outline:'none'}} />
      <div style={{display:'flex',gap:8}}>
        <button onClick={()=>setShowForm(false)} style={{padding:'12px 16px',borderRadius:12,border:'1px solid #e5e7eb',background:'#fff',fontSize:14,cursor:'pointer',color:'#374151'}}>
          {tx(l,'cancel')}
        </button>
        <button onClick={()=>{ if(stars>0) setDone(true) }} disabled={!stars}
          style={{flex:1,padding:'12px',borderRadius:12,border:'none',cursor:!stars?'not-allowed':'pointer',fontSize:14,fontWeight:600,color:'#fff',background:!stars?'#d1d5db':'#166534',transition:'background 0.2s'}}>
          {tx(l,'submit')}
        </button>
      </div>
    </div>
  )
}

export default function ProviderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [l, setL] = useLang()
  const [copied, setCopied] = useState(false)
  const [user, setUser] = useState<{phone:string}|null>(null)
  const router = useRouter()
  const p = getProvider(slug)

  useEffect(() => { setUser(getUser()) }, [])

  if (!p) return (
    <div style={{maxWidth:480,margin:'0 auto',textAlign:'center',padding:'80px 20px'}}>
      <div style={{fontSize:48,marginBottom:16}}>🔍</div>
      <div style={{fontWeight:600,fontSize:18,color:'#111',marginBottom:8}}>Provider not found</div>
      <Link href="/" style={{color:'#166534',textDecoration:'none',fontSize:14}}>← Back to home</Link>
    </div>
  )

  const cat = getCat(p.catId)
  const revs = getReviews(p.id)
  const name = l==='ar'?p.nameAr:p.name
  const hood = l==='ar'?p.hoodAr:p.hood
  const desc = l==='ar'?p.descAr:p.desc
  const hours = l==='ar'?p.hoursAr:p.hours
  const catName = l==='ar'?cat.ar:cat.en
  const init = p.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
  const url = typeof window!=='undefined'?`${location.origin}/providers/${p.slug}`:`https://dalil.app/providers/${p.slug}`
  const ratingTxt = p.reviews>=3?`⭐ ${p.rating.toFixed(1)} (${p.reviews} reviews)`:''
  const waMsg = `📍 *${name}*\n${catName} | ${hood}, Amman\n${ratingTxt}\n\nFind on Dalil:\n${url}`

  const copy = async () => { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(()=>setCopied(false),2000) }

  return (
    <div style={{maxWidth:480,margin:'0 auto',background:'#fff',minHeight:'100vh'}}>
      {/* Navbar */}
      <nav style={{position:'sticky',top:0,zIndex:50,background:'#fff',borderBottom:'1px solid #f3f4f6',padding:'0 16px',height:56,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link href="/" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:20,fontWeight:700,color:'#15803d'}}>{l==='ar'?'دليل':'Dalil'}</span>
          <span style={{fontSize:12,color:'#9ca3af'}}>{l==='ar'?'عمّان':'Amman'}</span>
        </Link>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          {user
            ? <div style={{fontSize:12,color:'#166534',fontWeight:600,background:'#f0fdf4',padding:'4px 10px',borderRadius:999,border:'1px solid #bbf7d0'}}>✓ Signed in</div>
            : <button onClick={()=>router.push(`/auth?returnTo=/providers/${slug}`)} style={{fontSize:12,fontWeight:600,color:'#166534',background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:999,padding:'4px 12px',cursor:'pointer'}}>Sign in</button>
          }
          <LangBtn l={l} set={setL} />
        </div>
      </nav>

      {/* Sub-header */}
      <div style={{position:'sticky',top:56,zIndex:40,background:'#fff',borderBottom:'1px solid #f3f4f6',padding:'10px 16px',display:'flex',alignItems:'center',gap:10}}>
        <Link href="/search" style={{color:'#6b7280',textDecoration:'none',fontSize:20,lineHeight:1}}>←</Link>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:14,fontWeight:600,color:'#111',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{name}</div>
          <div style={{fontSize:12,color:'#9ca3af'}}>{catName}</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(waMsg)}`} target="_blank" rel="noopener noreferrer"
            style={{width:36,height:36,borderRadius:10,background:'#25D366',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',textDecoration:'none',fontSize:18}}>💬</a>
          <button onClick={copy} style={{width:36,height:36,borderRadius:10,background:'#f3f4f6',border:'none',cursor:'pointer',fontSize:16}}>
            {copied?'✅':'🔗'}
          </button>
        </div>
      </div>

      <div>
        {/* Profile */}
        <div style={{padding:'20px 16px 16px'}}>
          <div style={{display:'flex',alignItems:'flex-start',gap:16}}>
            <div style={{width:64,height:64,borderRadius:16,background:'#f0fdf4',border:'2px solid #bbf7d0',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <span style={{color:'#166634',fontWeight:700,fontSize:22}}>{init}</span>
            </div>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'flex-start',flexWrap:'wrap',gap:8}}>
                <span style={{fontSize:20,fontWeight:700,color:'#111'}}>{name}</span>
                {p.verified&&<span style={{display:'flex',alignItems:'center',gap:4,background:'#f0fdf4',color:'#15803d',fontSize:11,fontWeight:600,padding:'4px 10px',borderRadius:999,border:'1px solid #bbf7d0'}}>✓ {tx(l,'verified')}</span>}
              </div>
              <div style={{fontSize:14,color:'#6b7280',marginTop:4}}>{cat.icon} {catName}</div>
              {p.reviews>=3&&(
                <div style={{display:'flex',alignItems:'center',gap:8,marginTop:8}}>
                  <span>{[1,2,3,4,5].map(s=><span key={s} style={{color:s<=Math.round(p.rating)?'#f59e0b':'#e5e7eb',fontSize:15}}>★</span>)}</span>
                  <span style={{fontSize:14,fontWeight:700,color:'#111'}}>{p.rating.toFixed(1)}</span>
                  <span style={{fontSize:12,color:'#9ca3af'}}>({p.reviews} {tx(l,'reviews')})</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{padding:'0 16px 16px',display:'flex',flexDirection:'column',gap:8}}>
          <a href={`tel:${p.phone}`} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,background:'#166534',color:'#fff',fontWeight:600,fontSize:15,padding:'14px',borderRadius:16,textDecoration:'none'}}>
            📞 {tx(l,'call')}
          </a>
          <div style={{display:'flex',gap:8}}>
            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(waMsg)}`} target="_blank" rel="noopener noreferrer"
              style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:8,background:'#25D366',color:'#fff',fontWeight:600,fontSize:14,padding:'12px',borderRadius:14,textDecoration:'none'}}>
              💬 {tx(l,'wa')}
            </a>
            <button onClick={copy} style={{display:'flex',alignItems:'center',gap:6,padding:'12px 16px',borderRadius:14,border:'1px solid #e5e7eb',background:'#fff',cursor:'pointer',fontSize:14,fontWeight:500,color:'#374151'}}>
              {copied?`✅ ${tx(l,'copied')}`:`🔗 ${tx(l,'share')}`}
            </button>
          </div>
        </div>

        {/* Info */}
        <div style={{padding:'0 16px',display:'flex',flexDirection:'column',gap:12}}>
          <div style={{background:'#f9fafb',borderRadius:16,padding:16,border:'1px solid #f3f4f6'}}>
            <div style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:8}}>{tx(l,'about')}</div>
            <div style={{fontSize:14,color:'#374151',lineHeight:1.6}}>{desc}</div>
            {p.exp>0&&<div style={{fontSize:12,color:'#166534',fontWeight:500,marginTop:8}}>{p.exp} {tx(l,'exp')}</div>}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div style={{background:'#f9fafb',borderRadius:16,padding:14,border:'1px solid #f3f4f6'}}>
              <div style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:6}}>📍 {tx(l,'hood')}</div>
              <div style={{fontSize:14,fontWeight:600,color:'#111'}}>{hood}</div>
            </div>
            <div style={{background:'#f9fafb',borderRadius:16,padding:14,border:'1px solid #f3f4f6'}}>
              <div style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:6}}>🕐 {tx(l,'hours')}</div>
              <div style={{fontSize:13,color:'#374151',lineHeight:1.4}}>{hours}</div>
            </div>
          </div>
          <div style={{background:'#f9fafb',borderRadius:16,padding:14,border:'1px solid #f3f4f6',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:4}}>Phone</div>
              <div style={{fontSize:14,fontWeight:600,color:'#111'}}>{p.phone}</div>
            </div>
            <a href={`tel:${p.phone}`} style={{fontSize:22,textDecoration:'none'}}>📞</a>
          </div>
        </div>

        {/* Claim CTA */}
        {!p.claimed&&(
          <div style={{margin:'16px 16px 0',background:'#fffbeb',border:'1px solid #fde68a',borderRadius:16,padding:16}}>
            <div style={{fontSize:14,fontWeight:600,color:'#92400e',marginBottom:4}}>{tx(l,'claim_title')}</div>
            <div style={{fontSize:12,color:'#a16207',marginBottom:12,lineHeight:1.5}}>{tx(l,'claim_sub')}</div>
            <button
              onClick={() => {
                if (!user) { router.push(`/auth?returnTo=/claim/${p.slug}`); return }
                router.push(`/claim/${p.slug}`)
              }}
              style={{display:'inline-flex',alignItems:'center',gap:4,background:'#d97706',color:'#fff',fontSize:12,fontWeight:600,padding:'8px 16px',borderRadius:10,border:'none',cursor:'pointer'}}>
              {tx(l,'claim')} →
            </button>
          </div>
        )}

        {/* Reviews */}
        <div style={{padding:'20px 16px 40px'}}>
          <div style={{fontSize:15,fontWeight:700,color:'#111',display:'flex',alignItems:'center',gap:8,marginBottom:16}}>
            <span style={{color:'#f59e0b'}}>★</span> {tx(l,'reviews')} {revs.length>0&&<span style={{fontSize:13,fontWeight:400,color:'#9ca3af'}}>({revs.length})</span>}
          </div>

          {revs.length>0&&(
            <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:16}}>
              {revs.map(r=>(
                <div key={r.id} style={{background:'#fff',border:'1px solid #f3f4f6',borderRadius:16,padding:14}}>
                  <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:8,marginBottom:8}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <div style={{width:32,height:32,borderRadius:'50%',background:'#dcfce7',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                        <span style={{fontSize:12,fontWeight:700,color:'#166534'}}>{r.author[0]}</span>
                      </div>
                      <div>
                        <div style={{fontSize:13,fontWeight:600,color:'#111'}}>{r.author}</div>
                        <div style={{fontSize:11,color:'#9ca3af'}}>{new Date(r.date).toLocaleDateString('en-GB',{month:'short',year:'numeric'})}</div>
                      </div>
                    </div>
                    <span>{[1,2,3,4,5].map(s=><span key={s} style={{color:s<=r.stars?'#f59e0b':'#e5e7eb',fontSize:13}}>★</span>)}</span>
                  </div>
                  <div style={{fontSize:13,color:'#374151',lineHeight:1.6}}>{r.text}</div>
                </div>
              ))}
            </div>
          )}

          <ReviewSection pid={p.id} slug={slug} />
        </div>
      </div>
    </div>
  )
}
