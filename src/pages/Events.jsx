import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageHeader from '../components/PageHeader';
import EventCard from '../components/EventCard';
import BrandButton from '../components/BrandButton';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/api/events`);
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to load events:', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="events_area">
      <div className="container">
      <PageHeader
          title="Upcoming Events"
          subtitle="Follow the stand – we're popping up all over Phoenix!"
        />
        <div className="row">
        {events.map(event => (
            <EventCard
              key={event.id}
              imageUrl={
                event.imageId
                  ? `${import.meta.env.VITE_API_BASE}/api/images/${event.imageId}`
                  : '/pizza.png'
              }
              eventTitle={event.eventTitle}
              day={event.eventTimeInfo.dayOfTheMonth}
              month={event.eventTimeInfo.abbreviatedMonth}
              startTime={event.eventTimeInfo.startTime}
              endTime={event.eventTimeInfo.endTime}
              location={`${event.city}, ${event.state}`}
              description={event.description}
              ticketUrl={event.ticketUrl}
            />
          ))}
        </div>
        <div className="row mt-4 justify-content-center">
          <div className="col-md-4">
            <BrandButton text="Book Now" to="/book" />
          </div>
        </div>
      </div>
    </section>
  );
}

