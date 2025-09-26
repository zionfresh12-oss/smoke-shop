import { Link, useSearchParams } from 'react-router-dom'
export default function Pager({page, total}){
  const [params] = useSearchParams()
  const to = (n)=>{ const q = new URLSearchParams(params); if(n<=1) q.delete('page'); else q.set('page', n); return `?${q.toString()}` }
  const pages = Array.from({length: total}, (_,i)=>i+1)
  return (
    <div className="pager">
      <Link to={to(1)} aria-label="First">« First</Link>
      <Link to={to(Math.max(1,page-1))} aria-label="Previous">‹ Prev</Link>
      {pages.map(n => n===page ? <span key={n} className="current">{n}</span> : <Link key={n} to={to(n)}>{n}</Link>)}
      <Link to={to(Math.min(total,page+1))} aria-label="Next">Next ›</Link>
      <Link to={to(total)} aria-label="Last">Last »</Link>
    </div>
  )
}
