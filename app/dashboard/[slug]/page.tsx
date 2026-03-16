'use client'
import { use, useState } from 'react'
import Link from 'next/link'
import { providers, getProvider, getCat, getReviews } from '@/lib/data'
import { useLang, tx } from '@/lib/lang'

export default function Dashboard({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [l] = useLang()
  const p = getProvider(slug)
  const [desc, setDesc] = useState(p?.desc||'')
  const [hours, setHours] = useState(p?.hours||'')
  const [editing, setEditing] = useState<string|null>(null)
  const [saved, setSaved] = useState<string|null>(null)

  if (!p) return <div className="wrap" style={{padding:40,textAlign:'center'}}><Link href="/" style={{color:'#166534',textDecoration:'none'}}>← Home</Link></div>

  const cat = getCat(p.catId)
  const revs = getReviews(p.id)
  const init = p.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()

  const save = (field: string) => { setSaved(field); setEditing(null); setTimeout(()=>setSaved(null),2000) }

  return (
    <div className="wrap">
      <nav style={{position:'sticky',top:0,zIndex:50,background:'#fff',borderBottom:'1px solid #f3f4f6',padding:'0 16px',height:56,display:'flex',alignItems:'center',gap:12}}>
        <Link href={`/providers/${p.slug}`} style={{color:'#6b7280',textDecoration:'none',fontSize:20}}>←</Link>
        <span style={{fontSize:15,fontWeight:600,color:'#111'}}>{tx(l,'manage')}</span>
      </nav>

      <div style={{padding:'20px 16px 40px',display:'flex',flexDirection:'column',gap:14}} className="anim">
        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
          {[
            { label:'Rating', val:p.rating.toFixed(1), icon:'⭐' },
            { label:tx(l,'reviews'), val:String(revs.length), icon:'💬' },
            { label:'Views', val:'—', icon:'👁️' },
          ].map(s=>(
            <div key={s.label} style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:14,padding:12,textAlign:'center'}}>
              <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
              <div style={{fontSize:18,fontWeight:700,color:'#111'}}>{s.val}</div>
              <div style={{fontSize:11,color:'#6b7280'}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Photo */}
        <div style={{background:'#fff',border:'1px solid #f3f4f6',borderRadius:16,padding:16}}>
          <div style={{fontSize:13,fontWeight:600,color:'#374151',marginBottom:12}}>Profile Photo</div>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:56,height:56,borderRadius:14,background:'#f0fdf4',border:'2px solid #bbf7d0',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <span style={{color:'#166534',fontWeight:700,fontSize:18}}>{init}</span>
            </div>
            <button style={{display:'flex',alignItems:'center',gap:8,padding:'8px 16px',borderRadius:12,border:'1px solid #e5e7eb',background:'#fff',cursor:'pointer',fontSize:13,fontWeight:500,color:'#374151'}}>
              📷 {tx(l,'upload')}
            </button>
          </div>
        </div>

        {/* Description */}
        <div style={{background:'#fff',border:'1px solid #f3f4f6',borderRadius:16,padding:16}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
            <div style={{fontSize:13,fontWeight:600,color:'#374151'}}>📝 {tx(l,'edit_desc')}</div>
            {editing!=='desc'&&<button onClick={()=>setEditing('desc')} style={{fontSize:12,color:'#166534',fontWeight:600,background:'none',border:'none',cursor:'pointer'}}>Edit</button>}
          </div>
          {editing==='desc' ? (
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={4} maxLength={400}
                style={{width:'100%',padding:'10px 12px',borderRadius:12,border:'1px solid #e5e7eb',fontSize:13,resize:'none',outline:'none'}} />
              <div style={{display:'flex',gap:8}}>
                <button onClick={()=>save('desc')} style={{flex:1,padding:'10px',borderRadius:12,border:'none',background:'#166534',color:'#fff',fontSize:13,fontWeight:600,cursor:'pointer'}}>{tx(l,'save')}</button>
                <button onClick={()=>setEditing(null)} style={{padding:'10px 16px',borderRadius:12,border:'1px solid #e5e7eb',background:'#fff',fontSize:13,cursor:'pointer'}}>{tx(l,'cancel')}</button>
              </div>
            </div>
          ) : <div style={{fontSize:13,color:'#374151',lineHeight:1.6}}>{desc||p.desc}</div>}
          {saved==='desc'&&<div style={{fontSize:12,color:'#166534',fontWeight:500,marginTop:8}}>✓ {tx(l,'saved')}</div>}
        </div>

        {/* Hours */}
        <div style={{background:'#fff',border:'1px solid #f3f4f6',borderRadius:16,padding:16}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
            <div style={{fontSize:13,fontWeight:600,color:'#374151'}}>🕐 {tx(l,'edit_hours')}</div>
            {editing!=='hours'&&<button onClick={()=>setEditing('hours')} style={{fontSize:12,color:'#166634',fontWeight:600,background:'none',border:'none',cursor:'pointer'}}>Edit</button>}
          </div>
          {editing==='hours' ? (
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <input value={hours} onChange={e=>setHours(e.target.value)} placeholder="e.g. Sat–Thu 8am–8pm"
                style={{width:'100%',padding:'10px 12px',borderRadius:12,border:'1px solid #e5e7eb',fontSize:13,outline:'none'}} />
              <div style={{display:'flex',gap:8}}>
                <button onClick={()=>save('hours')} style={{flex:1,padding:'10px',borderRadius:12,border:'none',background:'#166534',color:'#fff',fontSize:13,fontWeight:600,cursor:'pointer'}}>{tx(l,'save')}</button>
                <button onClick={()=>setEditing(null)} style={{padding:'10px 16px',borderRadius:12,border:'1px solid #e5e7eb',background:'#fff',fontSize:13,cursor:'pointer'}}>{tx(l,'cancel')}</button>
              </div>
            </div>
          ) : <div style={{fontSize:13,color:'#374151'}}>{hours||p.hours}</div>}
          {saved==='hours'&&<div style={{fontSize:12,color:'#166534',fontWeight:500,marginTop:8}}>✓ {tx(l,'saved')}</div>}
        </div>

        {/* Recent reviews */}
        {revs.length>0&&(
          <div style={{background:'#fff',border:'1px solid #f3f4f6',borderRadius:16,padding:16}}>
            <div style={{fontSize:13,fontWeight:600,color:'#374151',marginBottom:12}}>Recent Reviews</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {revs.slice(0,2).map(r=>(
                <div key={r.id} style={{borderBottom:'1px solid #f9fafb',paddingBottom:10}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:4}}>
                    <span style={{fontSize:13,fontWeight:600,color:'#111'}}>{r.author}</span>
                    <span>{[1,2,3,4,5].map(s=><span key={s} style={{color:s<=r.stars?'#f59e0b':'#e5e7eb',fontSize:12}}>★</span>)}</span>
                  </div>
                  <div style={{fontSize:12,color:'#6b7280'}}>{r.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View public */}
        <Link href={`/providers/${p.slug}`} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'14px',borderRadius:16,border:'2px solid #bbf7d0',background:'#f0fdf4',color:'#166534',fontWeight:600,fontSize:14,textDecoration:'none'}}>
          🔗 {tx(l,'view_public')}
        </Link>
      </div>
    </div>
  )
}

