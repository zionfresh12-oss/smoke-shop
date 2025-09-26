import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../lib/cart.jsx'
export default function ProductCard({p}){
  const { add } = useCart()
  const loc = useLocation()
  return (
    <div className="product card">
      <Link to={`/product/${p.id}${loc.search}`}>
        <img className="thumb" src={p.img} alt={p.name} loading="lazy" />
      </Link>
      <Link to={`/product/${p.id}${loc.search}`}>{p.name}</Link>
      <div className="price">${p.price.toFixed(2)}</div>
      <button className="badge" onClick={()=>add(p.id)}>Add to cart</button>
    </div>
  )
}
