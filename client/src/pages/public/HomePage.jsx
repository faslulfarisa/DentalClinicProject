import SEOHead from '../../components/common/SEOHead';
import HeroSection from '../../components/sections/HeroSection';
import AboutSection from '../../components/sections/AboutSection';
import ServicesSection from '../../components/sections/ServicesSection';
import DoctorsSection from '../../components/sections/DoctorsSection';
import WhyChooseUs from '../../components/sections/WhyChooseUs';
import TestimonialsSection from '../../components/sections/TestimonialsSection';
import FAQSection from '../../components/sections/FAQSection';
import ContactSection from '../../components/sections/ContactSection';
import AppointmentForm from '../../components/sections/AppointmentForm';

const HomePage = () => {
  return (
    <>
      <SEOHead
        title="Bright Smile Dental Clinic | Best Dental Care in Mumbai"
        description="Bright Smile Dental Clinic offers comprehensive dental services including general dentistry, cosmetic dentistry, root canal treatment, dental implants, orthodontics, and teeth whitening. Book your appointment today!"
        canonical="/"
      />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <DoctorsSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        <AppointmentForm />
      </main>
    </>
  );
};

export default HomePage;
