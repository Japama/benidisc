const pastTournaments = [
  {
    id: 1,
    name: 'Copa Mediterránea',
    date: '2024-03-12',
    location: 'Alicante',
    result: 'Campeones',
    image: 'https://images.unsplash.com/photo-1592832209577-aa7db5f0b3c9?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    name: 'Open de Valencia',
    date: '2023-11-25',
    location: 'Valencia',
    result: 'Semifinalistas',
    image: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1000&q=80',
  },
];

const futureTournaments = [
  {
    id: 3,
    name: 'Torneo Costa Blanca',
    date: '2025-05-18',
    location: 'Benidorm',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 4,
    name: 'Ultimate Summer Fest',
    date: '2025-07-05',
    location: 'Murcia',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
  },
];

function Tournaments() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Torneos</p>
        <h2 className="mt-3 text-4xl font-semibold text-white">Resultados recientes y próximos desafíos</h2>
        <p className="mt-4 max-w-2xl text-slate-300">
          Revisa el historial de torneos de Benidisc y descubre nuestras próximas citas en el calendario.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          {pastTournaments.map((tournament) => (
            <article key={tournament.id} className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/90 shadow-2xl shadow-slate-950/30 transition hover:-translate-y-1 hover:border-cyan-400/30">
              <img src={tournament.image} alt={tournament.name} className="h-64 w-full object-cover" />
              <div className="p-6">
                <span className="inline-flex rounded-full bg-cyan-500/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
                  Pasado
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-white">{tournament.name}</h3>
                <p className="mt-2 text-slate-300">{tournament.location} · {tournament.date}</p>
                <p className="mt-4 text-slate-200">Resultado: {tournament.result}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="space-y-5">
          <div className="rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-900/95 via-cyan-950/90 to-emerald-950/95 p-8 shadow-2xl shadow-cyan-500/20">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Próximos eventos</p>
            <h3 className="mt-3 text-3xl font-semibold text-white">La temporada arranca fuerte</h3>
            <p className="mt-4 text-slate-300">No te pierdas las competiciones más importantes, nuestra preparación y el espíritu del equipo en cada partido.</p>
          </div>

          {futureTournaments.map((tournament) => (
            <article key={tournament.id} className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/90 shadow-2xl shadow-slate-950/30 transition hover:-translate-y-1 hover:border-rose-400/30">
              <div className="grid gap-4 sm:grid-cols-[1fr_1.4fr]">
                <img src={tournament.image} alt={tournament.name} className="h-40 w-full object-cover sm:h-full" />
                <div className="p-6">
                  <span className="inline-flex rounded-full bg-rose-500/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-rose-200">
                    Próximo
                  </span>
                  <h4 className="mt-4 text-2xl font-semibold text-white">{tournament.name}</h4>
                  <p className="mt-2 text-slate-300">{tournament.location}</p>
                  <p className="mt-4 text-slate-200">Fecha: {tournament.date}</p>
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
