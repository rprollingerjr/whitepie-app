import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer text-white py-4 mt-5">
      <div className="container text-center">
        <div className="mb-2">
          <Link to="/" className="text-white text-decoration-none fw-bold fs-5">
            🍕 EdibleMami
          </Link>
        </div>
        <div className="mb-3">
          <a
            href="https://instagram.com/ediblemamipizza"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2 fs-5"
          >
            <i className="bi bi-instagram"></i>
          </a>
        </div>
        <div>
          <small>&copy; {new Date().getFullYear()} EdibleMami Pizza. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
