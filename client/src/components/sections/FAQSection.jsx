import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { faqAPI } from '../../services/api';

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await faqAPI.getAll();
        setFaqs(res.data.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setFaqs([
          { _id: '1', question: 'How often should I visit the dentist?', answer: 'We recommend visiting every 6 months for regular checkups and cleanings.' },
          { _id: '2', question: 'Is root canal treatment painful?', answer: 'Modern root canal treatments are virtually painless with advanced anesthesia.' },
          { _id: '3', question: 'How long do dental implants last?', answer: 'With proper care, dental implants can last a lifetime.' },
          { _id: '4', question: 'Do you offer payment plans?', answer: 'Yes, we offer flexible payment plans and accept most insurance providers.' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="section-padding bg-white relative">
      {/* Dynamic FAQ Schema for SEO / AEO */}
      {faqs.length > 0 && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            })}
          </script>
        </Helmet>
      )}

      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">FAQs</span>
          <h2 className="section-title mt-2">
            Frequently Asked{' '}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="section-subtitle">
            Find direct answers to the most common questions about our dental services, treatments, and clinic policies.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-3" itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-primary-200 transition-colors"
              itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
            >
              <button
                id={`faq-toggle-${index}`}
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-dark-900 pr-4" itemProp="name">{faq.question}</span>
                <FaChevronDown
                  className={`text-primary-500 transition-transform duration-300 flex-shrink-0 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                    itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
                  >
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4" itemProp="text">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
