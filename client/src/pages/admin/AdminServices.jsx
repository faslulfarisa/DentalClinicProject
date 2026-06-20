import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { serviceAPI } from '../../services/api';

const emptyForm = { name: '', description: '', icon: 'FaTooth', features: [''], order: 0, isActive: true };

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchServices = async () => {
    try { const res = await serviceAPI.getAll({ all: true }); setServices(res.data.data); }
    catch { toast.error('Failed to load services'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchServices(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (svc) => { setEditing(svc._id); setForm({ ...svc, features: svc.features?.length ? svc.features : [''] }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form, features: form.features.filter(f => f.trim()) };
      if (editing) { await serviceAPI.update(editing, data); toast.success('Service updated'); }
      else { await serviceAPI.create(data); toast.success('Service added'); }
      setShowModal(false); fetchServices();
    } catch (err) { toast.error(err.response?.data?.message || 'Operation failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try { await serviceAPI.delete(id); toast.success('Service deleted'); fetchServices(); }
    catch { toast.error('Failed to delete'); }
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...form.features];
    newFeatures[index] = value;
    setForm({ ...form, features: newFeatures });
  };

  const addFeature = () => setForm({ ...form, features: [...form.features, ''] });
  const removeFeature = (index) => setForm({ ...form, features: form.features.filter((_, i) => i !== index) });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-dark-900">Services</h1>
        <button onClick={openCreate} className="btn-primary !py-2.5 !px-5 !text-sm"><FaPlus /> Add Service</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Features</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-8"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto" /></td></tr>
              ) : services.map((svc) => (
                <tr key={svc._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-dark-900 text-sm">{svc.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{svc.description}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{svc.features?.length || 0} features</td>
                  <td className="px-4 py-3"><span className={`badge ${svc.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{svc.isActive ? 'Active' : 'Inactive'}</span></td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => openEdit(svc)} className="text-primary-500 hover:text-primary-700 p-1"><FaEdit size={14} /></button>
                    <button onClick={() => handleDelete(svc._id)} className="text-red-500 hover:text-red-700 p-1"><FaTrash size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold">{editing ? 'Edit Service' : 'Add Service'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Name *</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" /></div>
              <div><label className="block text-sm font-medium mb-1">Description *</label><textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-field resize-none" rows="3" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Icon</label><input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="input-field" placeholder="FaTooth" /></div>
                <div><label className="block text-sm font-medium mb-1">Order</label><input type="number" value={form.order} onChange={e => setForm({...form, order: Number(e.target.value)})} className="input-field" /></div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Features</label>
                {form.features.map((f, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input value={f} onChange={e => updateFeature(i, e.target.value)} className="input-field" placeholder={`Feature ${i + 1}`} />
                    {form.features.length > 1 && <button type="button" onClick={() => removeFeature(i)} className="text-red-500 hover:text-red-700 px-2"><FaTimes /></button>}
                  </div>
                ))}
                <button type="button" onClick={addFeature} className="text-primary-600 text-sm font-medium hover:text-primary-800">+ Add Feature</button>
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

export default AdminServices;
