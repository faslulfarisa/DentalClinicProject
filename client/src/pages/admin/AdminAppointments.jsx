import { useEffect, useState } from 'react';
import { FaSearch, FaFilter, FaTrash, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { appointmentAPI } from '../../services/api';

const statusOptions = ['pending', 'confirmed', 'completed', 'cancelled'];

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const params = { page: currentPage, limit: 10 };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const res = await appointmentAPI.getAll(params);
      setAppointments(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointments(); }, [currentPage, statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAppointments();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await appointmentAPI.update(id, { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
      fetchAppointments();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await appointmentAPI.delete(id);
      toast.success('Appointment deleted');
      fetchAppointments();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const statusColors = {
    pending: 'badge-pending',
    confirmed: 'badge-confirmed',
    completed: 'badge-completed',
    cancelled: 'badge-cancelled',
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-heading font-bold text-dark-900">Appointments</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-6 flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone..."
              className="input-field !pl-10 !py-2.5"
            />
          </div>
          <button type="submit" className="btn-primary !py-2.5 !px-6">Search</button>
        </form>
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="input-field !py-2.5 !w-auto"
          >
            <option value="">All Status</option>
            {statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Patient</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date/Time</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-8"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto" /></td></tr>
              ) : appointments.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-8 text-gray-500">No appointments found</td></tr>
              ) : (
                appointments.map((apt) => (
                  <tr key={apt._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-dark-900 text-sm">{apt.name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-600">{apt.email}</p>
                      <p className="text-xs text-gray-400">{apt.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{apt.service}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-600">{new Date(apt.preferredDate).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-400">{apt.preferredTime}</p>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={apt.status}
                        onChange={(e) => handleStatusChange(apt._id, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${statusColors[apt.status]}`}
                      >
                        {statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(apt._id)} className="text-red-500 hover:text-red-700 p-1 transition-colors" title="Delete">
                        <FaTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 p-4 border-t border-gray-100">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === i + 1 ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAppointments;
