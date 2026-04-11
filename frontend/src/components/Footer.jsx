import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE, buildImageSrc } from '../lib/api';

function Footer() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchSponsors = async () => {
      try {
        const res = await axios.get(`${API_BASE}/sponsors`);
        if (mounted) setSponsors(res.data || []);
      } catch (err) {
        console.error('Failed to load sponsors', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchSponsors();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <footer className="border-t border-primary-100 bg-primary-50 py-14 text-slate-700">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-500">Patrocinadores</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {loading && <div className="text-sm text-slate-600">Cargando patrocinadores…</div>}
              {!loading && sponsors.length === 0 && <div className="text-sm text-slate-600">Sin patrocinadores por ahora.</div>}
              {!loading && sponsors.map((s) => (
                <a
                  key={s.id}
                  href={s.website || '#'}
                  target={s.website ? '_blank' : '_self'}
                  rel={s.website ? 'noreferrer' : undefined}
                  className="rounded-3xl bg-white px-4 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 shadow-sm shadow-slate-200 inline-flex items-center justify-center"
                >
                  {s.logoUrl ? (
                    <img src={buildImageSrc(s.logoUrl)} alt={s.name} className="h-8 object-contain" loading="lazy" onError={(ev) => { ev.currentTarget.style.display = 'none'; }} />
                  ) : (
                    s.name
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-500">Redes sociales</p>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.instagram.com/benidisc_ultimate_frisbee" target="_blank" rel="noreferrer" className="rounded-3xl bg-gradient-to-br from-accent-400 via-primary-400 to-primary-600 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-accent-500/20 hover:from-accent-300 hover:via-primary-300 hover:to-primary-500">
                Instagram
              </a>
              <a href="#" className="rounded-3xl bg-gradient-to-br from-violet-400 via-fuchsia-500 to-rose-500 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-fuchsia-500/20 hover:from-violet-300 hover:via-fuchsia-400 hover:to-rose-400">
                Facebook
              </a>
              <a href="#" className="rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:via-orange-400 hover:to-rose-400">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
