import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE, buildImageSrc } from '../lib/api';

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_BASE}/tournaments`);
        if (mounted) setTournaments(res.data || []);
      } catch (err) {
        console.error('Failed to load tournaments', err);
        if (mounted) setError('No se pudieron cargar los torneos.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetch();
    return () => { mounted = false; };
  }, []);

  if (isLoading) return <section className="section-shell"><div>Cargando torneos...</div></section>;
  if (error) return <section className="section-shell"><div className="text-red-600">{error}</div></section>;

  const future = tournaments.filter((t) => !!t.isFuture);
  const past = tournaments.filter((t) => !t.isFuture);

  return (
    <section className="section-shell">
      <div className="section-heading">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Torneos</p>
        <h2 className="section-title">Resultados recientes y próximos desafíos</h2>
        <p className="section-copy">
          Revisa el historial de torneos de Benidisc y descubre nuestras próximas citas en el calendario.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          {past.map((tournament) => (
            <article key={tournament.id} className="panel-card overflow-hidden transition hover:-translate-y-1">
              {tournament.imageUrl && <img src={buildImageSrc(tournament.imageUrl)} alt={tournament.name} className="h-64 w-full object-cover" loading="lazy" onError={(ev) => { ev.currentTarget.style.display = 'none'; }} />}
              <div className="p-6">
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-700">
                  Pasado
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">{tournament.name}</h3>
                <p className="mt-2 text-slate-600">{tournament.location} · {tournament.date ? new Date(tournament.date).toLocaleDateString() : ''}</p>
                {tournament.result && <p className="mt-4 text-slate-700">Resultado: {tournament.result}</p>}
              </div>
            </article>
          ))}
        </div>

        <div className="space-y-5">
          <div className="panel-card p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Próximos eventos</p>
            <h3 className="mt-3 text-3xl font-semibold text-slate-950">La temporada arranca fuerte</h3>
            <p className="mt-4 text-slate-600">No te pierdas las competiciones más importantes, nuestra preparación y el espíritu del equipo en cada partido.</p>
          </div>

          {future.map((tournament) => (
            <article key={tournament.id} className="panel-card overflow-hidden transition hover:-translate-y-1">
              <div className="grid gap-4 sm:grid-cols-[1fr_1.4fr]">
                {tournament.imageUrl && <img src={buildImageSrc(tournament.imageUrl)} alt={tournament.name} className="h-40 w-full object-cover sm:h-full" loading="lazy" onError={(ev) => { ev.currentTarget.style.display = 'none'; }} />}
                <div className="p-6">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-700">
                    Próximo
                  </span>
                  <h4 className="mt-4 text-2xl font-semibold text-slate-950">{tournament.name}</h4>
                  <p className="mt-2 text-slate-600">{tournament.location}</p>
                  <p className="mt-4 text-slate-700">Fecha: {tournament.date ? new Date(tournament.date).toLocaleDateString() : ''}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tournaments;
