import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../lib/api';

function Trainings() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_BASE}/trainings`);
        if (mounted) setItems(res.data);
      } catch (err) {
        if (mounted) setError('No se pudieron cargar los horarios.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetch();
    return () => (mounted = false);
  }, []);

  if (isLoading) return <div className="section-shell">Cargando entrenamientos...</div>;
  if (error) return <div className="section-shell text-red-600">{error}</div>;

  return (
    <section className="section-shell py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-slate-900 mb-4">Entrenamientos</h1>
        {items.length === 0 && <div className="text-slate-600">No hay horarios disponibles.</div>}
        <div className="space-y-4">
          {items.map((it) => (
            <div key={it.id} className="panel-card p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-medium text-slate-900">{it.dayOfWeek} • {it.startTime} - {it.endTime}</div>
                  <div className="text-sm text-slate-600">{it.location}</div>
                  {it.requirements && <div className="text-sm text-slate-600 mt-1">Requisitos: {it.requirements}</div>}
                </div>
                {it.mapUrl && (
                  <a className="text-cyan-600 text-sm" href={it.mapUrl} target="_blank" rel="noreferrer">Ver mapa</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Trainings;
