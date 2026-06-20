import { useEffect, useState } from 'react';
import { FaEnvelope, FaEnvelopeOpen, FaTrash, FaPhone } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { contactAPI } from '../../services/api';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchInquiries = async () => {
    try {
      const params = {};
      if (filter) params.isRead = filter;
      const res = await contactAPI.getAll(params);
      setInquiries(res.data.data);
    } catch { toast.error('Failed to load inquiries'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchInquiries(); }, [filter]);

  const handleMarkRead = async (id) => {
    try { await contactAPI.markRead(id); fetchInquiries(); }
    catch { toast.error('Failed to update'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try { await contactAPI.delete(id); toast.success('Inquiry deleted'); setSelectedInquiry(null); fetchInquiries(); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-dark-900">Contact Inquiries</h1>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="input-field !w-auto !py-2">
          <option value="">All</option>
          <option value="false">Unread</option>
          <option value="true">Read</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inbox List */}
        <div className="lg:col-span-1 space-y-2 max-h-[70vh] overflow-y-auto">
          {loading ? (
            <div className="text-center py-8"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto" /></div>
          ) : inquiries.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No inquiries</p>
          ) : inquiries.map((inq) => (
            <button
              key={inq._id}
              onClick={() => { setSelectedInquiry(inq); if (!inq.isRead) handleMarkRead(inq._id); }}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedInquiry?._id === inq._id ? 'border-primary-300 bg-primary-50' : 'border-gray-100 bg-white hover:bg-gray-50'
              } ${!inq.isRead ? 'border-l-4 border-l-primary-500' : ''}`}
            >
              <div className="flex items-center gap-2 mb-1">
                {inq.isRead ? <FaEnvelopeOpen className="text-gray-400 text-xs" /> : <FaEnvelope className="text-primary-500 text-xs" />}
                <span className={`text-sm font-medium ${!inq.isRead ? 'text-dark-900' : 'text-gray-600'}`}>{inq.name}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">{inq.subject}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(inq.createdAt).toLocaleDateString()}</p>
            </button>
          ))}
        </div>

        {/* Detail View */}
        <div className="lg:col-span-2">
          {selectedInquiry ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-dark-900">{selectedInquiry.subject}</h2>
                <button onClick={() => handleDelete(selectedInquiry._id)} className="text-red-500 hover:text-red-700 p-2"><FaTrash /></button>
              </div>
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm"><span className="text-gray-500 w-16">From:</span><span className="font-medium text-dark-900">{selectedInquiry.name}</span></div>
                <div className="flex items-center gap-2 text-sm"><span className="text-gray-500 w-16">Email:</span><a href={`mailto:${selectedInquiry.email}`} className="text-primary-600 hover:underline">{selectedInquiry.email}</a></div>
                {selectedInquiry.phone && <div className="flex items-center gap-2 text-sm"><span className="text-gray-500 w-16">Phone:</span><a href={`tel:${selectedInquiry.phone}`} className="text-primary-600 hover:underline">{selectedInquiry.phone}</a></div>}
                <div className="flex items-center gap-2 text-sm"><span className="text-gray-500 w-16">Date:</span><span className="text-gray-600">{new Date(selectedInquiry.createdAt).toLocaleString()}</span></div>
              </div>
              <div className="prose prose-sm max-w-none"><p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedInquiry.message}</p></div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <FaEnvelope className="text-4xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select an inquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInquiries;
