import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navmenu bg-light px-3 shadow-sm">
      <Link className="navbar-brand fw-bold" to="/">🍕 WhitePie</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {[
            { to: '/', label: 'Home' },
            { to: '/events', label: 'Events' },
            { to: '/menu', label: 'Menu' },
            { to: '/gallery', label: 'Gallery' },
            { to: '/about', label: 'About' },
            { to: '/book', label: 'Book Me' },
          ].map(({ to, label }) => (
            <li className="nav-item" key={to}>
              <Link
                to={to}
                className={`nav-link ${pathname === to ? 'active fw-semibold' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}