import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Catalog from './pages/Catalog.jsx'
import Product from './pages/Product.jsx'
import CartPage from './pages/CartPage.jsx'
import Checkout from './pages/Checkout.jsx'
import Confirm from './pages/Confirm.jsx'
import { CartProvider, useCart } from './lib/cart.jsx'

import { ShoppingCart, Info, Search as SearchIcon } from 'lucide-react'

function Header(){
  const nav = useNavigate()
  const { count } = useCart()
  const onSearch = (e)=>{
    e.preventDefault()
    const q = e.target.q.value.trim()
    if(q) nav(`/catalog?q=${encodeURIComponent(q)}`)
  }
  const setActive = ({isActive})=> isActive ? 'active' : ''
  return (
    <header className="header">
      <div className="container topbar">
        <NavLink to="/" className="brand">
          <span className="logo">RS</span>
          <h1>Royal Smoke Shop</h1>
        </NavLink>
        <form className="search" onSubmit={onSearch}>
          <input name="q" aria-label="Search" placeholder="Search products..." />
          <button aria-label="Search"><SearchIcon size={18}/></button>
        </form>
        <div className="actions">
          <NavLink to="/about" className="badge"><Info size={16}/> About</NavLink>
          <NavLink to="/cart" className="badge"><ShoppingCart size={16}/> Cart • <span>{count}</span></NavLink>
        </div>
      </div>
      <nav className="container navbar">
        <NavLink to="/" className={setActive}>Home</NavLink>
        <NavLink to="/catalog" className={setActive}>Catalog</NavLink>
        <NavLink to="/catalog?cat=glass">Glass</NavLink>
        <NavLink to="/catalog?cat=vapes">Vapes</NavLink>
        <NavLink to="/catalog?cat=papers">Papers</NavLink>
        <NavLink to="/catalog?cat=accessories">Accessories</NavLink>
        <NavLink to="/about" className={setActive}>About</NavLink>
        <NavLink to="/contact" className={setActive}>Contact</NavLink>
      </nav>
    </header>
  )
}

function Contact(){
  return (
    <div className="container">
      <section className="card">
        <h2 className="title" style={{marginTop:0}}>Contact</h2>
        <p>Email: <a href="mailto:hello@royalsmoke.shop">hello@royalsmoke.shop</a></p>
        <p>IG: <a href="#">@royalsmoke.shop</a></p>
        <p>Must be 21+ to purchase. Please vape/smoke responsibly.</p>
      </section>
    </div>
  )
}

function Backdrop(){
  useEffect(()=>{
    const onMove = (e)=>{
      const x=(e.clientX/window.innerWidth-.5)*6, y=(e.clientY/window.innerHeight-.5)*6
      const el = document.querySelector('.backdrop'); if(el){ el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.02)` }
    }
    const el = document.createElement('div')
    el.className = 'backdrop'
    const particles = document.createElement('div')
    particles.className = 'particles'
    for(let i=0; i<30; i++){
      const dot = document.createElement('i')
      dot.style.left = Math.random()*100 + 'vw'
      dot.style.animationDelay = (Math.random()*16) + 's'
      dot.style.opacity = (0.2 + Math.random()*0.6).toFixed(2)
      dot.style.width = dot.style.height = (6+Math.random()*10) + 'px'
      particles.appendChild(dot)
    }
    el.appendChild(particles)
    document.body.appendChild(el)
    window.addEventListener('mousemove', onMove)
    return ()=>{ window.removeEventListener('mousemove', onMove); el.remove() }
  }, [])
  return null
}

function Footer(){
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Royal Smoke Shop — All rights reserved.
    </footer>
  )
}

export default function App(){
  const loc = useLocation()
  useEffect(()=>{ window.scrollTo({top:0, behavior:'smooth'}) }, [loc])
  return (
    <CartProvider>
      <Backdrop />
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  )
}
