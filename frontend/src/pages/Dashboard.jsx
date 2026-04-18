import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import NoteModal from '../components/NoteModal.jsx';

export default function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const load = async () => {
    setLoading(true);
    try { const { data } = await api.get('/notes'); setNotes(data); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const save = async (payload) => {
    if (editing) await api.put(`/notes/${editing._id}`, payload);
    else await api.post('/notes', payload);
    setModalOpen(false); setEditing(null); load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this note?')) return;
    await api.delete(`/notes/${id}`); load();
  };

  const logout = () => {
    localStorage.removeItem('token'); localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">QuickNote</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600 hidden sm:inline">{user.name}</span>
            <button onClick={logout} className="text-sm px-3 py-1.5 border rounded-md hover:bg-slate-50">Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Your notes</h2>
          <button onClick={() => { setEditing(null); setModalOpen(true); }}
            className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800">+ New note</button>
        </div>

        {loading ? (
          <p className="text-slate-500">Loading…</p>
        ) : notes.length === 0 ? (
          <p className="text-slate-500">No notes yet. Create your first one!</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((n) => (
              <div key={n._id} className="bg-white p-4 rounded-xl border shadow-sm flex flex-col">
                <h3 className="font-semibold mb-2 line-clamp-1">{n.title}</h3>
                <p className="text-sm text-slate-600 whitespace-pre-wrap flex-1 line-clamp-6">{n.content}</p>
                <div className="mt-3 flex justify-end gap-2">
                  <button onClick={() => { setEditing(n); setModalOpen(true); }}
                    className="text-sm px-3 py-1 border rounded-md hover:bg-slate-50">Edit</button>
                  <button onClick={() => remove(n._id)}
                    className="text-sm px-3 py-1 border border-red-200 text-red-600 rounded-md hover:bg-red-50">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <NoteModal open={modalOpen} initial={editing}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSave={save} />
    </div>
  );
}
