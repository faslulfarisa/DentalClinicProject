import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaEnvelope, FaUserMd } from 'react-icons/fa';
import { appointmentAPI, contactAPI, doctorAPI } from '../../services/api';

const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
  <div className={`${bgColor} rounded-2xl p-6 border border-gray-100`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-dark-900 mt-1 font-heading">{value}</p>
      </div>
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white`}>
        <Icon size={20} />
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0, recentCount: 0,
  });
  const [inquiryCount, setInquiryCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, appointmentsRes, inquiriesRes, doctorsRes] = await Promise.all([
          appointmentAPI.getStats(),
          appointmentAPI.getAll({ limit: 5 }),
          contactAPI.getAll({ limit: 1 }),
          doctorAPI.getAll({ all: true }),
        ]);
        setStats(statsRes.data.data);
        setRecentAppointments(appointmentsRes.data.data);
        setInquiryCount(inquiriesRes.data.total || 0);
        setDoctorCount(doctorsRes.data.count || 0);
      } catch (error) {
        console.error('Dashboard error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statusColors = {
    pending: 'badge-pending',
    confirmed: 'badge-confirmed',
    completed: 'badge-completed',
    cancelled: 'badge-cancelled',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-dark-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's your clinic overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={FaCalendarAlt} title="Total Appointments" value={stats.total} color="bg-primary-600" bgColor="bg-white" />
        <StatCard icon={FaClock} title="Pending" value={stats.pending} color="bg-yellow-500" bgColor="bg-white" />
        <StatCard icon={FaCheckCircle} title="Confirmed" value={stats.confirmed} color="bg-blue-500" bgColor="bg-white" />
        <StatCard icon={FaTimesCircle} title="Completed" value={stats.completed} color="bg-green-500" bgColor="bg-white" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard icon={FaCalendarAlt} title="This Week" value={stats.recentCount} color="bg-purple-500" bgColor="bg-white" />
        <StatCard icon={FaEnvelope} title="Contact Inquiries" value={inquiryCount} color="bg-orange-500" bgColor="bg-white" />
        <StatCard icon={FaUserMd} title="Active Doctors" value={doctorCount} color="bg-secondary-500" bgColor="bg-white" />
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-heading font-bold text-dark-900">Recent Appointments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Patient</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentAppointments.map((apt) => (
                <tr key={apt._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-dark-900 text-sm">{apt.name}</p>
                      <p className="text-gray-500 text-xs">{apt.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{apt.service}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(apt.preferredDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{apt.preferredTime}</td>
                  <td className="px-6 py-4">
                    <span className={statusColors[apt.status]}>{apt.status}</span>
                  </td>
                </tr>
              ))}
              {recentAppointments.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">No appointments yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
