import React from 'react';

export default function EventCard({
  imageUrl,
  eventTitle,
  day,
  month,
  startTime,
  endTime,
  location,
  description,
  ticketUrl
}) {
  return (
    <div className="col-lg-6 col-md-6">
      <div className="card mb-4 shadow-sm border-0 bg-dark text-light">
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center">
            <img
              src={imageUrl}
              alt="Event"
              className="img-fluid rounded-start border-end border-warning"
              style={{ maxHeight: '100%', objectFit: 'cover' }}
            />
          </div>

          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title text-white mb-2">{eventTitle}</h5>

              <p className="text-warning mb-1">
                {day} <small className="text-uppercase">{month}</small>
              </p>

              <p className="card-text mb-2">
                <i className="bi bi-clock me-2"></i>
                {startTime} – {endTime}
              </p>

              <p className="card-text mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                {location}
              </p>

              <p className="card-text text-light small">{description}</p>

              {ticketUrl ? (
                <a
                  href={ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-brand-yellow btn-sm"
                >
                  View Details
                </a>
              ) : (
                <span className="badge bg-secondary">No Entry Fee</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
