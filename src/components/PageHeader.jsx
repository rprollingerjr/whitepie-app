import React from 'react';

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="page-header-wrapper mb-4">
      <h1 className="page-header">{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </div>
  );
}
