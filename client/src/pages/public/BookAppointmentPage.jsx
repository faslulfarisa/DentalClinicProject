import SEOHead from '../../components/common/SEOHead';
import AppointmentForm from '../../components/sections/AppointmentForm';

const BookAppointmentPage = () => {
  return (
    <>
      <SEOHead
        title="Book Appointment | Bright Smile Dental Clinic"
        description="Schedule your dental appointment at Bright Smile Dental Clinic. Quick and easy online booking for all dental services."
        canonical="/book-appointment"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://brightsmiledentalclinic.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Book Appointment',
            },
          ],
        }}
      />
      <div className="pt-24">
        <AppointmentForm />
      </div>
    </>
  );
};

export default BookAppointmentPage;
