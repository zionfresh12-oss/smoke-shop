import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../lib/cart.jsx'
import { PRODUCTS } from '../lib/products.js'

export default function Checkout(){
  const nav = useNavigate()
  const { cart, subtotal } = useCart()
  const rows = Object.entries(cart)
  const shipping = subtotal>=75 ? 0 : 6.99
  const tax = +(subtotal*0.06).toFixed(2)
  const total = +(subtotal + shipping + tax).toFixed(2)
  useEffect(()=>{ if(rows.length===0) nav('/cart') }, [rows.length])

  function placeOrder(e){
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target).entries())
    const order = { id: 'RS'+Math.floor(Math.random()*1e8).toString(16).toUpperCase(), items: cart, totals:{sub:subtotal, shipping, tax, total}, ship:data }
    localStorage.setItem('rss_last_order', JSON.stringify(order))
    localStorage.removeItem('rss_cart_v2')
    nav('/confirm')
  }

  return (
    <section className="card">
      <h2 className="title" style={{marginTop:0}}>Checkout</h2>
      <div className="two">
        <form onSubmit={placeOrder} className="form card">
          <label>Full name<span><input name="name" required placeholder="John Smith" /></span></label>
          <label>Email<span><input name="email" type="email" required placeholder="john@example.com" /></span></label>
          <div className="two">
            <label>Address<span><input name="addr" required placeholder="123 Main St" /></span></label>
            <label>City<span><input name="city" required placeholder="Your City" /></span></label>
          </div>
          <div className="two">
            <label>State<span><input name="state" required placeholder="FL" /></span></label>
            <label>ZIP<span><input name="zip" required placeholder="12345" /></span></label>
          </div>
          <div className="two">
            <label>Shipping<span><select name="ship" required><option value="standard">Standard (3–5 days) — $6.99</option><option value="expedited">Expedited (2-day) — $14.99</option></select></span></label>
            <label>Payment<span><select name="pay" required><option>Credit/Debit</option><option>Apple Pay</option><option>Google Pay</option></select></span></label>
          </div>
          <button className="badge" type="submit">Place order</button>
        </form>
        <div className="card">
          {rows.map(([id,qty])=>{
            const p = PRODUCTS.find(x=>x.id===id)
            return (
              <div key={id} style={{display:'flex', gap:10, alignItems:'center'}}>
                <img className="thumb-sm" src={p.img} alt={p.name} />
                <div style={{flex:1}}>
                  {p.name}
                  <div style={{opacity:.8}}>${p.price.toFixed(2)} × {qty}</div>
                </div>
                <strong>${(p.price*qty).toFixed(2)}</strong>
              </div>
            )
          })}
          <hr style={{borderColor:'rgba(255,255,255,.15)'}} />
          <div className="summary"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
          <div className="summary"><span>Shipping</span><strong>${shipping.toFixed(2)} {shipping===0?'(Free over $75)':''}</strong></div>
          <div className="summary"><span>Tax (6%)</span><strong>${tax.toFixed(2)}</strong></div>
          <div className="summary"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
        </div>
      </div>
    </section>
  )
}
