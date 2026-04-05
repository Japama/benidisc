import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/achievements', label: 'Palmarés' },
  { to: '/tournaments', label: 'Torneos' },
  { to: '/admin', label: 'Admin' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 shadow-lg shadow-slate-950/20 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <div>
          <NavLink to="/" className="text-xl font-semibold tracking-tight text-white">
            <span className="text-cyan-400">Beni</span>disc
          </NavLink>
          <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Ultimate Frisbee Club</p>
        </div>

        <button
          className="md:hidden rounded-2xl border border-slate-700 bg-slate-900/70 p-3 text-slate-100 transition hover:border-cyan-400 hover:text-cyan-200"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <nav
          className={`absolute inset-x-4 top-full mt-3 rounded-3xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl shadow-slate-950/30 transition-all duration-200 md:static md:block md:max-w-none md:translate-y-0 md:bg-transparent md:border-0 md:p-0 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="space-y-3 text-center md:flex md:items-center md:gap-6 md:space-y-0">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `inline-block rounded-2xl px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-100 shadow-inner shadow-cyan-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
