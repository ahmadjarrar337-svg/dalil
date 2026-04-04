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
      <button onClick={()=>setOpen(o=>!o)} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 14px',borderRadius:999,border:'1.5px solid #e5e7eb',background:'#fff',fontSize:13,fontWeight:500,color:'#374151',cursor:'pointer'}}>
        🌐 {l==='en'?'EN':'ع'} ▾
      </button>
      {open&&<div onClick={()=>setOpen(false)} style={{position:'absolute',top:'110%',right:0,background:'#fff',border:'1px solid #e5e7eb',borderRadius:14,overflow:'hidden',minWidth:140,boxShadow:'0 8px 32px rgba(0,0,0,0.10)',zIndex:100}}>
        {(['en','ar'] as const).map(x=>(
          <button key={x} onClick={()=>set(x)} style={{display:'flex',alignItems:'center',gap:10,width:'100%',padding:'11px 18px',fontSize:13,background:l===x?'#f0fdf4':'#fff',color:l===x?'#15803d':'#374151',border:'none',cursor:'pointer',fontWeight:l===x?600:400}}>
            {x==='en'?'🇬🇧 English':'🇯🇴 العربية'}
          </button>
        ))}
      </div>}
    </div>
  )
}

function ProviderCard({ p, i, l }: { p: any, i: number, l: 'en'|'ar' }) {
  const cat = getCat(p.catId)
  const name = l==='ar' ? p.nameAr : p.name
  const hood = l==='ar' ? p.hoodAr : p.hood
  const catName = l==='ar' ? cat.ar : cat.en
  const init = p.name.split(' ').map((w:string)=>w[0]).join('').slice(0,2).toUpperCase()

  const palettes: Record<string,{light:string,accent:string,text:string}> = {
    c1:{light:'#EFF6FF',accent:'#3B82F6',text:'#1D4ED8'},
    c2:{light:'#FEFCE8',accent:'#F59E0B',text:'#B45309'},
    c3:{light:'#F8FAFC',accent:'#64748B',text:'#334155'},
    c4:{light:'#ECFEFF',accent:'#06B6D4',text:'#0E7490'},
    c5:{light:'#FAF5FF',accent:'#A855F7',text:'#7E22CE'},
    c6:{light:'#F0FDF4',accent:'#22C55E',text:'#15803D'},
  }
  const pal = palettes[p.catId] || palettes['c1']

  return (
    <Link href={`/providers/${p.slug}`} style={{textDecoration:'none',display:'block'}}>
      <div style={{background:'#fff',borderRadius:20,border:'1.5px solid #f1f5f9',overflow:'hidden',transition:'all 0.2s ease',cursor:'pointer'}}
        onMouseEnter={e=>{const d=e.currentTarget as HTMLDivElement;d.style.border='1.5px solid #e2e8f0';d.style.boxShadow='0 8px 32px rgba(0,0,0,0.08)';d.style.transform='translateY(-2px)'}}
        onMouseLeave={e=>{const d=e.currentTarget as HTMLDivElement;d.style.border='1.5px solid #f1f5f9';d.style.boxShadow='none';d.style.transform='translateY(0)'}}>

        {/* Color top strip */}
        <div style={{height:4,background:`linear-gradient(90deg,${pal.accent},${pal.accent}66)`}} />

        <div style={{padding:'18px 18px 16px'}}>
          <div style={{display:'flex',alignItems:'flex-start',gap:14}}>

            {/* Icon avatar */}
            <div style={{width:52,height:52,borderRadius:16,background:pal.light,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:22}}>
              {cat.icon}
            </div>

            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:8}}>
                <div style={{minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:15,color:'#0f172a',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',letterSpacing:'-0.2px'}}>{name}</div>
                  <div style={{fontSize:12,color:pal.text,fontWeight:600,marginTop:2}}>{catName}</div>
                </div>
                {p.verified
                  ? <div style={{flexShrink:0,display:'flex',alignItems:'center',gap:4,background:'#f0fdf4',color:'#15803d',fontSize:11,fontWeight:700,padding:'4px 10px',borderRadius:999,border:'1.5px solid #bbf7d0',whiteSpace:'nowrap'}}>✓ {tx(l,'verified')}</div>
                  : <div style={{flexShrink:0,fontSize:11,color:'#cbd5e1',fontWeight:500}}>{tx(l,'unclaimed')}</div>
                }
              </div>

              {/* Stars */}
              <div style={{display:'flex',alignItems:'center',gap:6,marginTop:10}}>
                <div style={{display:'flex',gap:1}}>
                  {[1,2,3,4,5].map(s=><span key={s} style={{fontSize:13,color:s<=Math.round(p.rating)?'#f59e0b':'#e2e8f0'}}>★</span>)}
                </div>
                <span style={{fontSize:13,fontWeight:700,color:'#0f172a'}}>{p.rating.toFixed(1)}</span>
                {p.reviews>=3&&<span style={{fontSize:12,color:'#94a3b8'}}>({p.reviews})</span>}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{height:1,background:'#f1f5f9',margin:'14px 0 12px'}} />

          {/* Footer */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div style={{display:'flex',alignItems:'center',gap:5}}>
              <span style={{fontSize:12}}>📍</span>
              <span style={{fontSize:12,color:'#64748b',fontWeight:500}}>{hood}</span>
            </div>
            {p.exp>0&&<div style={{fontSize:11,color:'#94a3b8'}}>{p.exp} {tx(l,'exp')}</div>}
            <div style={{fontSize:12,fontWeight:600,color:pal.text}}>
              {l==='en'?'View →':'عرض →'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function SearchInner() {
  const [l, setL] = useLang()
  const sp = useSearchParams()
  const [activeCat, setActiveCat] = useState('')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(()=>{ setActiveCat(sp.get('cat')||'') },[sp])

  const filtered = providers
    .filter(p => {
      if (activeCat) { const c=cats.find(c=>c.slug===activeCat); if(c&&p.catId!==c.id) return false }
      if (verifiedOnly&&!p.verified) return false
      if (search) { const q=search.toLowerCase(); if(!p.name.toLowerCase().includes(q)&&!p.nameAr.includes(q)&&!p.hood.toLowerCase().includes(q)) return false }
      return true
    })
    .sort((a,b)=>b.rating-a.rating)

  const activeCatObj = cats.find(c=>c.slug===activeCat)
  const title = activeCatObj?(l==='ar'?activeCatObj.ar:activeCatObj.en):(l==='ar'?'جميع الخدمات':'All Services')

  return (
    <div style={{maxWidth:480,margin:'0 auto',background:'#f8fafc',minHeight:'100vh'}}>

      {/* Navbar */}
      <nav style={{position:'sticky',top:0,zIndex:50,background:'#fff',borderBottom:'1px solid #f1f5f9',padding:'0 20px',height:58,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link href="/" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:20,fontWeight:800,color:'#15803d',letterSpacing:'-0.5px'}}>{l==='ar'?'دليل':'Dalil'}</span>
          <span style={{fontSize:11,color:'#94a3b8',fontWeight:500,background:'#f1f5f9',padding:'2px 8px',borderRadius:999}}>{l==='ar'?'عمّان':'Amman'}</span>
        </Link>
        <LangBtn l={l} set={setL} />
      </nav>

      {/* Header + filters */}
      <div style={{background:'#fff',borderBottom:'1px solid #f1f5f9',padding:'16px 20px 0'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
          <Link href="/" style={{width:36,height:36,borderRadius:12,background:'#f8fafc',display:'flex',alignItems:'center',justifyContent:'center',color:'#64748b',textDecoration:'none',fontSize:18,border:'1.5px solid #f1f5f9',flexShrink:0}}>←</Link>
          <div>
            <div style={{fontSize:18,fontWeight:800,color:'#0f172a',letterSpacing:'-0.3px'}}>{title}</div>
            <div style={{fontSize:12,color:'#94a3b8',marginTop:1}}>{filtered.length} {tx(l,'found')} · {tx(l,'sorted')}</div>
          </div>
        </div>

        {/* Search */}
        <div style={{position:'relative',marginBottom:14}}>
          <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',fontSize:15,pointerEvents:'none'}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={tx(l,'search')}
            style={{width:'100%',paddingLeft:42,paddingRight:16,height:44,borderRadius:14,border:'1.5px solid #e2e8f0',fontSize:14,outline:'none',background:'#f8fafc',color:'#0f172a',boxSizing:'border-box'}} />
        </div>

        {/* Category pills */}
        <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:14,scrollbarWidth:'none'}}>
          <button onClick={()=>setActiveCat('')} style={{flexShrink:0,padding:'7px 14px',borderRadius:999,fontSize:12,fontWeight:600,border:'1.5px solid',cursor:'pointer',background:!activeCat?'#0f172a':'transparent',color:!activeCat?'#fff':'#64748b',borderColor:!activeCat?'#0f172a':'#e2e8f0'}}>
            {tx(l,'all')}
          </button>
          {cats.map(c=>(
            <button key={c.id} onClick={()=>setActiveCat(activeCat===c.slug?'':c.slug)} style={{flexShrink:0,display:'flex',alignItems:'center',gap:6,padding:'7px 14px',borderRadius:999,fontSize:12,fontWeight:600,border:'1.5px solid',cursor:'pointer',background:activeCat===c.slug?'#0f172a':'transparent',color:activeCat===c.slug?'#fff':'#64748b',borderColor:activeCat===c.slug?'#0f172a':'#e2e8f0'}}>
              {c.icon} {l==='ar'?c.ar:c.en}
            </button>
          ))}
        </div>
      </div>

      {/* Verified toggle */}
      <div style={{padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <label style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer'}}>
          <button onClick={()=>setVerifiedOnly(v=>!v)} style={{position:'relative',width:40,height:22,borderRadius:11,border:'none',cursor:'pointer',background:verifiedOnly?'#15803d':'#e2e8f0',padding:0,transition:'background 0.2s',flexShrink:0}}>
            <span style={{position:'absolute',top:3,left:verifiedOnly?19:3,width:16,height:16,background:'#fff',borderRadius:'50%',boxShadow:'0 1px 4px rgba(0,0,0,0.2)',transition:'left 0.2s',display:'block'}}/>
          </button>
          <span style={{fontSize:13,color:'#374151',fontWeight:500}}>{tx(l,'verified')} only</span>
        </label>
        <span style={{fontSize:12,color:'#94a3b8'}}>{filtered.length} results</span>
      </div>

      {/* Cards */}
      <div style={{padding:'4px 16px 48px',display:'flex',flexDirection:'column',gap:12}}>
        {filtered.length===0 ? (
          <div style={{textAlign:'center',padding:'80px 0'}}>
            <div style={{fontSize:48,marginBottom:16}}>🔍</div>
            <div style={{fontWeight:600,fontSize:16,color:'#475569',marginBottom:4}}>{tx(l,'no_results')}</div>
            <div style={{fontSize:13,color:'#94a3b8'}}>Try a different category or search term</div>
          </div>
        ) : filtered.map((p,i)=><ProviderCard key={p.id} p={p} i={i} l={l} />)}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{maxWidth:480,margin:'0 auto',padding:'32px 16px',display:'flex',flexDirection:'column',gap:12}}>{[...Array(4)].map((_,i)=><div key={i} style={{height:120,background:'#f1f5f9',borderRadius:20}}/>)}</div>}>
      <SearchInner />
    </Suspense>
  )
}