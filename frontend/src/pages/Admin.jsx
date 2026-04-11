import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../lib/api';

function Admin() {
  const [token, setToken] = useState(localStorage.getItem('benidisc_token') || '');
  const [message, setMessage] = useState('');
  const [loginData, setLoginData] = useState({ email: 'admin@benidisc.com', password: '' });
  const [activeTab, setActiveTab] = useState('tournaments');

  // Lists
  const [tournaments, setTournaments] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [events, setEvents] = useState([]);
  const [trainings, setTrainings] = useState([]);

  const [loading, setLoading] = useState(false);

  // Editing IDs
  const [editingTournamentId, setEditingTournamentId] = useState(null);
  const [editingAchievementId, setEditingAchievementId] = useState(null);
  const [editingSponsorId, setEditingSponsorId] = useState(null);
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editingTrainingId, setEditingTrainingId] = useState(null);

  // Forms
  const [tournamentForm, setTournamentForm] = useState({ name: '', description: '', date: '', location: '', result: '', isFuture: false, image: null });
  const [achievementForm, setAchievementForm] = useState({ title: '', description: '', year: '', medal: '', image: null });
  const [sponsorForm, setSponsorForm] = useState({ name: '', website: '', order: '0', image: null });
  const [newsForm, setNewsForm] = useState({ title: '', description: '', image: null });
  const [eventForm, setEventForm] = useState({ title: '', description: '', date: '', location: '', image: null });
  const [trainingForm, setTrainingForm] = useState({ dayOfWeek: '', startTime: '', endTime: '', location: '', mapUrl: '', requirements: '' });

  const saveToken = (tokenValue) => {
    localStorage.setItem('benidisc_token', tokenValue);
    setToken(tokenValue);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error && error.response && error.response.status === 401) {
          setMessage('Sesión expirada. Por favor inicia sesión de nuevo.');
          localStorage.removeItem('benidisc_token');
          setToken('');
          delete axios.defaults.headers.common['Authorization'];
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [tRes, aRes, sRes, nRes, eRes, trRes] = await Promise.all([
        axios.get(`${API_BASE}/tournaments`),
        axios.get(`${API_BASE}/achievements`),
        axios.get(`${API_BASE}/sponsors`),
        axios.get(`${API_BASE}/news`),
        axios.get(`${API_BASE}/events`),
        axios.get(`${API_BASE}/trainings`),
      ]);

      setTournaments(tRes.data || []);
      setAchievements(aRes.data || []);
      setSponsors(sRes.data || []);
      setNewsList(nRes.data || []);
      setEvents(eRes.data || []);
      setTrainings(trRes.data || []);
    } catch (error) {
      console.error('Error loading admin lists', error);
      setMessage('Error cargando datos. Revisa la consola.');
    } finally {
      setLoading(false);
    }
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

  const toFormData = (obj) => {
    const fd = new FormData();
    Object.entries(obj).forEach(([k, v]) => {
      if (v === null || v === undefined) return;
      if (v instanceof File) fd.append(k, v);
      else fd.append(k, String(v));
    });
    return fd;
  };

  const addItemToState = (endpoint, item) => {
    switch (endpoint) {
      case 'tournaments':
        setTournaments((p) => [item, ...p]);
        break;
      case 'achievements':
        setAchievements((p) => [item, ...p]);
        break;
      case 'sponsors':
        setSponsors((p) => [item, ...p]);
        break;
      case 'news':
        setNewsList((p) => [item, ...p]);
        break;
      case 'events':
        setEvents((p) => [item, ...p]);
        break;
      case 'trainings':
        setTrainings((p) => [item, ...p]);
        break;
      default:
        break;
    }
  };

  const replaceItemInState = (endpoint, item) => {
    switch (endpoint) {
      case 'tournaments':
        setTournaments((p) => p.map((x) => (x.id === item.id ? item : x)));
        break;
      case 'achievements':
        setAchievements((p) => p.map((x) => (x.id === item.id ? item : x)));
        break;
      case 'sponsors':
        setSponsors((p) => p.map((x) => (x.id === item.id ? item : x)));
        break;
      case 'news':
        setNewsList((p) => p.map((x) => (x.id === item.id ? item : x)));
        break;
      case 'events':
        setEvents((p) => p.map((x) => (x.id === item.id ? item : x)));
        break;
      case 'trainings':
        setTrainings((p) => p.map((x) => (x.id === item.id ? item : x)));
        break;
      default:
        break;
    }
  };

  const removeItemFromState = (endpoint, id) => {
    switch (endpoint) {
      case 'tournaments':
        setTournaments((p) => p.filter((x) => x.id !== id));
        break;
      case 'achievements':
        setAchievements((p) => p.filter((x) => x.id !== id));
        break;
      case 'sponsors':
        setSponsors((p) => p.filter((x) => x.id !== id));
        break;
      case 'news':
        setNewsList((p) => p.filter((x) => x.id !== id));
        break;
      case 'events':
        setEvents((p) => p.filter((x) => x.id !== id));
        break;
      case 'trainings':
        setTrainings((p) => p.filter((x) => x.id !== id));
        break;
      default:
        break;
    }
  };

  const handleCreate = async (endpoint, form, resetForm) => {
    if (!token) return setMessage('Debe iniciar sesión primero.');
    try {
      let response;
      if (endpoint === 'trainings') {
        response = await axios.post(`${API_BASE}/${endpoint}`, form);
      } else {
        const fd = toFormData(form);
        response = await axios.post(`${API_BASE}/${endpoint}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      addItemToState(endpoint, response.data);
      setMessage('Creado correctamente.');
      resetForm();
    } catch (error) {
      console.error('Create error', error);
      setMessage('Error al crear el recurso.');
    }
  };

  const handleUpdate = async (endpoint, id, form, resetEditing) => {
    if (!token) return setMessage('Debe iniciar sesión primero.');
    try {
      let response;
      if (endpoint === 'trainings') {
        response = await axios.put(`${API_BASE}/${endpoint}/${id}`, form);
      } else {
        const fd = toFormData(form);
        response = await axios.put(`${API_BASE}/${endpoint}/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      replaceItemInState(endpoint, response.data);
      setMessage('Actualizado correctamente.');
      resetEditing();
    } catch (error) {
      console.error('Update error', error);
      setMessage('Error al actualizar el recurso.');
    }
  };

  const handleDelete = async (endpoint, id) => {
    if (!token) return setMessage('Debe iniciar sesión primero.');
    if (!window.confirm('¿Eliminar este elemento?')) return;
    try {
      await axios.delete(`${API_BASE}/${endpoint}/${id}`);
      removeItemFromState(endpoint, id);
      setMessage('Eliminado correctamente.');
    } catch (error) {
      console.error('Delete error', error);
      setMessage('Error al eliminar el recurso.');
    }
  };

  const startEdit = (endpoint, item) => {
    switch (endpoint) {
      case 'tournaments':
        setEditingTournamentId(item.id);
        setTournamentForm({
          name: item.name || '',
          description: item.description || '',
          date: item.date ? new Date(item.date).toISOString().slice(0, 10) : '',
          location: item.location || '',
          result: item.result || '',
          isFuture: !!item.isFuture,
          image: null,
        });
        break;
      case 'achievements':
        setEditingAchievementId(item.id);
        setAchievementForm({ title: item.title || '', description: item.description || '', year: item.year ? String(item.year) : '', medal: item.medal || '', image: null });
        break;
      case 'sponsors':
        setEditingSponsorId(item.id);
        setSponsorForm({ name: item.name || '', website: item.website || '', order: item.order ? String(item.order) : '0', image: null });
        break;
      case 'news':
        setEditingNewsId(item.id);
        setNewsForm({ title: item.title || '', description: item.description || '', image: null });
        break;
      case 'events':
        setEditingEventId(item.id);
        setEventForm({ title: item.title || '', description: item.description || '', date: item.date ? new Date(item.date).toISOString().slice(0, 10) : '', location: item.location || '', image: null });
        break;
      case 'trainings':
        setEditingTrainingId(item.id);
        setTrainingForm({ dayOfWeek: item.dayOfWeek || '', startTime: item.startTime || '', endTime: item.endTime || '', location: item.location || '', mapUrl: item.mapUrl || '', requirements: item.requirements || '' });
        break;
      default:
        break;
    }
  };

  const resetEditing = (endpoint) => {
    switch (endpoint) {
      case 'tournaments':
        setEditingTournamentId(null);
        setTournamentForm({ name: '', description: '', date: '', location: '', result: '', isFuture: false, image: null });
        break;
      case 'achievements':
        setEditingAchievementId(null);
        setAchievementForm({ title: '', description: '', year: '', medal: '', image: null });
        break;
      case 'sponsors':
        setEditingSponsorId(null);
        setSponsorForm({ name: '', website: '', order: '0', image: null });
        break;
      case 'news':
        setEditingNewsId(null);
        setNewsForm({ title: '', description: '', image: null });
        break;
      case 'events':
        setEditingEventId(null);
        setEventForm({ title: '', description: '', date: '', location: '', image: null });
        break;
      case 'trainings':
        setEditingTrainingId(null);
        setTrainingForm({ dayOfWeek: '', startTime: '', endTime: '', location: '', mapUrl: '', requirements: '' });
        break;
      default:
        break;
    }
  };

  const tabs = [
    { key: 'tournaments', label: 'Torneos' },
    { key: 'achievements', label: 'Palmarés' },
    { key: 'sponsors', label: 'Patrocinadores' },
    { key: 'news', label: 'Novedades' },
    { key: 'events', label: 'Eventos' },
    { key: 'trainings', label: 'Entrenamientos' },
  ];

  return (
    <section className="section-shell">
      <div className="mb-6 panel-card p-6">
        <h1 className="text-3xl font-semibold text-slate-900">Panel de administración</h1>
        <p className="mt-2 text-slate-600">Gestiona todos los recursos del sitio desde aquí.</p>
      </div>

      {!token ? (
        <div className="panel-card p-8 max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold text-slate-950">Iniciar sesión</h2>
          <form onSubmit={login} className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input type="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className="form-field mt-3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Contraseña</label>
              <input type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className="form-field mt-3" />
            </div>
            <button className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white">Iniciar sesión</button>
          </form>
          {message && <div className="mt-4 text-sm text-red-600">{message}</div>}
        </div>
      ) : (
        <div>
          <div className="panel-card p-4 mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Administrador conectado</h2>
              <p className="text-slate-600">Puedes crear, editar y eliminar recursos.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => { localStorage.removeItem('benidisc_token'); setToken(''); }} className="rounded-3xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Cerrar sesión</button>
            </div>
          </div>

          <div className="mb-6">
            <nav className="flex gap-2 overflow-x-auto">
              {tabs.map((t) => (
                <button key={t.key} onClick={() => setActiveTab(t.key)} className={`px-4 py-2 rounded-2xl ${activeTab === t.key ? 'bg-cyan-500 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
                  {t.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="panel-card p-6">
            {message && <div className="mb-4 rounded px-4 py-2 bg-slate-100 text-slate-800">{message}</div>}

            {loading && <div>Cargando...</div>}

            {!loading && activeTab === 'tournaments' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Torneos</h3>
                <div className="space-y-3 mb-4">
                  {tournaments.map((t) => (
                    <div key={t.id} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <div className="font-medium">{t.name}</div>
                        <div className="text-sm text-slate-600">{t.location} — {t.date ? new Date(t.date).toLocaleString() : ''}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit('tournaments', t)} className="text-sm px-3 py-1 rounded bg-yellow-100">Editar</button>
                        <button onClick={() => handleDelete('tournaments', t.id)} className="text-sm px-3 py-1 rounded bg-red-100">Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={(e) => { e.preventDefault(); if (editingTournamentId) handleUpdate('tournaments', editingTournamentId, tournamentForm, () => resetEditing('tournaments')); else handleCreate('tournaments', tournamentForm, () => resetEditing('tournaments')); }} className="space-y-3">
                  <input type="text" placeholder="Nombre" value={tournamentForm.name} onChange={(e) => setTournamentForm({ ...tournamentForm, name: e.target.value })} className="form-field" required />
                  <input type="date" value={tournamentForm.date} onChange={(e) => setTournamentForm({ ...tournamentForm, date: e.target.value })} className="form-field" required />
                  <input type="text" placeholder="Ubicación" value={tournamentForm.location} onChange={(e) => setTournamentForm({ ...tournamentForm, location: e.target.value })} className="form-field" required />
                  <input type="text" placeholder="Resultado" value={tournamentForm.result} onChange={(e) => setTournamentForm({ ...tournamentForm, result: e.target.value })} className="form-field" />
                  <textarea placeholder="Descripción" value={tournamentForm.description} onChange={(e) => setTournamentForm({ ...tournamentForm, description: e.target.value })} className="form-field" rows={3} />
                  <label className="flex items-center gap-3"><input type="checkbox" checked={tournamentForm.isFuture} onChange={(e) => setTournamentForm({ ...tournamentForm, isFuture: e.target.checked })} /> Evento futuro</label>
                  <input type="file" accept="image/*" onChange={(e) => setTournamentForm({ ...tournamentForm, image: e.target.files?.[0] || null })} />
                  <div className="flex gap-2">
                    <button type="submit" className="rounded-3xl bg-cyan-500 px-4 py-2 text-white">{editingTournamentId ? 'Actualizar torneo' : 'Crear torneo'}</button>
                    {editingTournamentId && <button type="button" onClick={() => resetEditing('tournaments')} className="rounded-3xl px-4 py-2 border">Cancelar</button>}
                  </div>
                </form>
              </div>
            )}

            {!loading && activeTab === 'achievements' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Palmarés</h3>
                <div className="space-y-3 mb-4">
                  {achievements.map((a) => (
                    <div key={a.id} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <div className="font-medium">{a.title} ({a.year})</div>
                        <div className="text-sm text-slate-600">{a.medal}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit('achievements', a)} className="text-sm px-3 py-1 rounded bg-yellow-100">Editar</button>
                        <button onClick={() => handleDelete('achievements', a.id)} className="text-sm px-3 py-1 rounded bg-red-100">Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={(e) => { e.preventDefault(); if (editingAchievementId) handleUpdate('achievements', editingAchievementId, achievementForm, () => resetEditing('achievements')); else handleCreate('achievements', achievementForm, () => resetEditing('achievements')); }} className="space-y-3">
                  <input type="text" placeholder="Título" value={achievementForm.title} onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })} className="form-field" required />
                  <input type="number" placeholder="Año" value={achievementForm.year} onChange={(e) => setAchievementForm({ ...achievementForm, year: e.target.value })} className="form-field" required />
                  <input type="text" placeholder="Medalla" value={achievementForm.medal} onChange={(e) => setAchievementForm({ ...achievementForm, medal: e.target.value })} className="form-field" />
                  <textarea placeholder="Descripción" value={achievementForm.description} onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })} className="form-field" rows={3} />
                  <input type="file" accept="image/*" onChange={(e) => setAchievementForm({ ...achievementForm, image: e.target.files?.[0] || null })} />
                  <div className="flex gap-2">
                    <button type="submit" className="rounded-3xl bg-cyan-500 px-4 py-2 text-white">{editingAchievementId ? 'Actualizar' : 'Crear'}</button>
                    {editingAchievementId && <button type="button" onClick={() => resetEditing('achievements')} className="rounded-3xl px-4 py-2 border">Cancelar</button>}
                  </div>
                </form>
              </div>
            )}

            {!loading && activeTab === 'sponsors' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Patrocinadores</h3>
                <div className="space-y-3 mb-4">
                  {sponsors.map((s) => (
                    <div key={s.id} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-sm text-slate-600">{s.website}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit('sponsors', s)} className="text-sm px-3 py-1 rounded bg-yellow-100">Editar</button>
                        <button onClick={() => handleDelete('sponsors', s.id)} className="text-sm px-3 py-1 rounded bg-red-100">Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={(e) => { e.preventDefault(); if (editingSponsorId) handleUpdate('sponsors', editingSponsorId, sponsorForm, () => resetEditing('sponsors')); else handleCreate('sponsors', sponsorForm, () => resetEditing('sponsors')); }} className="space-y-3">
                  <input type="text" placeholder="Nombre" value={sponsorForm.name} onChange={(e) => setSponsorForm({ ...sponsorForm, name: e.target.value })} className="form-field" required />
                  <input type="url" placeholder="Web" value={sponsorForm.website} onChange={(e) => setSponsorForm({ ...sponsorForm, website: e.target.value })} className="form-field" />
                  <input type="number" placeholder="Orden" value={sponsorForm.order} onChange={(e) => setSponsorForm({ ...sponsorForm, order: e.target.value })} className="form-field" />
                  <input type="file" accept="image/*" onChange={(e) => setSponsorForm({ ...sponsorForm, image: e.target.files?.[0] || null })} />
                  <div className="flex gap-2">
                    <button type="submit" className="rounded-3xl bg-cyan-500 px-4 py-2 text-white">{editingSponsorId ? 'Actualizar' : 'Crear'}</button>
                    {editingSponsorId && <button type="button" onClick={() => resetEditing('sponsors')} className="rounded-3xl px-4 py-2 border">Cancelar</button>}
                  </div>
                </form>
              </div>
            )}

            {!loading && activeTab === 'news' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Novedades</h3>
                <div className="space-y-3 mb-4">
                  {newsList.map((n) => (
                    <div key={n.id} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <div className="font-medium">{n.title}</div>
                        <div className="text-sm text-slate-600">{n.description?.slice(0, 80)}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit('news', n)} className="text-sm px-3 py-1 rounded bg-yellow-100">Editar</button>
                        <button onClick={() => handleDelete('news', n.id)} className="text-sm px-3 py-1 rounded bg-red-100">Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={(e) => { e.preventDefault(); if (editingNewsId) handleUpdate('news', editingNewsId, newsForm, () => resetEditing('news')); else handleCreate('news', newsForm, () => resetEditing('news')); }} className="space-y-3">
                  <input type="text" placeholder="Título" value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} className="form-field" required />
                  <textarea placeholder="Descripción" value={newsForm.description} onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })} className="form-field" rows={4} required />
                  <input type="file" accept="image/*" onChange={(e) => setNewsForm({ ...newsForm, image: e.target.files?.[0] || null })} />
                  <div className="flex gap-2">
                    <button type="submit" className="rounded-3xl bg-cyan-500 px-4 py-2 text-white">{editingNewsId ? 'Actualizar' : 'Crear'}</button>
                    {editingNewsId && <button type="button" onClick={() => resetEditing('news')} className="rounded-3xl px-4 py-2 border">Cancelar</button>}
                  </div>
                </form>
              </div>
            )}

            {!loading && activeTab === 'events' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Eventos</h3>
                <div className="space-y-3 mb-4">
                  {events.map((ev) => (
                    <div key={ev.id} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <div className="font-medium">{ev.title}</div>
                        <div className="text-sm text-slate-600">{ev.location} — {ev.date ? new Date(ev.date).toLocaleString() : ''}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit('events', ev)} className="text-sm px-3 py-1 rounded bg-yellow-100">Editar</button>
                        <button onClick={() => handleDelete('events', ev.id)} className="text-sm px-3 py-1 rounded bg-red-100">Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={(e) => { e.preventDefault(); if (editingEventId) handleUpdate('events', editingEventId, eventForm, () => resetEditing('events')); else handleCreate('events', eventForm, () => resetEditing('events')); }} className="space-y-3">
                  <input type="text" placeholder="Título" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} className="form-field" required />
                  <input type="date" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} className="form-field" required />
                  <input type="text" placeholder="Ubicación" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} className="form-field" required />
                  <textarea placeholder="Descripción" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} className="form-field" rows={3} />
                  <input type="file" accept="image/*" onChange={(e) => setEventForm({ ...eventForm, image: e.target.files?.[0] || null })} />
                  <div className="flex gap-2">
                    <button type="submit" className="rounded-3xl bg-cyan-500 px-4 py-2 text-white">{editingEventId ? 'Actualizar' : 'Crear'}</button>
                    {editingEventId && <button type="button" onClick={() => resetEditing('events')} className="rounded-3xl px-4 py-2 border">Cancelar</button>}
                  </div>
                </form>
              </div>
            )}

            {!loading && activeTab === 'trainings' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Entrenamientos</h3>
                <div className="space-y-3 mb-4">
                  {trainings.map((tr) => (
                    <div key={tr.id} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <div className="font-medium">{tr.dayOfWeek} — {tr.startTime} - {tr.endTime}</div>
                        <div className="text-sm text-slate-600">{tr.location}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit('trainings', tr)} className="text-sm px-3 py-1 rounded bg-yellow-100">Editar</button>
                        <button onClick={() => handleDelete('trainings', tr.id)} className="text-sm px-3 py-1 rounded bg-red-100">Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={(e) => { e.preventDefault(); if (editingTrainingId) handleUpdate('trainings', editingTrainingId, trainingForm, () => resetEditing('trainings')); else handleCreate('trainings', trainingForm, () => resetEditing('trainings')); }} className="space-y-3">
                  <input type="text" placeholder="Día (ej. Lunes)" value={trainingForm.dayOfWeek} onChange={(e) => setTrainingForm({ ...trainingForm, dayOfWeek: e.target.value })} className="form-field" required />
                  <input type="time" value={trainingForm.startTime} onChange={(e) => setTrainingForm({ ...trainingForm, startTime: e.target.value })} className="form-field" required />
                  <input type="time" value={trainingForm.endTime} onChange={(e) => setTrainingForm({ ...trainingForm, endTime: e.target.value })} className="form-field" required />
                  <input type="text" placeholder="Ubicación" value={trainingForm.location} onChange={(e) => setTrainingForm({ ...trainingForm, location: e.target.value })} className="form-field" required />
                  <input type="url" placeholder="URL mapa" value={trainingForm.mapUrl} onChange={(e) => setTrainingForm({ ...trainingForm, mapUrl: e.target.value })} className="form-field" />
                  <textarea placeholder="Requisitos" value={trainingForm.requirements} onChange={(e) => setTrainingForm({ ...trainingForm, requirements: e.target.value })} className="form-field" rows={2} />
                  <div className="flex gap-2">
                    <button type="submit" className="rounded-3xl bg-cyan-500 px-4 py-2 text-white">{editingTrainingId ? 'Actualizar' : 'Crear'}</button>
                    {editingTrainingId && <button type="button" onClick={() => resetEditing('trainings')} className="rounded-3xl px-4 py-2 border">Cancelar</button>}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Admin;
