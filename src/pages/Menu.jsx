import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageHeader from '../components/PageHeader';

export default function Menu() {
  const [menu, setMenu] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/api/menu`);
      setMenu(res.data);
    };

    const fetchEvents = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/api/events`);
      setEvents(res.data);
    };

    fetchMenu();
    fetchEvents();
  }, []);

  const findEventTitles = (eventIds) => {
    return eventIds
      .map((id) => events.find((e) => e.id === id))
      .filter(Boolean)
      .map((e) => e.eventTitle);
  };

  if (!menu) return <div className="text-center py-5">Loading menu...</div>;

  return (
    <div className="menu-section">
  <div className="container">
    <PageHeader title="Revolving Menu" subtitle="Catch these themed creations at upcoming events!" />

    {menu.themes.map((theme) => (
      <div key={theme.id} className="mb-5">
        <div className="mb-3">
          <h3>{theme.title}</h3>
          <p>{theme.description}</p>
        </div>

        {theme.eventIds?.length > 0 && (
          <p className="text-muted small">
            Featured at: {findEventTitles(theme.eventIds).join(', ')}
          </p>
        )}

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {theme.items.map((item, idx) => (
            <div key={idx} className="col">
              <div className="card h-100 shadow-sm">
                {item.imageId && (
                  <img
                    src={`${import.meta.env.VITE_API_BASE}/api/images/${item.imageId}`}
                    className="card-img-top"
                    alt={item.name}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                </div>
                <div className="card-footer bg-transparent border-0">
                  <span className="price-tag">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}

    {menu.footerNote && (
      <div className="text-center mt-5 menu-footer">
        <small>{menu.footerNote}</small>
      </div>
    )}
  </div>
</div>

  );
}
