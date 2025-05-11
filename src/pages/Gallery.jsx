import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import MomentCard from '../components/MomentCard';
import PageHeader from '../components/PageHeader';

export default function Gallery() {
  const [moments, setMoments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const seenIds = useRef(new Set()); // ✅ Track unique IDs globally

  const loadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/api/moments`, {
        params: { page, pageSize: 16 },
      });

      const newMoments = res.data.moments.filter((m) => {
        const id = m.id || m._id;
        if (!seenIds.current.has(id)) {
          seenIds.current.add(id);
          return true;
        }
        return false;
      });

      setMoments((prev) => [...prev, ...newMoments]);
      setTotalCount(res.data.totalCount);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error('Failed to fetch moments:', err);
    } finally {
      setLoading(false);
    }
  }, [loading, page]);

  useEffect(() => {
    loadMore(); // initial load
  }, []); 

  const loaderRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && moments.length < totalCount) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, loadMore, moments.length, totalCount]
  );

  return (
    <div className="container py-5">
      <PageHeader title="Photo Gallery" subtitle="Crispy crusts, melted cheese, & flavorful memories" />

      <div className="row gy-4 justify-content-center">
        {moments.map((moment) => (
          <div key={moment.id || moment._id} className="col-xl-3 col-lg-4 col-md-6">
            <MomentCard imageId={moment.imageId} title={moment.title} />
          </div>
        ))}
      </div>

      <div ref={loaderRef} className="text-center mt-4">
        {loading && <div className="spinner-border text-warning" role="status"></div>}
        {!loading && moments.length >= totalCount && (
          <p className="text-muted mt-2">No more moments to load.</p>
        )}
      </div>
    </div>
  );
}
