import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Cigarette, HomeIcon, Info } from "lucide-react";

const linkStyle = ({ isActive }) => ({
  padding: "8px 12px",
  borderRadius: 10,
  textDecoration: "none",
  color: "white",
  background: isActive ? "rgba(255,255,255,0.12)" : "transparent"
});

export default function NavBar() {
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.brand}>
        <Cigarette size={22} />
        <span>Royal Smoke Shop</span>
      </Link>
      <nav style={styles.nav}>
        <NavLink to="/" style={linkStyle}><HomeIcon size={18}/> Home</NavLink>
        <NavLink to="/catalog" style={linkStyle}>Catalog</NavLink>
        <NavLink to="/about" style={linkStyle}><Info size={18}/> About</NavLink>
        <NavLink to="/cart" style={linkStyle}><ShoppingCart size={18}/> Cart</NavLink>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    background: "linear-gradient(90deg,#0b0f14,#121a23)",
    color: "white",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    zIndex: 20
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 700,
    color: "white",
    textDecoration: "none",
    letterSpacing: 0.3
  },
  nav: {
    display: "flex",
    gap: 8
  }
};
