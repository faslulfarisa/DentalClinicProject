import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { doctorAPI } from '../../services/api';

const emptyForm = { name: '', qualification: '', experience: '', specialization: '', bio: '', image: '', order: 0, isActive: true };

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchDoctors = async () => {
    try {
      const res = await doctorAPI.getAll({ all: true });
      setDoctors(res.data.data);
    } catch { toast.error('Failed to load doctors'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDoctors(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (doc) => { setEditing(doc._id); setForm({ ...doc, experience: doc.experience.toString() }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form, experience: Number(form.experience) };
      if (editing) {
        await doctorAPI.update(editing, data);
        toast.success('Doctor updated');
      } else {
        await doctorAPI.create(data);
        toast.success('Doctor added');
      }
      setShowModal(false);
      fetchDoctors();
    } catch (err) { toast.error(err.response?.data?.message || 'Operation failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this doctor?')) return;
    try { await doctorAPI.delete(id); toast.success('Doctor deleted'); fetchDoctors(); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-dark-900">Doctors</h1>
        <button onClick={openCreate} className="btn-primary !py-2.5 !px-5 !text-sm"><FaPlus /> Add Doctor</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Qualification</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Experience</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Specialization</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-8"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto" /></td></tr>
              ) : doctors.map((doc) => (
                <tr key={doc._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-dark-900 text-sm">{doc.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{doc.qualification}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{doc.experience} yrs</td>
                  <td className="px-4 py-3 text-sm"><span className="badge bg-primary-50 text-primary-700">{doc.specialization}</span></td>
                  <td className="px-4 py-3"><span className={`badge ${doc.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{doc.isActive ? 'Active' : 'Inactive'}</span></td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => openEdit(doc)} className="text-primary-500 hover:text-primary-700 p-1"><FaEdit size={14} /></button>
                    <button onClick={() => handleDelete(doc._id)} className="text-red-500 hover:text-red-700 p-1"><FaTrash size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold">{editing ? 'Edit Doctor' : 'Add Doctor'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Name *</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" /></div>
              <div><label className="block text-sm font-medium mb-1">Qualification *</label><input required value={form.qualification} onChange={e => setForm({...form, qualification: e.target.value})} className="input-field" placeholder="e.g., BDS, MDS" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Experience (years) *</label><input type="number" required min="0" value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} className="input-field" /></div>
                <div><label className="block text-sm font-medium mb-1">Order</label><input type="number" value={form.order} onChange={e => setForm({...form, order: Number(e.target.value)})} className="input-field" /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Specialization *</label><input required value={form.specialization} onChange={e => setForm({...form, specialization: e.target.value})} className="input-field" /></div>
              <div><label className="block text-sm font-medium mb-1">Bio</label><textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} className="input-field resize-none" rows="3" /></div>
              <div><label className="block text-sm font-medium mb-1">Image URL</label><input value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="input-field" placeholder="https://..." /></div>
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

export default AdminDoctors;
