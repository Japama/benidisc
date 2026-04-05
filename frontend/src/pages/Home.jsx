import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${API_BASE}/news`);
        setNews(response.data);
      } catch (error) {
        console.error('Error cargando novedades:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="relative overflow-hidden px-5 py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(251,146,60,0.11),_transparent_22%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-cyan-100/90 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700 shadow-lg shadow-cyan-200/40">
              <span className="inline-flex h-3 w-3 rounded-full bg-cyan-500" />
              Ultimate Club
            </div>
            <div>
              <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                Benidisc Ultimate Frisbee 
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
                El club de Ultimate Frisbee que combina espíritu competitivo, compañerismo y un estilo fresco de juego en la costa Mediterránea.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="feature-card p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-600">Valores</p>
                <p className="mt-3 text-xl font-semibold text-slate-950">Unión, respeto y energía</p>
              </div>
              <div className="feature-card p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-600">Misión</p>
                <p className="mt-3 text-xl font-semibold text-slate-950">Crear un equipo referente en competencia y comunidad.</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-slate-200 bg-white p-1 shadow-2xl shadow-slate-300/40">
            <div className="overflow-hidden rounded-[1.75rem] bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1585953074857-19f89c2ed52f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Ultimate frisbee action"
                className="h-full min-h-[420px] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-6 py-6 text-slate-100">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Frisbee</p>
                <h2 className="mt-3 text-3xl font-semibold">Velocidad, precisión y espíritu deportivo</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/50">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">Novedades</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">Últimas noticias del club</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">Descubre los anuncios más recientes, entrenamientos destacados y actividades del equipo.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {news.length === 0 ? (
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-600 shadow-sm">
                No hay novedades disponibles aún. Súbelas desde el panel de administración.
              </div>
            ) : (
              news.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="h-48 w-full object-cover" />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-cyan-100 text-cyan-700">Sin imagen</div>
                  )}
                  <div className="p-6">
                    <p className="text-sm uppercase tracking-[0.24em] text-cyan-600">Novedad</p>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">Equipo</p>
            <p className="mt-4 text-3xl font-semibold text-slate-950">+35 atletas</p>
            <p className="mt-3 text-slate-600">Jugadores dedicados de todas las edades que entrenan con pasión y disciplina.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Eventos</p>
            <p className="mt-4 text-3xl font-semibold text-slate-950">Torneos nacionales</p>
            <p className="mt-3 text-slate-600">Participamos en torneos top del circuito y eventos de exhibición cada temporada.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60">
            <p className="text-sm uppercase tracking-[0.3em] text-rose-600">Comunidad</p>
            <p className="mt-4 text-3xl font-semibold text-slate-950">Impacto local</p>
            <p className="mt-3 text-slate-600">Fomentamos el deporte saludable con actividades abiertas y colaboraciones locales.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
