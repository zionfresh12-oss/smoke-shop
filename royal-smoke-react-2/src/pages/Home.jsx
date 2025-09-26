import React from "react";
import { Flame, Crown } from "lucide-react";

export default function Home() {
  return (
    <section>
      <h1 style={{ fontSize: 34, marginBottom: 8, display:"flex", gap:10, alignItems:"center" }}>
        <Crown size={32}/> Featured
      </h1>
      <p style={{ opacity: 0.8, marginBottom: 24 }}>
        If you can see this page, the dev server is running. Replace these cards with your AI product images later.
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:16 }}>
        {[1,2,3,4,5,6].map(i => (
          <div key={i} style={card}>
            <div style={thumb}/>
            <div style={{padding:12}}>
              <h3 style={{margin:"0 0 8px"}}>Product {i}</h3>
              <div style={{fontSize:14, opacity:0.8}}>Smooth pull, premium build.</div>
              <div style={{marginTop:10, fontWeight:700}}>$24.{i}9</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const card = {
  borderRadius: 16,
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "linear-gradient(180deg,#0f1720,#0c1219)",
  color: "white"
};

const thumb = {
  height: 140,
  background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), transparent 60%), linear-gradient(180deg,#18222e,#0c1219)"
};
