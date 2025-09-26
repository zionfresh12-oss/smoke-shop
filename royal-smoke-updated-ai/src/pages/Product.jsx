import { useParams, Link } from 'react-router-dom'
import { PRODUCTS } from '../lib/products.js'
import { useCart } from '../lib/cart.jsx'

export default function Product(){
  const { id } = useParams()
  const p = PRODUCTS.find(x=>x.id===id) || PRODUCTS[0]
  const { add } = useCart()
  return (
    <section className="card" style={{display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:14}}>
      <div>
        <img id="heroImg" src={(p.gallery?.[0]||p.img)} alt={p.name} style={{borderRadius:16, border:'1px solid rgba(255,255,255,.2)'}}/>
        <div style={{display:'flex', gap:8, marginTop:8, flexWrap:'wrap'}}>
          {(p.gallery||[p.img]).map((g,i)=>(
            <img key={i} src={g} alt={`thumb ${i+1}`} style={{width:68,height:68,borderRadius:12,border:'1px solid rgba(255,255,255,.22)',cursor:'pointer'}}
                 onClick={()=>{ const el=document.getElementById('heroImg'); if(el) el.src = g }} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="title" style={{marginTop:0}}>{p.name}</h2>
        <div className="price" style={{fontSize:22}}>${p.price.toFixed(2)}</div>
        <p style={{opacity:.95}}>{p.desc}</p>
        <ul style={{opacity:.95}}>{(p.specs||[]).map((s,i)=><li key={i}>{s}</li>)}</ul>
        <div style={{display:'flex', gap:8, alignItems:'center', marginTop:8}}>
          <button className="badge" onClick={()=>add(p.id)}>Add to cart</button>
          <Link className="cta" to="/cart">Go to cart</Link>
        </div>
      </div>
    </section>
  )
}
