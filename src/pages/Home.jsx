import React, { useEffect, useState } from 'react';
import heroImg from '../assets/handtoss.jpg';
import logoImg from '../assets/em-horizontal.png';
import { fetchEvents, fetchMoments } from '../services/api';
import MomentCard from '../components/MomentCard';
import EventCard from '../components/EventCard';
import BrandButton from '../components/BrandButton';
import SectionTitle from '../components/SectionTitle';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [moments, setMoments] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [eventsData, momentsData] = await Promise.all([
          fetchEvents(),
          fetchMoments()
        ]);

        const sortedEvents = eventsData
          .filter(e => e.startTime)
          .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
          .slice(0, 2);

        setEvents(sortedEvents);
        setMoments(Array.isArray(momentsData.moments) ? momentsData.moments : momentsData);
      } catch (err) {
        console.error('Failed to fetch homepage data:', err);
      }
    };

    loadData();
  }, []);

  return (
    <div className="home-page">
      {/* Page Title */}
      <section className="py-5 text-center" data-aos="fade">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <img src={logoImg} className="img-fluid" alt="WhitePie Logo" />
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero d-flex flex-column justify-content-center align-items-center py-5" data-aos="fade" data-aos-delay="1500">
        <img src={heroImg} className="img-thumbnail w-50" alt="Hand Tossed Dough" />
      </section>

      {/* Events Section */}
      <section className="events_area py-5">
        <div className="container">
          <SectionTitle
            title="Find EdibleMami"
          />
          <div className="row justify-content-center">
            {events.map((event) => (
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
              <BrandButton text="View All Events" to="/events" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery py-5">
        <div className="container">
          <SectionTitle
            title="Recent Moments"
          />

          <div className="row gy-4 justify-content-center">
            {moments.slice(0, 8).map((moment) => (
              <div key={moment.id} className="col-xl-3 col-lg-4 col-md-6">
                <MomentCard imageId={moment.imageId} title={moment.title} />
              </div>
            ))}
          </div>

          <div className="row mt-4 justify-content-center">
            <div className="col-md-4">
              <BrandButton text="View Full Gallery" to="/gallery" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
