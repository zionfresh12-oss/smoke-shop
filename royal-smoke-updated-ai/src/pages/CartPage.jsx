import { Link } from 'react-router-dom'
import { useCart } from '../lib/cart.jsx'
import { PRODUCTS } from '../lib/products.js'
export default function CartPage(){
  const { cart, set, remove, subtotal } = useCart()
  const rows = Object.entries(cart)
  if(rows.length===0){
    return <section className="card"><p>Your cart is empty. <Link to="/catalog">Browse the catalog</Link>.</p></section>
  }
  return (
    <section className="card">
      <h2 className="title" style={{marginTop:0}}>Your Cart</h2>
      <table className="table"><tbody>
        {rows.map(([id,qty])=>{
          const p = PRODUCTS.find(x=>x.id===id)
          return (
            <tr key={id} className="tr">
              <td><img className="thumb-sm" src={p.img} alt={p.name}/></td>
              <td>{p.name}<div style={{opacity:.8}}>${p.price.toFixed(2)} each</div></td>
              <td>
                <div className="qty">
                  <button onClick={()=>set(id, qty-1)}>−</button>
                  <span>{qty}</span>
                  <button onClick={()=>set(id, qty+1)}>+</button>
                </div>
              </td>
              <td style={{fontWeight:700}}>${(p.price*qty).toFixed(2)}</td>
              <td><button className="remove" onClick={()=>remove(id)}>Remove</button></td>
            </tr>
          )
        })}
      </tbody></table>
      <div className="summary card">
        <strong>Subtotal: ${subtotal.toFixed(2)}</strong>
        <div style={{display:'flex', gap:8}}>
          <Link className="cta" to="/catalog">Continue shopping</Link>
          <Link className="badge" to="/checkout">Proceed to Checkout</Link>
        </div>
      </div>
    </section>
  )
}
