const pastTournaments = [
  {
    id: 1,
    name: 'Copa Mediterránea',
    date: '2024-03-12',
    location: 'Alicante',
    result: 'Campeones',
    image: 'https://images.unsplash.com/photo-1585953074472-169dd16e1590?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Open de Valencia',
    date: '2023-11-25',
    location: 'Valencia',
    result: 'Semifinalistas',
    image: 'https://images.unsplash.com/photo-1585953074472-169dd16e1590?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const futureTournaments = [
  {
    id: 3,
    name: 'Torneo Costa Blanca',
    date: '2025-05-18',
    location: 'Benidorm',
    image: 'https://images.unsplash.com/photo-1585953074472-169dd16e1590?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: 'Ultimate Summer Fest',
    date: '2025-07-05',
    location: 'Murcia',
    image: 'https://images.unsplash.com/photo-1585953074472-169dd16e1590?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

function Tournaments() {
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
          {pastTournaments.map((tournament) => (
            <article key={tournament.id} className="panel-card overflow-hidden transition hover:-translate-y-1">
              <img src={tournament.image} alt={tournament.name} className="h-64 w-full object-cover" />
              <div className="p-6">
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-700">
                  Pasado
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">{tournament.name}</h3>
                <p className="mt-2 text-slate-600">{tournament.location} · {tournament.date}</p>
                <p className="mt-4 text-slate-700">Resultado: {tournament.result}</p>
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

          {futureTournaments.map((tournament) => (
            <article key={tournament.id} className="panel-card overflow-hidden transition hover:-translate-y-1">
              <div className="grid gap-4 sm:grid-cols-[1fr_1.4fr]">
                <img src={tournament.image} alt={tournament.name} className="h-40 w-full object-cover sm:h-full" />
                <div className="p-6">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-700">
                    Próximo
                  </span>
                  <h4 className="mt-4 text-2xl font-semibold text-slate-950">{tournament.name}</h4>
                  <p className="mt-2 text-slate-600">{tournament.location}</p>
                  <p className="mt-4 text-slate-700">Fecha: {tournament.date}</p>
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
