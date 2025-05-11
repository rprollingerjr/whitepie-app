import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useToast } from '../hooks/useToast.jsx';
import PageHeader from '../components/PageHeader';

export default function Book() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        honeypot: ''
    });
    const [loading, setLoading] = useState(false);
    const { showToast, Toast } = useToast();
    const [showFollowUp, setShowFollowUp] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.honeypot) {
            showToast('⛔ Submission blocked as spam.');
            return;
        }

        if (!form.name || !form.email || !form.message) {
            showToast('⚠️ Please fill in all required fields.');
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE}/api/booking`, form);
            showToast('✅ Message sent! We’ll reach out soon.');
            setShowFollowUp(true);
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            setForm({ name: '', email: '', phone: '', message: '', honeypot: '' });
        } catch (err) {
            console.error(err);
            showToast('❌ Failed to send. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="book-section">
            <div className="container">
                <PageHeader
                    title="Contact"
                    subtitle="Use the form below to request a booking or ask a question!"
                />

                <div className="form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="honeypot"
                            value={form.honeypot}
                            onChange={handleChange}
                            autoComplete="off"
                            style={{ display: 'none' }}
                        />

                        <div className="mb-3">
                            <label className="form-label">Your Name *</label>
                            <input
                                className="form-control"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Your Email *</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone (optional)</label>
                            <input
                                className="form-control"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Message *</label>
                            <textarea
                                className="form-control"
                                name="message"
                                rows="4"
                                value={form.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-brand-yellow w-100">
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>

                <Toast />

                {showFollowUp && (
                    <div className="text-center mt-4">
                        <p className="text-light">🎉 Thanks for reaching out!</p>
                        <Link to="/events" className="btn btn-brand-yellow d-inline-flex align-items-center gap-2">
                            📅 View Upcoming Events
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}
