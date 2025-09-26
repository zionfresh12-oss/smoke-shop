import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PRODUCTS } from '../lib/products.js'
import ProductCard from '../components/ProductCard.jsx'
import Pager from '../components/Pager.jsx'

function paginate(items, size, page){
  const total = Math.max(1, Math.ceil(items.length/size))
  const p = Math.min(Math.max(1, page), total)
  const start = (p-1)*size
  return {slice: items.slice(start, start+size), page: p, total}
}

export default function Catalog(){
  const [params, setParams] = useSearchParams()
  const q = (params.get('q')||'').toLowerCase()
  const cat = params.get('cat') || ''
  const page = parseInt(params.get('page')||'1', 10)
  const items = useMemo(()=>{
    let res = PRODUCTS.slice()
    if(cat) res = res.filter(p=>p.category===cat)
    if(q) res = res.filter(p=>p.name.toLowerCase().includes(q))
    return res
  }, [q, cat])
  const {slice, page:cur, total} = paginate(items, 10, page)
  return (
    <section className="category-layout">
      <aside className="sidebar">
        <div className="card filter">
          <strong>Shop by Category</strong>
          {['', 'glass','vapes','papers','accessories'].map(c => (
            <button key={c||'all'} className={cat===c ? 'active' : ''}
              onClick={()=>{ const n=new URLSearchParams(params); if(c) n.set('cat',c); else n.delete('cat'); n.delete('page'); setParams(n) }}>
              {c? c[0].toUpperCase()+c.slice(1) : 'All'}
            </button>
          ))}
        </div>
      </aside>
      <section className="card">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:10}}>
          <h2 className="title" style={{margin:0}}>Catalog</h2>
          <div>{q? `Search: “${q}”` : cat? `Category: ${cat}` : 'All products'}</div>
        </div>
        <div className="grid">
          {slice.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
        <Pager page={cur} total={total} />
      </section>
    </section>
  )
}
