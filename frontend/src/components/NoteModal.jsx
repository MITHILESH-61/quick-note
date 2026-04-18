import { useEffect, useState } from 'react';

export default function NoteModal({ open, onClose, onSave, initial }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(initial?.title || '');
    setContent(initial?.content || '');
  }, [initial, open]);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try { await onSave({ title, content }); } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <form onSubmit={submit} className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{initial ? 'Edit note' : 'New note'}</h2>
        <input required placeholder="Title" value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-md" />
        <textarea placeholder="Content" rows={6} value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-md resize-none" />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">Cancel</button>
          <button disabled={saving} className="px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50">
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
