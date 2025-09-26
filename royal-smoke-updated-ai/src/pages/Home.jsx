import { PRODUCTS } from '../lib/products.js'
import ProductCard from '../components/ProductCard.jsx'
export default function Home(){
  const featured = PRODUCTS.slice(0,10)
  return (
    <div>
      <section className="hero">
        <div className="card">
          <h2 className="title">Glassy. Neon. Interdimensional Vibes.</h2>
          <p className="subtitle">Featured picks from our full catalog. Clean glass UI over a trippy background—green, yellow, and blue accents.</p>
        </div>
        <div className="card">
          <strong>Perks</strong>
          <ul>
            <li>Free local pickup</li>
            <li>Secure checkout</li>
            <li>Rewards program (coming soon)</li>
          </ul>
        </div>
      </section>
      <section className="card">
        <h3>Featured Items</h3>
        <div className="grid">
          {featured.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  )
}
