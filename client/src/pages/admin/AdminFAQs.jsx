import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { faqAPI } from '../../services/api';

const emptyForm = { question: '', answer: '', category: 'General', order: 0, isActive: true };

const AdminFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchFAQs = async () => {
    try { const res = await faqAPI.getAll({ all: true }); setFaqs(res.data.data); }
    catch { toast.error('Failed to load FAQs'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchFAQs(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (faq) => { setEditing(faq._id); setForm(faq); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await faqAPI.update(editing, form); toast.success('FAQ updated'); }
      else { await faqAPI.create(form); toast.success('FAQ added'); }
      setShowModal(false); fetchFAQs();
    } catch (err) { toast.error(err.response?.data?.message || 'Operation failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this FAQ?')) return;
    try { await faqAPI.delete(id); toast.success('FAQ deleted'); fetchFAQs(); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-dark-900">FAQs</h1>
        <button onClick={openCreate} className="btn-primary !py-2.5 !px-5 !text-sm"><FaPlus /> Add FAQ</button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-8"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto" /></div>
        ) : faqs.map((faq) => (
          <div key={faq._id} className="bg-white rounded-xl p-5 border border-gray-100 flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="badge bg-blue-50 text-blue-600 text-xs">{faq.category}</span>
                <span className={`badge text-xs ${faq.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{faq.isActive ? 'Active' : 'Inactive'}</span>
              </div>
              <p className="font-medium text-dark-900 text-sm">{faq.question}</p>
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">{faq.answer}</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => openEdit(faq)} className="text-primary-500 hover:text-primary-700 p-2"><FaEdit size={14} /></button>
              <button onClick={() => handleDelete(faq._id)} className="text-red-500 hover:text-red-700 p-2"><FaTrash size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold">{editing ? 'Edit FAQ' : 'Add FAQ'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Question *</label><input required value={form.question} onChange={e => setForm({...form, question: e.target.value})} className="input-field" /></div>
              <div><label className="block text-sm font-medium mb-1">Answer *</label><textarea required value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} className="input-field resize-none" rows="4" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field">
                    {['General', 'Treatment', 'Payment', 'Emergency', 'Pediatric'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-medium mb-1">Order</label><input type="number" value={form.order} onChange={e => setForm({...form, order: Number(e.target.value)})} className="input-field" /></div>
              </div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} className="w-4 h-4 rounded" /><label className="text-sm">Active</label></div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1 justify-center">{editing ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFAQs;
