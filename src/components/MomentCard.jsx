import React from 'react';

export default function MomentCard({ imageId, title }) {
  return (
    <div className="card bg-dark text-white h-100 border-0 shadow-sm">
      <img
        src={`${import.meta.env.VITE_API_BASE}/api/images/${imageId}`}
        alt={title}
        className="card-img-top"
        style={{
          height: '220px',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        loading="lazy"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/600x400?text=Image+Unavailable';
        }}
      />
      {title &&
      <div className="card-body">
        <h6 className="card-title text-warning text-center text-uppercase mb-0">{title}</h6>
      </div>
}
    </div>
  );
}
