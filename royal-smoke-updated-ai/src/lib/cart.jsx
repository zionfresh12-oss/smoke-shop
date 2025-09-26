import React, {createContext, useContext, useEffect, useMemo, useState} from 'react'
import { PRODUCTS } from './products.js'

const KEY = 'rss_cart_v2'
const CartCtx = createContext(null)

export function CartProvider({children}){
  const [cart, setCart] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} }
  })
  useEffect(()=>{ localStorage.setItem(KEY, JSON.stringify(cart)) }, [cart])
  const add = (id, qty=1)=> setCart(c => ({...c, [id]: (c[id]||0)+qty}))
  const set = (id, qty)=> setCart(c => { const n={...c}; if(qty<=0) delete n[id]; else n[id]=qty; return n })
  const remove = (id)=> setCart(c => { const n={...c}; delete n[id]; return n })
  const count = useMemo(()=> Object.values(cart).reduce((a,b)=>a+b,0), [cart])
  const subtotal = useMemo(()=> Object.entries(cart).reduce((s,[id,q])=>{ const p=PRODUCTS.find(x=>x.id===id); return s + (p?p.price*q:0)},0), [cart])
  const value = useMemo(()=>({cart, add, set, remove, count, subtotal}), [cart, subtotal])
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}
export const useCart = ()=> useContext(CartCtx)
