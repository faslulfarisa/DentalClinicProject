import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { testimonialAPI } from '../../services/api';

const emptyForm = { patientName: '', rating: 5, review: '', service: '', isActive: true };

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchTestimonials = async () => {
    try { const res = await testimonialAPI.getAll({ all: true }); setTestimonials(res.data.data); }
    catch { toast.error('Failed to load testimonials'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (t) => { setEditing(t._id); setForm(t); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await testimonialAPI.update(editing, form); toast.success('Testimonial updated'); }
      else { await testimonialAPI.create(form); toast.success('Testimonial added'); }
      setShowModal(false); fetchTestimonials();
    } catch (err) { toast.error(err.response?.data?.message || 'Operation failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try { await testimonialAPI.delete(id); toast.success('Testimonial deleted'); fetchTestimonials(); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-dark-900">Testimonials</h1>
        <button onClick={openCreate} className="btn-primary !py-2.5 !px-5 !text-sm"><FaPlus /> Add Testimonial</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-8"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto" /></div>
        ) : testimonials.map((t) => (
          <div key={t._id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <FaStar key={i} className={`text-sm ${i < t.rating ? 'text-yellow-400' : 'text-gray-200'}`} />)}</div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(t)} className="text-primary-500 hover:text-primary-700 p-1"><FaEdit size={12} /></button>
                <button onClick={() => handleDelete(t._id)} className="text-red-500 hover:text-red-700 p-1"><FaTrash size={12} /></button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">"{t.review}"</p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <p className="font-medium text-dark-900 text-sm">{t.patientName}</p>
              <span className={`badge text-xs ${t.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{t.isActive ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Patient Name *</label><input required value={form.patientName} onChange={e => setForm({...form, patientName: e.target.value})} className="input-field" /></div>
              <div><label className="block text-sm font-medium mb-1">Rating *</label>
                <div className="flex gap-2">{[1,2,3,4,5].map(r => <button key={r} type="button" onClick={() => setForm({...form, rating: r})} className={`p-2 rounded-lg transition-colors ${form.rating >= r ? 'text-yellow-400' : 'text-gray-300'}`}><FaStar size={20} /></button>)}</div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Review *</label><textarea required value={form.review} onChange={e => setForm({...form, review: e.target.value})} className="input-field resize-none" rows="4" /></div>
              <div><label className="block text-sm font-medium mb-1">Service</label><input value={form.service} onChange={e => setForm({...form, service: e.target.value})} className="input-field" placeholder="e.g., Root Canal" /></div>
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

export default AdminTestimonials;
