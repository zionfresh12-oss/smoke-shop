import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../lib/products.js'

export default function Confirm(){
  const order = useMemo(()=>{
    try{ return JSON.parse(localStorage.getItem('rss_last_order')) }catch{ return null }
  }, [])
  if(!order) return <section className="card"><p>No order found.</p><Link className="badge" to="/catalog">Shop</Link></section>
  return (
    <section className="card">
      <h2 className="title" style={{marginTop:0}}>Thank you! Order {order.id}</h2>
      <p>We sent a receipt to <b>{order.ship?.email||'your email'}</b>. Estimated delivery in 3–5 business days.</p>
      <table className="table"><tbody>
        {Object.entries(order.items).map(([id,qty])=>{
          const p = PRODUCTS.find(x=>x.id===id)
          return <tr key={id} className="tr"><td><img className="thumb-sm" src={p.img} /></td><td>{p.name}</td><td>{qty}</td><td>${(p.price*qty).toFixed(2)}</td></tr>
        })}
      </tbody></table>
      <div className="summary card"><div>Subtotal</div><strong>${order.totals.sub.toFixed(2)}</strong></div>
      <div className="summary card"><div>Total</div><strong>${order.totals.total.toFixed(2)}</strong></div>
      <Link className="badge" to="/catalog">Continue shopping</Link>
    </section>
  )
}
