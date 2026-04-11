import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE, buildImageSrc } from '../lib/api';

function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_BASE}/events`);
        if (mounted) setEvents(res.data || []);
      } catch (err) {
        console.error('Failed to load events', err);
        if (mounted) setError('No se pudieron cargar los eventos.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetchEvents();
    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) return <div className="section-shell">Cargando eventos...</div>;
  if (error) return <div className="section-shell text-red-600">{error}</div>;

  return (
    <section className="section-shell py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-slate-900">Eventos</h1>
        {events.length === 0 && <div className="text-slate-600">No hay eventos disponibles.</div>}
        <div className="grid gap-6">
          {events.map((e) => (
            <article key={e.id} className="panel-card p-6">
              <div className="flex gap-6 items-start">
                {e.imageUrl && (
                  <img
                    src={buildImageSrc(e.imageUrl)}
                    alt={e.title}
                    className="w-32 h-24 object-cover rounded-lg"
                    loading="lazy"
                    onError={(ev) => { ev.currentTarget.style.display = 'none'; }}
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{e.title}</h2>
                  <p className="text-sm text-slate-600">{e.date ? new Date(e.date).toLocaleString() : ''}</p>
                  <p className="mt-2 text-slate-700">{e.location}</p>
                  {e.description && <p className="mt-2 text-slate-600">{e.description}</p>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;
