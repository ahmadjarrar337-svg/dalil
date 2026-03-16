'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cats, topRated, getCat } from '@/lib/data'
import { useLang, tx } from '@/lib/lang'

function Stars({ n }: { n: number }) {
  return <span>{[1,2,3,4,5].map(i=><span key={i} style={{color: i<=Math.round(n)?'#f59e0b':'#d1d5db',fontSize:13}}>★</span>)}</span>
}

function LangBtn({ l, set }: { l: 'en'|'ar', set: (x:'en'|'ar')=>void }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{position:'relative'}}>
      <button onClick={()=>setOpen(o=>!o)} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 12px',borderRadius:999,border:'1px solid #e5e7eb',background:'#fff',fontSize:13,fontWeight:500,color:'#374151',cursor:'pointer'}}>
        🌐 {l==='en'?'EN':'ع'} ▾
      </button>
      {open && (
        <div onClick={()=>setOpen(false)} style={{position:'absolute',top:'110%',right:0,background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,overflow:'hidden',minWidth:130,boxShadow:'0 4px 16px rgba(0,0,0,0.1)',zIndex:100}}>
          {(['en','ar'] as const).map(x=>(
            <button key={x} onClick={()=>set(x)} style={{display:'flex',alignItems:'center',gap:8,width:'100%',padding:'10px 16px',fontSize:13,background:l===x?'#f0fdf4':'#fff',color:l===x?'#15803d':'#374151',border:'none',cursor:'pointer',fontWeight:l===x?600:400}}>
              {x==='en'?'🇬🇧 English':'🇯🇴 العربية'}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [l, setL] = useLang()
  const top = topRated()

  return (
    <div className="wrap">
      {/* Navbar */}
      <nav style={{position:'sticky',top:0,zIndex:50,background:'#fff',borderBottom:'1px solid #f3f4f6',padding:'0 16px',height:56,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link href="/" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:20,fontWeight:700,color:'#15803d'}}>{l==='ar'?'دليل':'Dalil'}</span>
          <span style={{fontSize:12,color:'#9ca3af',fontWeight:500}}>{l==='ar'?'عمّان':'Amman'}</span>
        </Link>
        <LangBtn l={l} set={setL} />
      </nav>

      {/* Hero */}
      <div style={{background:'linear-gradient(135deg,#166534,#14532d)',padding:'28px 20px 32px'}}>
        <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:12}}>
          <span style={{fontSize:12,color:'#86efac'}}>📍 Amman, Jordan</span>
        </div>
        <div style={{fontSize:24,fontWeight:700,color:'#fff',lineHeight:1.3,marginBottom:4}}>{l==='ar'?'ابحث عن خدمات':'Find trusted'}</div>
        <div style={{fontSize:24,fontWeight:700,color:'#86efac',lineHeight:1.3,marginBottom:20}}>{l==='ar'?'موثوقة بسهولة':'local services'}</div>
        <Link href="/search" style={{display:'block',background:'#fff',borderRadius:16,padding:'14px 16px 14px 44px',fontSize:14,color:'#9ca3af',textDecoration:'none',position:'relative'}}>
          <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',fontSize:16}}>🔍</span>
          {tx(l,'search')}
        </Link>
      </div>

      {/* Categories */}
      <div style={{padding:'24px 16px 16px'}}>
        <div style={{fontSize:15,fontWeight:700,color:'#111',marginBottom:12}}>{tx(l,'all')}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
          {cats.map((c,i)=>(
            <Link key={c.id} href={`/search?cat=${c.slug}`} style={{textDecoration:'none',animationDelay:`${i*0.06}s`}} className="anim">
              <div style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:16,padding:'14px 8px',textAlign:'center',cursor:'pointer',transition:'box-shadow 0.2s'}}>
                <div style={{fontSize:28,marginBottom:6}}>{c.icon}</div>
                <div style={{fontSize:11,fontWeight:600,color:c.text,lineHeight:1.3}}>{l==='ar'?c.ar:c.en}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Top rated */}
      <div style={{padding:'8px 16px 32px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
          <div style={{fontSize:15,fontWeight:700,color:'#111',display:'flex',alignItems:'center',gap:6}}>
            <span style={{color:'#f59e0b'}}>★</span> {tx(l,'top_rated')}
          </div>
          <Link href="/search" style={{fontSize:12,color:'#15803d',fontWeight:500,textDecoration:'none'}}>{tx(l,'view_all')} →</Link>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {top.map((p,i)=>{
            const cat = getCat(p.catId)
            const name = l==='ar'?p.nameAr:p.name
            const hood = l==='ar'?p.hoodAr:p.hood
            const init = p.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
            return (
              <Link key={p.id} href={`/providers/${p.slug}`} style={{textDecoration:'none'}} className="anim">
                <div style={{background:'#fff',borderRadius:16,border:'1px solid #f3f4f6',padding:14,display:'flex',alignItems:'center',gap:12,transition:'border-color 0.2s,box-shadow 0.2s'}}>
                  <div style={{width:44,height:44,borderRadius:12,background:'#f0fdf4',border:'1px solid #bbf7d0',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <span style={{color:'#166534',fontWeight:700,fontSize:13}}>{init}</span>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <span style={{fontWeight:600,fontSize:14,color:'#111',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{name}</span>
                      {p.verified&&<span style={{width:16,height:16,borderRadius:'50%',background:'#16a34a',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><span style={{color:'#fff',fontSize:9}}>✓</span></span>}
                    </div>
                    <div style={{fontSize:12,color:'#6b7280',marginTop:2}}>{cat.icon} {l==='ar'?cat.ar:cat.en} · {hood}</div>
                  </div>
                  <div style={{textAlign:'right',flexShrink:0}}>
                    <div style={{fontSize:14,fontWeight:700,color:'#111'}}>{p.rating.toFixed(1)}</div>
                    <div style={{fontSize:11,color:'#f59e0b'}}>★ {p.reviews}</div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Provider CTA */}
      <div style={{margin:'0 16px 32px',background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:16,padding:16,textAlign:'center'}}>
        <div style={{fontSize:14,fontWeight:600,color:'#14532d',marginBottom:4}}>{tx(l,'provider_cta')}</div>
        <div style={{fontSize:12,color:'#166534',marginBottom:12}}>{tx(l,'provider_sub')}</div>
        <Link href="/search" style={{display:'inline-block',background:'#166534',color:'#fff',fontSize:12,fontWeight:600,padding:'8px 16px',borderRadius:10,textDecoration:'none'}}>
          {tx(l,'find_listing')}
        </Link>
      </div>
    </div>
  )
}
