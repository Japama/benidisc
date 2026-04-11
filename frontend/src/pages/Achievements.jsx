import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE, buildImageSrc } from '../lib/api';

function getAccent(achievement, idx) {
  const medal = (achievement?.medal || '').toString().toLowerCase();
  if (medal.includes('oro') || medal.includes('gold')) return 'from-accent-300 to-accent-500';
  if (medal.includes('plata') || medal.includes('silver')) return 'from-slate-400 to-slate-600';
  const variants = ['from-primary-300 to-primary-500', 'from-primary-400 to-primary-600', 'from-primary-200 to-primary-500'];
  return variants[idx % variants.length];
}

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchAchievements = async () => {
      try {
        const res = await axios.get(`${API_BASE}/achievements`);
        if (mounted) setAchievements(res.data || []);
      } catch (err) {
        console.error('Failed to load achievements', err);
        if (mounted) setError('No se pudieron cargar los logros.');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchAchievements();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="section-shell">
      <div className="section-heading">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Palmarés</p>
        <h2 className="section-title">Nuestra historia de éxitos</h2>
        <p className="section-copy">
          Benidisc acumula logros deportivos y reconocimientos a su compromiso con el Ultimate en cada temporada.
        </p>
      </div>

      {loading ? (
        <div className="text-slate-600">Cargando logros…</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {achievements.map((achievement, idx) => (
            <article key={achievement.id} className="panel-card overflow-hidden transition hover:-translate-y-1">
              <div className={`h-1 bg-gradient-to-r ${getAccent(achievement, idx)}`} />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-20 w-20 rounded-lg overflow-hidden relative bg-primary-200">
                      <div className="absolute inset-0 flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.92), rgba(245,158,11,0.9))' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                          <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.18)" />
                          <path d="M7 12a5 5 0 0110 0" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {achievement.imageUrl && (
                        <img
                          src={buildImageSrc(achievement.imageUrl)}
                          alt={achievement.title}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{achievement.year}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-950 truncate">{achievement.title}</h3>
                    <p className="mt-2 text-slate-600 text-sm">{achievement.description}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-900 shadow-sm shadow-slate-200">
                    {achievement.medal}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Achievements;
