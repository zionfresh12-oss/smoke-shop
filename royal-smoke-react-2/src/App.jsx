import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import About from "./pages/About.jsx";
import Cart from "./pages/Cart.jsx";

export default function App() {
  return (
    <div className="app" style={{ fontFamily: "system-ui, sans-serif" }}>
      <NavBar />
      <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}
