import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const closeMenu = () => setMenuOpen(false);

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid position-relative d-flex align-items-center justify-content-between">

        {/* Left: Logo */}
        <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
          <img src="/pizza.png" alt="Logo" />
        </Link>

        {/* Hamburger Toggle */}
        <i
          className={`mobile-nav-toggle d-xl-none text-dark bi ${menuOpen ? 'bi-x' : 'bi-list'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        ></i>

        {/* Nav menu */}
        <nav id="navmenu" className={`navmenu ${menuOpen ? 'navmenu-active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={closeMenu} className={isActive('/') ? 'text-warning text-decoration-underline' : ''}>Home</Link></li>
            <li><Link to="/events" onClick={closeMenu} className={isActive('/events') ? 'text-warning text-decoration-underline' : ''}>Events</Link></li>
            <li><Link to="/menu" onClick={closeMenu} className={isActive('/menu') ? 'text-warning text-decoration-underline' : ''}>Revolving Menu</Link></li>
            <li><Link to="/gallery" onClick={closeMenu} className={isActive('/gallery') ? 'text-warning text-decoration-underline' : ''}>Gallery</Link></li>
            <li><Link to="/about" onClick={closeMenu} className={isActive('/about') ? 'text-warning text-decoration-underline' : ''}>About</Link></li>
            <li><Link to="/book" onClick={closeMenu} className={isActive('/book') ? 'text-warning text-decoration-underline' : ''}>Book Me</Link></li>
          </ul>
        </nav>

        {/* ✅ One Social Icon for all views */}
        <div className="header-social-links shared-social">
          <a
            href="https://www.instagram.com/ediblemamipizza/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <i className="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </header>
  );
}
