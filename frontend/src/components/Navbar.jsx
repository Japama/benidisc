import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/que-es-el-ultimate', label: 'Qué es el Ultimate' },
  { to: '/entrenamientos', label: 'Entrenamientos' },
  { to: '/eventos', label: 'Eventos' },
  { to: '/achievements', label: 'Palmarés' },
  { to: '/tournaments', label: 'Torneos' },
  { to: '/admin', label: 'Admin' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-primary-800/95 border-b border-primary-700/30 backdrop-blur-sm text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <Logo />
          <p className="text-xs uppercase tracking-[0.26em] text-primary-100">Ultimate Frisbee Club</p>
        </div>

        <button
          className="md:hidden rounded-2xl border border-primary-700/30 bg-primary-700/40 p-3 text-white transition hover:bg-primary-700/60"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <nav
          className={`absolute inset-x-4 top-full mt-3 rounded-3xl border border-primary-700/30 bg-primary-800 p-4 shadow-2xl shadow-primary-900/5 transition-all duration-200 md:static md:block md:max-w-none md:translate-y-0 md:bg-transparent md:border-0 md:p-0 ${
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
                        ? 'bg-accent-400 text-slate-900 shadow-md'
                        : 'text-white hover:text-accent-100 hover:bg-primary-700/40'
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
