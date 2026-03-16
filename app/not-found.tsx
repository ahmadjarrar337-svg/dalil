import Link from 'next/link'
export default function NotFound() {
  return (
    <div style={{maxWidth:480,margin:'0 auto',textAlign:'center',padding:'80px 20px',fontFamily:'system-ui,sans-serif'}}>
      <div style={{fontSize:56,marginBottom:16}}>🗺️</div>
      <h1 style={{fontSize:22,fontWeight:700,color:'#111',marginBottom:8}}>Page not found</h1>
      <p style={{fontSize:14,color:'#6b7280',marginBottom:24}}>This page doesn&apos;t exist on Dalil.</p>
      <Link href="/" style={{background:'#166534',color:'#fff',padding:'12px 24px',borderRadius:14,textDecoration:'none',fontSize:14,fontWeight:600}}>
        Back to Home
      </Link>
    </div>
  )
}
