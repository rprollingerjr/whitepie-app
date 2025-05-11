import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid position-relative d-flex align-items-center justify-content-between">

        <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
          <img src="/pizza.png" alt="Logo" />
        </Link>

        <i className="mobile-nav-toggle d-xl-none bi bi-list" onClick={() => setMenuOpen(!menuOpen)}></i>

        <nav id="navmenu" className={`navmenu ${menuOpen ? 'navmenu-active' : ''}`}>
          <ul>
            <li><Link to="/" className={isActive('/') ? 'text-warning' : ''}>Home</Link></li>
            <li><Link to="/events" className={isActive('/events') ? 'text-warning' : ''}>Events</Link></li>
            <li><Link to="/menu" className={isActive('/menu') ? 'text-warning' : ''}>Revolving Menu</Link></li>
            <li><Link to="/gallery" className={isActive('/menu') ? 'text-warning' : ''}>Gallery</Link></li>
            <li><Link to="/about" className={isActive('/about') ? 'text-warning' : ''}>About</Link></li>
            <li><Link to="/book" className={isActive('/book') ? 'text-warning' : ''}>Book Me</Link></li>
          </ul>
        </nav>

        <div className="header-social-links">
          <a href="https://www.instagram.com/ediblemamipizza/" target="_blank" rel="noopener noreferrer" className="instagram">
            <i className="bi bi-instagram"></i>
          </a>
        </div>

      </div>
    </header>
  );
}
