import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import type { Language } from '../types';

interface ContactProps {
  language: Language;
}

const Contact: React.FC<ContactProps> = ({ language }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [emailError, setEmailError] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const content = {
    en: {
      title: 'Contact',
      subtitle: 'Have a project to discuss? Please fill out the form below or send me an email.',
      alert: 'Thank you for your message! I will get back to you as soon as possible.',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      submit: 'Send Message',
      submitSending: 'Sending...',
      validationError: 'Please enter a valid email address.',
      successTitle: 'Message Sent!',
      confirmTitle: 'Confirm Submission',
      confirmMessage: 'Are you sure you want to send this message?',
      confirmButton: 'Yes, Send',
      cancelButton: 'Cancel',
    },
    km: {
      title: 'ទំនាក់ទំនង',
      subtitle: 'មានគម្រោងចង់ពិភាក្សា? សូមបំពេញទម្រង់ខាងក្រោម ឬផ្ញើអ៊ីមែលមកខ្ញុំ។',
      alert: 'សូមអរគុណសម្រាប់សាររបស់អ្នក! ខ្ញុំនឹងឆ្លើយតបទៅអ្នកវិញឆាប់ៗតាមដែលអាចធ្វើបាន។',
      name: 'ឈ្មោះ',
      email: 'អ៊ីមែល',
      subject: 'ប្រធានបទ',
      message: 'សារ',
      submit: 'ផ្ញើសារ',
      submitSending: 'កំពុងផ្ញើ...',
      validationError: 'សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលដែលត្រឹមត្រូវ។',
      successTitle: 'បានផ្ញើសារ!',
      confirmTitle: 'បញ្ជាក់ការបញ្ជូន',
      confirmMessage: 'តើអ្នកប្រាកដថាចង់ផ្ញើសារនេះមែនទេ?',
      confirmButton: 'បាទ/ចាស, ផ្ញើ',
      cancelButton: 'បោះបង់',
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
     if (name === 'email' && emailError) {
      setEmailError('');
    }
  };
  
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError('');

    if (!validateEmail(formData.email)) {
      setEmailError(content[language].validationError);
      return;
    }
    
    setShowConfirmation(true);
  };

  const handleConfirmSend = () => {
    setShowConfirmation(false);
    setFormStatus('submitting');
    // Simulate an API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24">
      <SectionHeader 
        title={content[language].title}
        subtitle={content[language].subtitle}
      />
      <div className="mt-12 max-w-lg mx-auto">
        {formStatus === 'success' ? (
          <div className="text-center p-8 bg-green-50 border border-green-200 rounded-lg animate-fadeIn">
            <div className="inline-block bg-green-100 p-3 rounded-full">
                <svg xmlns="http://www.w.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">{content[language].successTitle}</h3>
            <p className="mt-2 text-md text-gray-600">{content[language].alert}</p>
             <style>{`
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
             `}</style>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="name" className="sr-only">{content[language].name}</label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleInputChange}
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 bg-white border-gray-200 border rounded-md focus:ring-gray-500 focus:border-gray-500 focus:outline-none"
                placeholder={content[language].name}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">{content[language].email}</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full shadow-sm py-3 px-4 placeholder-gray-500 bg-white border rounded-md focus:ring-gray-500 focus:border-gray-500 focus:outline-none ${emailError ? 'border-red-500' : 'border-gray-200'}`}
                placeholder={content[language].email}
                required
                aria-invalid={!!emailError}
                aria-describedby="email-error"
              />
              {emailError && <p id="email-error" className="mt-2 text-sm text-red-600">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="subject" className="sr-only">{content[language].subject}</label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 bg-white border-gray-200 border rounded-md focus:ring-gray-500 focus:border-gray-500 focus:outline-none"
                placeholder={content[language].subject}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">{content[language].message}</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 bg-white border-gray-200 border rounded-md focus:ring-gray-500 focus:border-gray-500 focus:outline-none"
                placeholder={content[language].message}
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {formStatus === 'submitting' ? content[language].submitSending : content[language].submit}
              </button>
            </div>
          </form>
        )}
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 animate-fadeIn" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-left">
            <h3 id="confirm-dialog-title" className="text-lg font-semibold text-gray-900">{content[language].confirmTitle}</h3>
            <p className="mt-2 text-sm text-gray-600">{content[language].confirmMessage}</p>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                type="button"
                onClick={() => setShowConfirmation(false)} 
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                {content[language].cancelButton}
              </button>
              <button 
                type="button"
                onClick={handleConfirmSend} 
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                {content[language].confirmButton}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;