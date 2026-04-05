function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-14 text-slate-700">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">Patrocinadores</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <span className="rounded-3xl bg-white px-4 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 shadow-sm shadow-slate-200">
                CloudSpin
              </span>
              <span className="rounded-3xl bg-white px-4 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 shadow-sm shadow-slate-200">
                FrisbeePro
              </span>
              <span className="rounded-3xl bg-white px-4 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 shadow-sm shadow-slate-200">
                EnergyFlow
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">Redes sociales</p>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.instagram.com/benidisc_ultimate_frisbee" target="_blank" rel="noreferrer" className="rounded-3xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-500 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-300 hover:via-sky-400 hover:to-indigo-400">
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
