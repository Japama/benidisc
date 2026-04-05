function Home() {
  return (
    <section className="relative overflow-hidden px-5 py-16 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(248,113,113,0.12),_transparent_25%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-sky-500/15 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-sky-200 shadow-lg shadow-sky-500/10">
              <span className="inline-flex h-3 w-3 rounded-full bg-cyan-400" />
              Ultimate Club
            </div>
            <div>
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Benidisc
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                El club de Ultimate Frisbee que combina espíritu competitivo, compañerismo y un estilo fresco de juego en la costa Mediterránea.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-cyan-500/10 bg-slate-900/80 p-6 shadow-xl shadow-cyan-500/10">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Valores</p>
                <p className="mt-3 text-xl font-semibold text-white">Unión, respeto y energía</p>
              </div>
              <div className="rounded-3xl border border-rose-500/10 bg-slate-900/80 p-6 shadow-xl shadow-rose-500/10">
                <p className="text-sm uppercase tracking-[0.2em] text-rose-300">Misión</p>
                <p className="mt-3 text-xl font-semibold text-white">Crear un equipo referente en competencia y comunidad.</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-slate-800 bg-slate-950/95 p-1 shadow-2xl shadow-slate-950/40">
            <div className="overflow-hidden rounded-[1.75rem] bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1516280030429-cef7c2f5633d?auto=format&fit=crop&w=1000&q=80"
                alt="Ultimate frisbee action"
                className="h-full min-h-[420px] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-6 py-6 text-slate-100">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Frisbee</p>
                <h2 className="mt-3 text-3xl font-semibold">Velocidad, precisión y espíritu deportivo</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-7 shadow-2xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Equipo</p>
            <p className="mt-4 text-3xl font-semibold text-white">+35 atletas</p>
            <p className="mt-3 text-slate-300">Jugadores dedicados de todas las edades que entrenan con pasión y disciplina.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-7 shadow-2xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Eventos</p>
            <p className="mt-4 text-3xl font-semibold text-white">Torneos nacionales</p>
            <p className="mt-3 text-slate-300">Participamos en torneos top del circuito y eventos de exhibición cada temporada.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-7 shadow-2xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.3em] text-rose-300">Comunidad</p>
            <p className="mt-4 text-3xl font-semibold text-white">Impacto local</p>
            <p className="mt-3 text-slate-300">Fomentamos el deporte saludable con actividades abiertas y colaboraciones locales.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
