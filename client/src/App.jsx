import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingCTA from './components/layout/FloatingCTA';
import AdminLayout from './components/layout/AdminLayout';
import PrivateRoute from './components/common/PrivateRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import BookAppointmentPage from './pages/public/BookAppointmentPage';

// Admin Pages (lazy loaded)
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminAppointments = lazy(() => import('./pages/admin/AdminAppointments'));
const AdminDoctors = lazy(() => import('./pages/admin/AdminDoctors'));
const AdminServices = lazy(() => import('./pages/admin/AdminServices'));
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials'));
const AdminFAQs = lazy(() => import('./pages/admin/AdminFAQs'));
const AdminInquiries = lazy(() => import('./pages/admin/AdminInquiries'));

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full" />
  </div>
);

// Public Layout wrapper
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <FloatingCTA />
  </>
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/book-appointment" element={<PublicLayout><BookAppointmentPage /></PublicLayout>} />

        {/* Admin Login (no layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected Routes */}
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminLayout><AdminDashboard /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/appointments" element={<PrivateRoute><AdminLayout><AdminAppointments /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/doctors" element={<PrivateRoute><AdminLayout><AdminDoctors /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/services" element={<PrivateRoute><AdminLayout><AdminServices /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/testimonials" element={<PrivateRoute><AdminLayout><AdminTestimonials /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/faqs" element={<PrivateRoute><AdminLayout><AdminFAQs /></AdminLayout></PrivateRoute>} />
        <Route path="/admin/inquiries" element={<PrivateRoute><AdminLayout><AdminInquiries /></AdminLayout></PrivateRoute>} />

        {/* 404 */}
        <Route path="*" element={
          <PublicLayout>
            <div className="min-h-screen flex items-center justify-center pt-20">
              <div className="text-center">
                <h1 className="text-6xl font-heading font-bold text-primary-600 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Page not found</p>
                <a href="/" className="btn-primary">Go Home</a>
              </div>
            </div>
          </PublicLayout>
        } />
      </Routes>
    </Suspense>
  );
}

export default App;
