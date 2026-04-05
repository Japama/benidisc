function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/95 py-14 text-slate-200">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Patrocinadores</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <span className="rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 px-4 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-100 shadow-lg shadow-cyan-500/10">
                CloudSpin
              </span>
              <span className="rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 px-4 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-100 shadow-lg shadow-rose-500/10">
                FrisbeePro
              </span>
              <span className="rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 px-4 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-100 shadow-lg shadow-emerald-500/10">
                EnergyFlow
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Redes sociales</p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="rounded-3xl bg-gradient-to-br from-cyan-500 to-sky-600 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-sky-500">
                Instagram
              </a>
              <a href="#" className="rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-fuchsia-500/20 hover:from-violet-400 hover:to-fuchsia-500">
                Facebook
              </a>
              <a href="#" className="rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400">
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
