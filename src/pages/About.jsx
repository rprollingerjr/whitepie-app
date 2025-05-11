import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageHeader from '../components/PageHeader';

export default function About() {
    const [about, setAbout] = useState(null);
  
    useEffect(() => {
      const fetchAbout = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_BASE}/api/about`);
          setAbout(res.data);
        } catch (err) {
          console.error('Failed to fetch about page', err);
        }
      };
  
      fetchAbout();
    }, []);
  
    if (!about) return <div className="text-center py-5">Loading...</div>;
  
    return (
      <div className="about-section">
        <div className="container">
          <PageHeader
            title={about.title}
            subtitle={about.subtitle}
          />
  
          {/* Hero Section */}
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <img
                src={`${import.meta.env.VITE_API_BASE}/api/images/${about.heroImageId}`}
                className="img-fluid hero-img"
                alt="Hero"
              />
            </div>
            <div className="col-md-6">
              <p className="bio-text">{about.bio}</p>
            </div>
          </div>
  
          {/* Portfolio Sections */}
          <div className="row text-center gy-4">
            {about.sections.map((section, index) => (
              <div key={index} className="col-md-4">
                <div className="card shadow h-100">
                  {section.imageId && (
                    <img
                      src={`${import.meta.env.VITE_API_BASE}/api/images/${section.imageId}`}
                      className="card-img-top"
                      alt={section.title}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{section.title}</h5>
                    <p className="card-text">{section.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
