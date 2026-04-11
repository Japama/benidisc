import React from 'react';

export default function WhatIsUltimate() {
  return (
    <main className="section-shell py-12">
      {/* HERO / INTRO */}
      <header className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">¿Qué es el Ultimate?</h1>
        <p className="mt-4 text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto">
          Un deporte trepidante, mixto y sin contacto que se juega con un disco volador. Exige la resistencia del fútbol, los
          pases precisos del baloncesto y el espíritu colectivo del mejor deporte de equipo — todo en una partida intensa y divertida.
        </p>
        <p className="mt-3 text-sm text-slate-500 italic">Auto‑arbitrado: los jugadores gestionan las reglas con respeto y deportividad.</p>
      </header>

      {/* SPIRIT OF THE GAME */}
      <section aria-labelledby="spirit" className="mt-10 max-w-4xl mx-auto">
        <div className="panel-card p-6 flex flex-col sm:flex-row items-start gap-6 bg-slate-50">
          <div className="flex-shrink-0">
            <svg className="w-12 h-12 text-slate-700" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2l3 6 6 .5-4.5 3 1.5 6L12 15l-6 3 1.5-6L3 8.5 9 8 12 2z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h2 id="spirit" className="text-2xl font-semibold text-slate-900">El Espíritu del Juego</h2>
            <p className="mt-2 text-slate-700">
              No hay árbitros en el corazón del Ultimate: las decisiones se toman entre jugadores. Se espera honestidad,
              diálogo y resolución respetuosa de desacuerdos — el llamado "Spirit of the Game" que hace este deporte único.
            </p>
            <p className="mt-3 text-sm text-slate-600">Responsabilidad, comunicación y deportividad por encima del resultado.</p>
          </div>
        </div>
      </section>

      {/* RULES GRID */}
      <section aria-labelledby="rules" className="mt-10 max-w-6xl mx-auto">
        <header className="flex items-center justify-between">
          <h3 id="rules" className="text-2xl font-semibold text-slate-900">Reglas básicas</h3>
          <p className="text-sm text-slate-600">Rápido de aprender, profundo de jugar.</p>
        </header>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <article className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex-none w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">El Terreno</h4>
                <p className="mt-1 text-sm text-slate-600">Campo rectangular con zonas de ensayo (endzones) en cada extremo.</p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex-none w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1" />
                  <path d="M4 20c2-3 6-5 8-5s6 2 8 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">El Juego</h4>
                <p className="mt-1 text-sm text-slate-600">Dos equipos; 7v7 en césped o 5v5 en playa/pista. Trabajo de equipo y movimiento constante.</p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex-none w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 2v6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <path d="M6 12h12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">El Movimiento</h4>
                <p className="mt-1 text-sm text-slate-600">No se puede correr con el disco. El poseedor tiene 10 segundos para pasarlo a un compañero.</p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex-none w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 12h18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <path d="M12 3v18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">La Puntuación</h4>
                <p className="mt-1 text-sm text-slate-600">Un punto se consigue al recibir el disco dentro de la endzone rival tras un pase válido.</p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex-none w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 6l6 6L20 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Cambio de Posesión</h4>
                <p className="mt-1 text-sm text-slate-600">Turnover si el disco toca el suelo, es interceptado o sale fuera: el equipo defensor toma el ataque.</p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex-none w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" />
                  <path d="M8 8l8 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Sin Contacto</h4>
                <p className="mt-1 text-sm text-slate-600">El contacto físico no está permitido. Pantallas y bloqueos son faltas; la seguridad es prioritaria.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <footer className="mt-10 max-w-4xl mx-auto text-center text-sm text-slate-600">
        <p>¿Te apetece probar? Únete a un entrenamiento y vive el espíritu: rápido, justo y muy divertido.</p>
      </footer>
    </main>
  );
}
