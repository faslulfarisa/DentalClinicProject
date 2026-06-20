import { Helmet } from 'react-helmet-async';

const SEOHead = ({
  title = 'Bright Smile Dental Clinic | Best Dental Care',
  description = 'Bright Smile Dental Clinic offers comprehensive dental care including general dentistry, cosmetic dentistry, root canal treatment, dental implants, and more. Book your appointment today!',
  canonical = '',
  ogImage = '/og-image.jpg',
  structuredData = null,
}) => {
  const siteUrl = 'https://brightsmiledentalclinic.com';
  const fullUrl = `${siteUrl}${canonical}`;

  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: 'Bright Smile Dental Clinic',
    description: 'Your trusted dental care partner offering comprehensive dental services including Root Canal, Dental Implants, and Cosmetic Dentistry.',
    url: siteUrl,
    telephone: '+91-9876543210',
    image: `${siteUrl}${ogImage}`,
    priceRange: '$$',
    medicalSpecialty: ['Dentistry', 'Cosmetic Dentistry', 'Orthodontic', 'Pediatric Dentistry'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Smile Avenue, Health District',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '19.0760',
      longitude: '72.8777',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '14:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
    },
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Google Search Console Verification Placeholder */}
      <meta name="google-site-verification" content="YOUR_GSC_VERIFICATION_CODE" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Bright Smile Dental Clinic" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
