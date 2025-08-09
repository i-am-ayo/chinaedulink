import { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, MapPin, Star, Users, Globe, GraduationCap, FileText, Award, Calendar, Clock, CheckCircle, Heart, Quote } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';

export default function Home() {
  const [likes, setLikes] = useState(3108);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [uploadAccess, setUploadAccess] = useState(false);
const [uploadPassword, setUploadPassword] = useState('');
const [programType, setProgramType] = useState('Bachelors');
const [fullName, setFullName] = useState('');
const [email, setEmail] = useState('');
const [files, setFiles] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'details', 'eligibility', 'documents', 'administrator', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const templateParams = {
    fullName: formData.fullName,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
  };

  try {
    await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    );

    setFormSubmitted(true);
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: ''
    });
  } catch (error) {
    console.error('EmailJS Error:', error);
    alert('Failed to send message. Please try again or contact us directly.');
  } finally {
    setIsSubmitting(false);
  }

  setTimeout(() => {
    setFormSubmitted(false);
  }, 5000);
};

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'details', label: 'Scholarship Details' },
    { id: 'eligibility', label: 'Eligibility & Requirements' },
    { id: 'documents', label: 'Application Documents' },
    { id: 'administrator', label: 'About the Administrator' },
    { id: 'contact', label: 'Contact' },
    { id: 'upload', label: 'Upload Documents' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-white-600 to-white-700 rounded-xl flex items-center justify-center shadow-lg">
                <img src="/china-edulink-logo.png" alt="ChinaEduLink Agency Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ChinaEduLink Agency</h1>
                <p className="text-sm text-gray-500">Academic Excellence Program</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                    activeSection === item.id ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
<section
  id="home"
  className="pt-20 min-h-screen flex items-center relative overflow-hidden"
>
  {/* Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100"></div>
  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
        ChinaEduLink Agency:
        <span className="block text-blue-600">Advancing Global Talent</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-10">
        A prestigious scholarship program supporting academic excellence and leadership potential in Huaian, Jiangsu, China.
      </p>

      {/* Apply Now & Learn More */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <button
          onClick={() => scrollToSection('contact')}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          Apply Now
        </button>
        <button
          onClick={() => scrollToSection('details')}
          className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
        >
          Learn More
        </button>
      </div>

      {/* Contact Icons */}
      <div className="flex flex-wrap justify-center gap-8 mt-8 text-gray-700">
        {/* Email */}
        <a
          href="mailto:china.edulinkagency@gmail.com"
          className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
        >
          <Mail className="h-6 w-6" />
          <span>Email</span>
        </a>

        {/* Call */}
        <a
          href="tel:+8618662953550"
          className="flex items-center space-x-2 hover:text-green-600 transition-colors"
        >
          <Phone className="h-6 w-6" />
          <span>Call</span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/8618662953550"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-green-500 transition-colors"
        >
          <FaWhatsapp className="h-6 w-6" />
          <span>WhatsApp</span>
        </a>

        {/* Telegram */}
        <a
          href="https://t.me/ChinaEduLinkAgency"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
        >
          <FaTelegramPlane className="h-6 w-6" />
          <span>Telegram</span>
        </a>
      </div>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-2 gap-6 mt-20">
      <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Star className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">95%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>
      <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">1,200+</div>
            <div className="text-sm text-gray-600">Scholars</div>
          </div>
        </div>
      </div>
      <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <Globe className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">10+</div>
            <div className="text-sm text-gray-600">Provinces</div>
          </div>
        </div>
      </div>
      <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <Award className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">15+</div>
            <div className="text-sm text-gray-600">Partner Universities</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Scholarship Details Section */}
      <section id="details" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Program Overview</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the comprehensive scholarship program designed to nurture global academic talent
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <MapPin className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-700">Huaian, Jiangsu, China</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
              <GraduationCap className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fields of Study</h3>
              <p className="text-gray-700">Engineering, Computer Science, Business Administration, Medicine</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
              <Calendar className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Deadline</h3>
              <p className="text-gray-700">September Intake May - July <br />March Intake November - January</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl">
              <Award className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Program Benefits</h3>
              <p className="text-gray-700">Full tuition, monthly stipend, mentorship, cultural exchange</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Important Dates</h3>
  <div className="grid md:grid-cols-2 gap-8">
    {/* September Intake */}
    <div className="space-y-4 border rounded-xl p-6 bg-white shadow">
      <h4 className="text-xl font-semibold text-gray-900">September Intake</h4>
      <div className="flex items-center space-x-4">
        <Clock className="h-6 w-6 text-blue-600" />
        <p><span className="font-semibold">Application Deadline:</span> March</p>
      </div>
      <div className="flex items-center space-x-4">
        <Mail className="h-6 w-6 text-green-600" />
        <p><span className="font-semibold">Notification Date:</span> May</p>
      </div>
      <div className="flex items-center space-x-4">
        <GraduationCap className="h-6 w-6 text-purple-600" />
        <p><span className="font-semibold">Program Start:</span> September</p>
      </div>
    </div>

    {/* March Intake */}
    <div className="space-y-4 border rounded-xl p-6 bg-white shadow">
      <h4 className="text-xl font-semibold text-gray-900">March Intake</h4>
      <div className="flex items-center space-x-4">
        <Clock className="h-6 w-6 text-blue-600" />
        <p><span className="font-semibold">Application Deadline:</span> September</p>
      </div>
      <div className="flex items-center space-x-4">
        <Mail className="h-6 w-6 text-green-600" />
        <p><span className="font-semibold">Notification Date:</span> December</p>
      </div>
      <div className="flex items-center space-x-4">
        <GraduationCap className="h-6 w-6 text-purple-600" />
        <p><span className="font-semibold">Program Start:</span> March</p>
      </div>
    </div>
  </div>
</div>

        </div>
      </section>

      {/* Eligibility & Requirements Section */}
      <section id="eligibility" className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who Can Apply</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover if you meet the requirements for our prestigious scholarship program
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Bachelor's Program */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <h3 className="text-2xl font-bold text-white">Bachelor's Program</h3>
                <p className="text-blue-100">Undergraduate Studies</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Academic Excellence</h4>
                    <p className="text-gray-600">High school graduates with minimum GPA of 3.5/4.0</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Age Requirement</h4>
                    <p className="text-gray-600">Between 18-25 years old at time of application</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Language Proficiency</h4>
                    <p className="text-gray-600">IELTS 6.0+ or TOEFL 80+ or HSK Level 4 for Chinese programs (if available)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Leadership Potential</h4>
                    <p className="text-gray-600">Demonstrated leadership experience in academics or community</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Master's Program */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
                <h3 className="text-2xl font-bold text-white">Master's Program</h3>
                <p className="text-purple-100">Graduate Studies</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Educational Background</h4>
                    <p className="text-gray-600">Bachelor's degree holders with minimum GPA of 3.2/4.0</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Research Interest</h4>
                    <p className="text-gray-600">Clear research proposal aligned with program offerings</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Professional Experience</h4>
                    <p className="text-gray-600">1-2 years relevant work or research experience preferred</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Language Proficiency</h4>
                    <p className="text-gray-600">IELTS 6.5+ or TOEFL 90+ or HSK Level 5 for Chinese programs (if available)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Documents Section */}
      <section id="documents" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Required Documents</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Prepare all necessary documentation for your scholarship application
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Bachelor's Documents */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 border-b-2 border-blue-600 pb-2">
                Bachelor's Applicants
              </h3>
              
              {[
                "Application Form",
                "High School Diploma",
                "Official Transcripts",
                "Personal Statement (500-1000 words)",
                "Two Recommendation Letters",
                "Passport Copy",
                "Recent Passport Photo",
                "Language Proficiency Certificate (if available)",
                "Medical Health Report"
              ].map((doc, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <FileText className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-900 font-medium">{doc}</span>
                </div>
              ))}
            </div>

            {/* Master's Documents */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 border-b-2 border-purple-600 pb-2">
                Master's Applicants
              </h3>
              
              {[
                "Application Form",
                "Bachelor's Degree Certificate",
                "Official Transcripts",
                "Research Proposal (1000-2000 words)",
                "Two Academic Recommendation Letters",
                "Detailed CV/Resume",
                "Passport Copy",
                "Recent Passport Photo",
                "Language Proficiency Certificate (if available)",
                "Medical Health Report"
              ].map((doc, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                  <FileText className="h-6 w-6 text-purple-600 flex-shrink-0" />
                  <span className="text-gray-900 font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-600 font-bold">!</span>
              </div>
              <div>
                <h4 className="font-semibold text-amber-900 mb-2">Important Note</h4>
                <p className="text-amber-800">
                  All documents must be translated into English or Chinese by certified translators and officially notarized. 
                  Submit both original language documents and translated versions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
<section id="upload" className="py-24 bg-white">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Secure Document Upload</h2>

    {!uploadAccess ? (
      <form onSubmit={(e) => {
        e.preventDefault();
        if (uploadPassword === 'Scholar2025') setUploadAccess(true);
        else alert('Incorrect password');
      }} className="space-y-4">
        <input
          type="password"
          value={uploadPassword}
          onChange={(e) => setUploadPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          placeholder="Enter access code"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
          Access Upload Form
        </button>
      </form>
    ) : (
      <>
        {/* Program Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Program Type</label>
          <select
            value={programType}
            onChange={(e) => setProgramType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          >
            <option value="Bachelors">Bachelor's</option>
            <option value="Masters">Master's</option>
          </select>
        </div>

       {/* Upload Form */}
<div className="space-y-6">
  <input
    type="text"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl"
    placeholder="Full Name"
    required
  />
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl"
    placeholder="Email Address"
    required
  />

  {(programType === 'Bachelors' ? [
    "Application Form",
    "High School Diploma",
    "Official Transcripts",
    "Personal Statement",
    "Two Recommendation Letters",
    "Passport Copy",
    "Recent Passport Photo",
    "Language Proficiency Certificate",
    "Medical Health Report"
  ] : [
    "Application Form",
    "Bachelor’s Degree Certificate",
    "Official Transcripts",
    "Research Proposal",
    "Two Academic Recommendation Letters",
    "Detailed CV/Resume",
    "Passport Copy",
    "Recent Passport Photo",
    "Language Proficiency Certificate",
    "Medical Health Report"
  ]).map((label, index) => (
    <div key={index} className="space-y-2">
      <label className="font-medium text-gray-700">{label} 📤</label>
      <input
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        required
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/png'
          ];
          if (!allowedTypes.includes(file.type)) {
            alert(`Invalid file type for ${label}`);
            return;
          }
          if (file.size > 10 * 1024 * 1024) {
            alert(`File too large for ${label} (max 10MB)`);
            return;
          }
          const extension = file.name.split('.').pop();
          const renamedFile = new File([file], `${programType}_${fullName.replace(/\s+/g, '')}_${label.replace(/\s+/g, '')}.${extension}`, {
            type: file.type
          });
          setFiles((prev) => ({ ...prev, [label]: renamedFile }));
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
    </div>
  ))}

  <button
  type="submit"
  onClick={async (e) => {
    e.preventDefault();

    if (!fullName || !email) {
      alert('Please enter your full name and email');
      return;
    }

    const fileArray = [];
    for (const [label, file] of Object.entries(files)) {
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); // base64 only
        reader.readAsDataURL(file);
      });
      fileArray.push({ name: file.name, content: base64 });
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          programType,
          files: fileArray,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Documents uploaded successfully!');
        setFiles({});
        setFullName('');
        setEmail('');
        setUploadPassword('');
        setUploadAccess(false);
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Network error. Please try again.');
    }
  }}
  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
>
  Submit Documents
</button>
</div>
</> 

    )}
  </div>
</section>

      {/* About Administrator Section */}
      <section id="administrator" className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Program Director</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated administrator committed to your academic success
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 shadow-lg">
  <img
    src="/profile.jpg"
    alt="Profile"
    className="w-full h-full object-cover"
  />
</div>

                  
                  <div className="flex-1 space-y-6 text-center md:text-left">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">Balogun Abdullahi</h3>
                      <p className="text-xl text-blue-600 font-semibold">Program Director & Founder</p>
                      <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <span className="text-gray-600">Huaian, Jiangsu, China</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl">
                      <Quote className="h-8 w-8 text-blue-600 mb-4" />
                      <p className="text-gray-800 italic text-lg leading-relaxed">
                        "Education is the bridge that connects dreams to reality. Our mission is to provide 
                        equal opportunities for talented individuals worldwide to pursue academic excellence 
                        and contribute to global knowledge."
                      </p>
                    </div>

                    <div className="space-y-4">
  <p className="text-gray-700 leading-relaxed">
    As the founder and administrator of ChinaEduLink Agency, I am committed to transparency, 
    academic excellence, and fostering international educational cooperation. With over 15 years 
    of experience in international education, I have dedicated my career to bridging cultural 
    and academic gaps between nations.
  </p>

  <div className="space-y-4">
  <p className="text-gray-700 leading-relaxed">
    As the founder and administrator of ChinaEduLink Agency, I am committed to transparency, 
    academic excellence, and fostering international educational cooperation. With over 15 years 
    of experience in international education, I have dedicated my career to bridging cultural 
    and academic gaps between nations.
  </p>

 <div className="flex flex-col sm:flex-row gap-4">
  <div className="flex items-center space-x-3">
    <Mail className="h-5 w-5 text-blue-600" />
    <a
      href="mailto:china.edulinkagency@gmail.com"
      className="text-gray-700 hover:text-blue-600"
      title="china.edulinkagency@gmail.com"
    >
      Email Us
    </a>
  </div>
  <div className="flex items-center space-x-3">
    <Phone className="h-5 w-5 text-green-600" />
    <a href="tel:+8618662953550" className="text-gray-700 hover:text-green-600">
      Call Us
    </a>
  </div>
  <div className="flex items-center space-x-3">
    <img
      src="https://cdn-icons-png.flaticon.com/128/733/733585.png"
      alt="WhatsApp"
      className="h-5 w-5"
    />
    <a
      href="https://wa.me/8618662953550"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-700 hover:text-green-500"
    >
      WhatsApp
    </a>
  </div>
  <div className="flex items-center space-x-3">
    <img
      src="https://telegram.org/img/t_logo.png"
      alt="Telegram"
      className="h-5 w-5"
    />
    <a
      href="https://t.me/ChinaEduLinkAgency"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-700 hover:text-blue-500"
    >
      Telegram
    </a>
  </div>
</div> {/* ✅ This was missing! */}
</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your academic journey? Contact us today for more information or to begin your application.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {formSubmitted ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-green-700">
                  Thank you for your interest. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="What would you like to discuss?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your academic background, interests, and questions..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-white-600 to-white-700 rounded-xl flex items-center justify-center">
                  <img src="/china-edulink-logo.png" alt="ChinaEduLink Agency Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">ChinaEduLink Agency</h3>
                  <p className="text-gray-400">Academic Excellence Program</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Advancing global talent through prestigious scholarship opportunities and 
                fostering international academic cooperation.
              </p>
              <div className="flex space-x-4">
                <button
  onClick={() => setLikes(likes + 1)}
  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
  aria-label="Like"
>
  <Heart className="h-5 w-5 text-red-400" />
</button>
<span className="text-gray-300 ml-2">{likes}</span>
                <a
  href="mailto:china.edulinkagency@gmail.com"
  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"
  aria-label="Email"
>
  <Mail className="h-5 w-5 text-blue-400" />
</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
              <div className="space-y-3">
  <div className="flex items-center space-x-3">
    <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0" />
    <span className="text-gray-300">Huaian, Jiangsu, China</span>
  </div>
  <div className="flex items-center space-x-3">
    <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
    <a
      href="mailto:china.edulinkagency@gmail.com"
      className="text-gray-300 hover:text-blue-400"
      title="china.edulinkagency@gmail.com"
    >
      Email Us
    </a>
  </div>
  <div className="flex items-center space-x-3">
    <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
    <a href="tel:+8618662953550" className="text-gray-300 hover:text-blue-400">
      Call Us
    </a>
  </div>
  <div className="flex items-center space-x-3">
    <img
      src="https://cdn-icons-png.flaticon.com/128/733/733585.png"
      alt="WhatsApp"
      className="h-5 w-5"
    />
    <a
      href="https://wa.me/8618662953550"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-green-400"
    >
      WhatsApp
    </a>
  </div>
  <div className="flex items-center space-x-3">
    <img
      src="https://telegram.org/img/t_logo.png"
      alt="Telegram"
      className="h-5 w-5"
    />
    <a
      href="https://t.me/ChinaEduLinkAgency"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-blue-400"
    >
      Telegram
    </a>
  </div>
</div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 ChinaEduLink Agency. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button>
              <button className="text-gray-400 hover:text-white transition-colors">Terms of Use</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}