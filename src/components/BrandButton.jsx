import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandButton({ text, to, onClick, type = 'button' }) {
  const className = 'btn btn-brand-yellow w-100 d-inline-flex align-items-center justify-content-center gap-2';

  return to ? (
    <Link to={to} className={className}>
      {text}
      <i className="bi bi-arrow-right"></i>
    </Link>
  ) : (
    <button type={type} onClick={onClick} className={className}>
      {text}
      <i className="bi bi-arrow-right"></i>
    </button>
  );
}
