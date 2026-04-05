const achievements = [
  {
    id: 1,
    year: 2024,
    title: 'Campeones Nacionales',
    medal: 'Oro',
    description: 'Torneo de Clubes Nacionales, categoría masculina.',
    accent: 'from-amber-400 to-orange-500',
  },
  {
    id: 2,
    year: 2023,
    title: 'Subcampeones Regionales',
    medal: 'Plata',
    description: 'Final disputada a un punto en la última jugada.',
    accent: 'from-slate-400 to-slate-600',
  },
  {
    id: 3,
    year: 2022,
    title: 'Copa Fair Play',
    medal: 'Oro',
    description: 'Reconocimiento al espíritu deportivo y compañerismo.',
    accent: 'from-emerald-400 to-sky-500',
  },
];

function Achievements() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Palmarés</p>
        <h2 className="mt-3 text-4xl font-semibold text-white">Nuestra historia de éxitos</h2>
        <p className="mt-4 max-w-2xl text-slate-300">
          Benidisc acumula logros deportivos y reconocimientos a su compromiso con el Ultimate en cada temporada.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {achievements.map((achievement) => (
          <article key={achievement.id} className="group overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/95 shadow-2xl shadow-slate-950/30 transition hover:-translate-y-1 hover:shadow-cyan-500/20">
            <div className={`h-1 bg-gradient-to-r ${achievement.accent}`} />
            <div className="p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">{achievement.year}</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">{achievement.title}</h3>
              <p className="mt-3 text-slate-300">{achievement.description}</p>
              <span className="mt-6 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm text-slate-100 shadow-lg shadow-slate-950/20">
                {achievement.medal}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Achievements;
