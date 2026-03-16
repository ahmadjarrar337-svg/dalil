'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { cats, providers, getCat } from '@/lib/data'
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

function SearchInner() {
  const [l, setL] = useLang()
  const sp = useSearchParams()
  const [activeCat, setActiveCat] = useState('')
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  useEffect(()=>{ setActiveCat(sp.get('cat')||'') },[sp])

  const filtered = providers
    .filter(p => {
      if (activeCat) { const c = cats.find(c=>c.slug===activeCat); if(c && p.catId!==c.id) return false }
      if (verifiedOnly && !p.verified) return false
      return true
    })
    .sort((a,b)=>b.rating-a.rating)

  const activeCatObj = cats.find(c=>c.slug===activeCat)
  const title = activeCatObj ? (l==='ar'?activeCatObj.ar:activeCatObj.en) : (l==='ar'?'جميع الخدمات':'All Services')

  return (
    <div className="wrap">
      {/* Navbar */}
      <nav style={{position:'sticky',top:0,zIndex:50,background:'#fff',borderBottom:'1px solid #f3f4f6',padding:'0 16px',height:56,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link href="/" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:20,fontWeight:700,color:'#15803d'}}>{l==='ar'?'دليل':'Dalil'}</span>
          <span style={{fontSize:12,color:'#9ca3af'}}>{l==='ar'?'عمّان':'Amman'}</span>
        </Link>
        <LangBtn l={l} set={setL} />
      </nav>

      {/* Sticky filters */}
      <div style={{position:'sticky',top:56,zIndex:40,background:'#fff',borderBottom:'1px solid #f3f4f6',padding:'12px 16px 10px'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
          <Link href="/" style={{color:'#6b7280',textDecoration:'none',fontSize:20}}>←</Link>
          <div>
            <div style={{fontSize:15,fontWeight:700,color:'#111'}}>{title}</div>
            <div style={{fontSize:12,color:'#9ca3af'}}>{filtered.length} {tx(l,'found')} · {tx(l,'sorted')}</div>
          </div>
        </div>
        {/* Pills */}
        <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:4,scrollbarWidth:'none'}}>
          <button onClick={()=>setActiveCat('')} style={{flexShrink:0,padding:'6px 12px',borderRadius:999,fontSize:12,fontWeight:600,border:'none',cursor:'pointer',background:!activeCat?'#166534':'#f9fafb',color:!activeCat?'#fff':'#374151'}}>
            {tx(l,'all')}
          </button>
          {cats.map(c=>(
            <button key={c.id} onClick={()=>setActiveCat(activeCat===c.slug?'':c.slug)} style={{flexShrink:0,display:'flex',alignItems:'center',gap:4,padding:'6px 12px',borderRadius:999,fontSize:12,fontWeight:600,border:'none',cursor:'pointer',background:activeCat===c.slug?'#166534':'#f9fafb',color:activeCat===c.slug?'#fff':'#374151'}}>
              {c.icon} {l==='ar'?c.ar:c.en}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle */}
      <div style={{padding:'10px 16px',display:'flex',alignItems:'center',gap:8,borderBottom:'1px solid #f9fafb'}}>
        <button onClick={()=>setVerifiedOnly(v=>!v)} style={{position:'relative',width:36,height:20,borderRadius:10,border:'none',cursor:'pointer',background:verifiedOnly?'#16a34a':'#d1d5db',padding:0,transition:'background 0.2s'}}>
          <span style={{position:'absolute',top:2,left:verifiedOnly?16:2,width:16,height:16,background:'#fff',borderRadius:'50%',boxShadow:'0 1px 3px rgba(0,0,0,0.2)',transition:'left 0.2s',display:'block'}}/>
        </button>
        <span style={{fontSize:12,color:'#374151',fontWeight:500}}>{tx(l,'verified')} only</span>
      </div>

      {/* List */}
      <div style={{padding:'12px 16px 40px',display:'flex',flexDirection:'column',gap:10}}>
        {filtered.length===0 ? (
          <div style={{textAlign:'center',padding:'64px 0',color:'#9ca3af'}}>
            <div style={{fontSize:36,marginBottom:12}}>🔍</div>
            <div style={{fontWeight:500}}>{tx(l,'no_results')}</div>
          </div>
        ) : filtered.map((p,i)=>{
          const cat = getCat(p.catId)
          const name = l==='ar'?p.nameAr:p.name
          const hood = l==='ar'?p.hoodAr:p.hood
          const init = p.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
          return (
            <Link key={p.id} href={`/providers/${p.slug}`} style={{textDecoration:'none',animationDelay:`${i*0.04}s`}} className="anim">
              <div style={{background:'#fff',borderRadius:16,border:'1px solid #f3f4f6',padding:16}}>
                <div style={{display:'flex',alignItems:'flex-start',gap:12}}>
                  <div style={{width:48,height:48,borderRadius:12,background:'#f0fdf4',border:'1px solid #bbf7d0',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <span style={{color:'#166534',fontWeight:700,fontSize:14}}>{init}</span>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:8}}>
                      <div style={{minWidth:0}}>
                        <div style={{fontWeight:600,fontSize:15,color:'#111',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{name}</div>
                        <div style={{fontSize:12,color:'#6b7280',marginTop:2}}>{cat.icon} {l==='ar'?cat.ar:cat.en}</div>
                      </div>
                      {p.verified
                        ? <span style={{flexShrink:0,display:'flex',alignItems:'center',gap:4,background:'#f0fdf4',color:'#15803d',fontSize:11,fontWeight:600,padding:'3px 8px',borderRadius:999,border:'1px solid #bbf7d0'}}>✓ {tx(l,'verified')}</span>
                        : <span style={{flexShrink:0,fontSize:11,color:'#9ca3af'}}>{tx(l,'unclaimed')}</span>
                      }
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:8,marginTop:8}}>
                      <span>{[1,2,3,4,5].map(s=><span key={s} style={{color:s<=Math.round(p.rating)?'#f59e0b':'#e5e7eb',fontSize:13}}>★</span>)}</span>
                      <span style={{fontSize:13,fontWeight:600,color:'#111'}}>{p.rating.toFixed(1)}</span>
                      {p.reviews>=3&&<span style={{fontSize:12,color:'#9ca3af'}}>({p.reviews} {tx(l,'reviews')})</span>}
                    </div>
                    <div style={{fontSize:12,color:'#9ca3af',marginTop:4}}>📍 {hood}</div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return <Suspense fallback={<div className="wrap" style={{padding:32,textAlign:'center',color:'#9ca3af'}}>Loading…</div>}><SearchInner/></Suspense>
}
