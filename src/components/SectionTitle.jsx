// src/components/SectionTitle.jsx
import React from 'react';

export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="section-header">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
