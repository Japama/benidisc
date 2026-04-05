import { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

function Admin() {
  const [token, setToken] = useState(localStorage.getItem('benidisc_token') || '');
  const [message, setMessage] = useState('');
  const [loginData, setLoginData] = useState({ email: 'admin@benidisc.com', password: '' });
  const [tournamentForm, setTournamentForm] = useState({ name: '', description: '', date: '', location: '', result: '', isFuture: false, image: null });
  const [achievementForm, setAchievementForm] = useState({ title: '', description: '', year: '', medal: '', image: null });
  const [sponsorForm, setSponsorForm] = useState({ name: '', website: '', order: '0', image: null });
  const [newsForm, setNewsForm] = useState({ title: '', description: '', image: null });

  const saveToken = (tokenValue) => {
    localStorage.setItem('benidisc_token', tokenValue);
    setToken(tokenValue);
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/auth/login`, loginData);
      saveToken(response.data.token);
      setMessage('Autenticación exitosa. Ahora puedes gestionar contenidos.');
    } catch (error) {
      setMessage('Error de autenticación. Revisa tus credenciales.');
    }
  };

  const handleSubmit = async (event, endpoint, formData, resetForm) => {
    event.preventDefault();
    if (!token) return setMessage('Debe iniciar sesión primero.');

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          payload.append(key, value);
        }
      });

      const response = await axios.post(`${API_BASE}/${endpoint}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(`${endpoint} creado con éxito: ${response.data.name || response.data.title}`);
      resetForm();
    } catch (error) {
      setMessage('Error al crear el recurso. Verifica los datos y vuelve a intentar.');
    }
  };

  const logout = () => {
    localStorage.removeItem('benidisc_token');
    setToken('');
    setMessage('Sesión cerrada.');
  };

  return (
    <section className="section-shell">
      <div className="mb-10 panel-card p-8">
        <h1 className="text-4xl font-semibold text-slate-950">Panel de administración</h1>
        <p className="mt-3 text-slate-600">Gestiona torneos, palmarés, patrocinadores y novedades con cargado de imágenes al backend.</p>
      </div>

      <div className="space-y-10">
        {!token ? (
          <div className="panel-card p-8">
            <h2 className="text-2xl font-semibold text-slate-950">Iniciar sesión</h2>
            <form onSubmit={login} className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(event) => setLoginData({ ...loginData, email: event.target.value })}
                  className="form-field mt-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Contraseña</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(event) => setLoginData({ ...loginData, password: event.target.value })}
                  className="form-field mt-3"
                />
              </div>
              <button className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Iniciar sesión
              </button>
            </form>
          </div>
        ) : (
          <div className="panel-card p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">Administrador conectado</h2>
                <p className="mt-2 text-slate-600">Puedes añadir nuevos registros y subir imágenes directamente.</p>
              </div>
              <button onClick={logout} className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Cerrar sesión
              </button>
            </div>
          </div>
        )}

        {message && <div className="rounded-3xl border border-slate-800 bg-slate-900/80 px-6 py-4 text-slate-200">{message}</div>}

        {token && (
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <form
              onSubmit={(event) =>
                handleSubmit(event, 'tournaments', {
                  name: tournamentForm.name,
                  description: tournamentForm.description,
                  date: tournamentForm.date,
                  location: tournamentForm.location,
                  result: tournamentForm.result,
                  isFuture: tournamentForm.isFuture,
                  image: tournamentForm.image,
                }, () => setTournamentForm({ name: '', description: '', date: '', location: '', result: '', isFuture: false, image: null }))
              }
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40"
            >
              <h3 className="mb-4 text-xl font-semibold text-slate-950">Nuevo torneo</h3>
              <div className="space-y-4">
                <input type="text" required placeholder="Nombre" value={tournamentForm.name} onChange={(event) => setTournamentForm({ ...tournamentForm, name: event.target.value })} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-cyan-400" />
                <input type="date" required value={tournamentForm.date} onChange={(event) => setTournamentForm({ ...tournamentForm, date: event.target.value })} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-cyan-400" />
                <input type="text" required placeholder="Ubicación" value={tournamentForm.location} onChange={(event) => setTournamentForm({ ...tournamentForm, location: event.target.value })} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-cyan-400" />
                <input type="text" placeholder="Resultado" value={tournamentForm.result} onChange={(event) => setTournamentForm({ ...tournamentForm, result: event.target.value })} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-cyan-400" />
                <textarea placeholder="Descripción" value={tournamentForm.description} onChange={(event) => setTournamentForm({ ...tournamentForm, description: event.target.value })} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-cyan-400" rows="3" />
                <label className="flex items-center gap-3 text-sm text-slate-700">
                  <input type="checkbox" checked={tournamentForm.isFuture} onChange={(event) => setTournamentForm({ ...tournamentForm, isFuture: event.target.checked })} className="h-4 w-4 rounded border-slate-300 bg-white text-cyan-500 focus:ring-cyan-500" />
                  Evento futuro
                </label>
                <input type="file" accept="image/*" onChange={(event) => setTournamentForm({ ...tournamentForm, image: event.target.files?.[0] || null })} className="w-full text-slate-700" />
                <button type="submit" className="w-full rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400">
                  Guardar torneo
                </button>
              </div>
            </form>

            <form
              onSubmit={(event) =>
                handleSubmit(event, 'achievements', {
                  title: achievementForm.title,
                  description: achievementForm.description,
                  year: achievementForm.year,
                  medal: achievementForm.medal,
                  image: achievementForm.image,
                }, () => setAchievementForm({ title: '', description: '', year: '', medal: '', image: null }))
              }
              className="panel-card p-6"
            >
              <h3 className="mb-4 text-xl font-semibold text-slate-950">Nuevo palmarés</h3>
              <div className="space-y-4">
                <input type="text" required placeholder="Título" value={achievementForm.title} onChange={(event) => setAchievementForm({ ...achievementForm, title: event.target.value })} className="form-field" />
                <input type="number" required placeholder="Año" value={achievementForm.year} onChange={(event) => setAchievementForm({ ...achievementForm, year: event.target.value })} className="form-field" />
                <input type="text" placeholder="Medalla" value={achievementForm.medal} onChange={(event) => setAchievementForm({ ...achievementForm, medal: event.target.value })} className="form-field" />
                <textarea placeholder="Descripción" value={achievementForm.description} onChange={(event) => setAchievementForm({ ...achievementForm, description: event.target.value })} className="form-field" rows="3" />
                <input type="file" accept="image/*" onChange={(event) => setAchievementForm({ ...achievementForm, image: event.target.files?.[0] || null })} className="w-full text-slate-700" />
                <button type="submit" className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Guardar logro
                </button>
              </div>
            </form>

            <form
              onSubmit={(event) =>
                handleSubmit(event, 'sponsors', {
                  name: sponsorForm.name,
                  website: sponsorForm.website,
                  order: sponsorForm.order,
                  image: sponsorForm.image,
                }, () => setSponsorForm({ name: '', website: '', order: '0', image: null }))
              }
              className="panel-card p-6"
            >
              <h3 className="mb-4 text-xl font-semibold text-slate-950">Nuevo patrocinador</h3>
              <div className="space-y-4">
                <input type="text" required placeholder="Nombre" value={sponsorForm.name} onChange={(event) => setSponsorForm({ ...sponsorForm, name: event.target.value })} className="form-field" />
                <input type="url" placeholder="Web" value={sponsorForm.website} onChange={(event) => setSponsorForm({ ...sponsorForm, website: event.target.value })} className="form-field" />
                <input type="number" min="0" placeholder="Orden" value={sponsorForm.order} onChange={(event) => setSponsorForm({ ...sponsorForm, order: event.target.value })} className="form-field" />
                <input type="file" accept="image/*" onChange={(event) => setSponsorForm({ ...sponsorForm, image: event.target.files?.[0] || null })} className="w-full text-slate-700" />
                <button type="submit" className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Guardar patrocinador
                </button>
              </div>
            </form>

            <form
              onSubmit={(event) =>
                handleSubmit(event, 'news', {
                  title: newsForm.title,
                  description: newsForm.description,
                  image: newsForm.image,
                }, () => setNewsForm({ title: '', description: '', image: null }))
              }
              className="panel-card p-6"
            >
              <h3 className="mb-4 text-xl font-semibold text-slate-950">Nueva novedad</h3>
              <div className="space-y-4">
                <input type="text" required placeholder="Título" value={newsForm.title} onChange={(event) => setNewsForm({ ...newsForm, title: event.target.value })} className="form-field" />
                <textarea required placeholder="Descripción" value={newsForm.description} onChange={(event) => setNewsForm({ ...newsForm, description: event.target.value })} className="form-field" rows="4" />
                <input type="file" accept="image/*" onChange={(event) => setNewsForm({ ...newsForm, image: event.target.files?.[0] || null })} className="w-full text-slate-700" />
                <button type="submit" className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Guardar novedad
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default Admin;
