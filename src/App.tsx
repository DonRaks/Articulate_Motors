import { useState, useEffect, useRef } from 'react';
import {
  Bus,
  MapPin,
  Phone,
  Shield,
  Clock,
  Star,
  Users,
  Package,
  ChevronDown,
  Menu,
  X,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  CheckCircle,
  ArrowRight,
  Headphones,
  Wallet,
  Timer,
  Wrench,
  Plus,
} from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────
const PHONE_NUMBER = '2349032836096';
const CALL_NUMBER = '09160239287';
const WA_BASE = `https://wa.me/${PHONE_NUMBER}`;
const WA_BOOK  = `${WA_BASE}?text=I%20want%20to%20book%20a%20bus%20trip`;
const WA_AGENT = `${WA_BASE}?text=I%20want%20to%20speak%20to%20an%20agent`;
const WA_CARE  = `${WA_BASE}?text=Hello%20Customer%20Care`;
const PHONE_DISPLAY = '+234 903 283 6096';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function WhatsAppButton({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}) {
  const base =
    'inline-flex items-center gap-2 font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-4';
  const variants = {
    primary:
      'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-green-500/40 px-7 py-3.5 text-base focus:ring-green-300 whatsapp-pulse',
    secondary:
      'bg-white hover:bg-gray-50 text-gray-900 shadow-md hover:shadow-lg px-7 py-3.5 text-base focus:ring-gray-200',
    outline:
      'border-2 border-white text-white hover:bg-white hover:text-blue-900 px-6 py-3 text-sm focus:ring-white/40',
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
      {children}
    </span>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-blue-950/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="bg-orange-500 rounded-lg p-1.5 group-hover:bg-orange-400 transition-colors">
            <Bus className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white text-lg leading-tight">
            Articulated<span className="text-orange-400"> Motors</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-blue-100 hover:text-white text-sm font-medium transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <WhatsAppButton href={WA_BOOK} variant="primary" className="text-sm px-5 py-2.5">
            <MessageCircle className="w-4 h-4" />
            Book on WhatsApp
          </WhatsAppButton>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-1"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-blue-950 border-t border-blue-800 px-4 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-blue-100 hover:text-white text-sm font-medium py-1.5"
            >
              {l.label}
            </a>
          ))}
          <WhatsAppButton href={WA_BOOK} variant="primary" className="w-full justify-center mt-2">
            <MessageCircle className="w-4 h-4" />
            Book on WhatsApp
          </WhatsAppButton>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <img
        src="/hero-bus.jpg"
        alt="Modern intercity buses on highway"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 hero-overlay" />

      {/* Decorative stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="animate-fade-up delay-100 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
            <MapPin className="w-4 h-4 text-orange-400" />
            Ozuabam, Arochukwu LGA, Abia State
          </div>

          <h1 className="animate-fade-up delay-200 text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-5">
            Reliable Bus Transportation
            <span className="block text-orange-400"> Across Nigeria</span>
          </h1>

          <p className="animate-fade-up delay-300 text-lg sm:text-xl text-blue-100 leading-relaxed mb-10 max-w-xl">
            Safe, Comfortable &amp; Affordable Travel with Articulated Motors — your trusted partner for interstate and intrastate journeys.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-4">
            <WhatsAppButton href={WA_BOOK} variant="primary" className="justify-center text-base px-8 py-4">
              <MessageCircle className="w-5 h-5" />
              Book a Trip on WhatsApp
            </WhatsAppButton>
            <a href={`tel:${PHONE_NUMBER}`} className="inline-flex items-center gap-2 font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-4 border-2 border-white text-white hover:bg-white hover:text-blue-900 px-6 py-3 text-sm focus:ring-white/40 justify-center">
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
          </div>

          {/* Trust badges */}
          <div className="animate-fade-up delay-500 mt-12 flex flex-wrap gap-6">
            {[
              { icon: Shield, label: 'Safety First' },
              { icon: Star, label: 'Top Rated' },
              { icon: Clock, label: 'On-Time Departures' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-blue-100 text-sm">
                <Icon className="w-4 h-4 text-orange-400" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 hover:text-white/90 transition-colors animate-bounce"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </a>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const { ref, visible } = useInView();

  const pillars = [
    { icon: Shield, title: 'Safety First', desc: 'Every vehicle passes rigorous safety checks before each journey. Your wellbeing is our top priority.' },
    { icon: Star,   title: 'Passenger Comfort', desc: 'Spacious seats, climate control, and clean interiors ensure a pleasant experience every time.' },
    { icon: Users,  title: 'Expert Drivers', desc: 'Our licensed, experienced drivers know every route and are trained to deliver a smooth, safe ride.' },
    { icon: MapPin, title: 'Nationwide Routes', desc: 'From Abia State to Lagos, Abuja, and beyond — we connect you to every corner of Nigeria.' },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className={visible ? 'animate-slide-right' : 'opacity-0'}>
            <SectionLabel>About Us</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-5">
              Connecting Nigerians <span className="text-blue-700">One Journey at a Time</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Articulated Motors is a premier bus transportation company headquartered in Ozuabam, Arochukwu LGA, Abia State. Founded on the principles of safety, reliability, and affordability, we have grown into one of southeastern Nigeria's most trusted transport brands.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Whether you're traveling for business or leisure, relocating goods, or hiring a charter bus for a group event, our well-maintained fleet and professional team ensure you arrive at your destination comfortably and on time.
            </p>
            <WhatsAppButton href={WA_BOOK} variant="primary">
              <MessageCircle className="w-4 h-4" />
              Book Your Seat Now
              <ArrowRight className="w-4 h-4" />
            </WhatsAppButton>
          </div>

          {/* Pillars grid */}
          <div className={`grid grid-cols-2 gap-4 ${visible ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-blue-50 rounded-2xl p-5 hover:bg-blue-100 transition-colors group"
              >
                <div className="bg-blue-700 text-white rounded-xl p-2.5 w-fit mb-3 group-hover:bg-orange-500 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  const { ref, visible } = useInView();

  const services = [
    {
      icon: Bus,
      title: 'Interstate Bus Travel',
      desc: 'Comfortable long-distance travel connecting Abia State to Lagos, Abuja, Port Harcourt, Enugu, and major cities across Nigeria.',
      color: 'blue',
      cta: 'Book Interstate Trip',
    },
    {
      icon: MapPin,
      title: 'Intrastate Transportation',
      desc: 'Reliable within-state travel covering towns, markets, and villages across Abia State on regular schedules.',
      color: 'orange',
      cta: 'Book Local Trip',
    },
    {
      icon: Users,
      title: 'Charter Bus Hire',
      desc: 'Hire an entire bus for group travel — family outings, school trips, church programs, and community events handled with care.',
      color: 'blue',
      cta: 'Enquire About Charter',
    },
    {
      icon: Star,
      title: 'Corporate Transport',
      desc: 'Dedicated transport solutions for organisations — staff commute, executive travel, and event shuttles at competitive rates.',
      color: 'orange',
      cta: 'Get Corporate Quote',
    },
    {
      icon: Package,
      title: 'Parcel Delivery',
      desc: 'Send packages and goods safely across routes we service. Same-day and next-day delivery options available.',
      color: 'blue',
      cta: 'Send a Parcel',
    },
    {
      icon: Headphones,
      title: 'Logistics Support',
      desc: 'End-to-end logistics support for businesses — freight coordination, cargo management, and supply chain assistance.',
      color: 'orange',
      cta: 'Discuss Logistics',
    },
  ];

  const colorMap: Record<string, { bg: string; icon: string; badge: string }> = {
    blue: {
      bg: 'bg-blue-700',
      icon: 'text-blue-700',
      badge: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    orange: {
      bg: 'bg-orange-500',
      icon: 'text-orange-500',
      badge: 'bg-orange-50 text-orange-600 border-orange-100',
    },
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-gray-50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <SectionLabel>Our Services</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Everything You Need to Move
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            From a single seat to an entire bus, from a parcel to corporate logistics — Articulated Motors has you covered.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc, color, cta }, i) => {
            const c = colorMap[color];
            return (
              <div
                key={title}
                className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col ${visible ? `animate-fade-up delay-${(i + 1) * 100}` : 'opacity-0'}`}
              >
                <div className={`${c.bg} text-white rounded-xl p-3 w-fit mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{desc}</p>
                <a
                  href={`${WA_BASE}?text=${encodeURIComponent(`I want to enquire about: ${title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold ${c.icon} hover:opacity-80 transition-opacity`}
                >
                  <MessageCircle className="w-4 h-4" />
                  {cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyUs() {
  const { ref, visible } = useInView();

  const reasons = [
    { icon: Headphones, title: '24/7 Customer Support', desc: 'Our team is always reachable on WhatsApp — day or night — to answer questions and assist with bookings.' },
    { icon: Wallet,     title: 'Affordable Pricing',   desc: 'Competitive fares with no hidden charges. We believe quality transport should be accessible to everyone.' },
    { icon: Wrench,     title: 'Well-Maintained Fleet', desc: 'Regular mechanical inspections ensure every bus in our fleet is in peak condition before departure.' },
    { icon: Timer,      title: 'On-Time Departures',   desc: 'We respect your time. Strict departure schedules and route management keep journeys predictable.' },
    { icon: MessageCircle, title: 'Easy WhatsApp Booking', desc: 'No app downloads or complicated forms. Chat with us directly on WhatsApp and confirm your seat in minutes.' },
    { icon: Shield,     title: 'Safety Certified',     desc: 'Licensed vehicles, insured passengers, and drivers trained in defensive and emergency driving techniques.' },
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-blue-950 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-800/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-14 ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="inline-block bg-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            The Articulated Motors Difference
          </h2>
          <p className="text-blue-300 max-w-xl mx-auto">
            Thousands of Nigerians choose us every month. Here is why.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={`flex gap-4 bg-blue-900/40 border border-blue-800/50 rounded-2xl p-6 hover:bg-blue-900/60 transition-colors ${visible ? `animate-fade-up delay-${(i + 1) * 100}` : 'opacity-0'}`}
            >
              <div className="bg-orange-500 text-white rounded-xl p-2.5 h-fit flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1.5">{title}</h3>
                <p className="text-blue-300 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WhatsApp CTA ─────────────────────────────────────────────────────────────
function WhatsAppCTA() {
  const { ref, visible } = useInView();

  const actions = [
    {
      href: WA_CARE,
      icon: MessageCircle,
      title: 'Chat with Customer Care',
      desc: 'Have a question? We\'re online and ready to help right now.',
      bg: 'bg-white',
      text: 'text-gray-900',
      btn: 'bg-gray-900 text-white hover:bg-gray-800',
    },
    {
      href: WA_AGENT,
      icon: Users,
      title: 'Talk to an Agent',
      desc: 'Our travel agents can help you plan the perfect route and find the best fares.',
      bg: 'bg-orange-500',
      text: 'text-white',
      btn: 'bg-white text-orange-600 hover:bg-orange-50',
    },
    {
      href: WA_BOOK,
      icon: Bus,
      title: 'Book a Bus Now',
      desc: 'Ready to travel? Reserve your seat in under 2 minutes via WhatsApp.',
      bg: 'bg-green-500',
      text: 'text-white',
      btn: 'bg-white text-green-700 hover:bg-green-50',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <SectionLabel>Book Instantly</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            One Tap Away on WhatsApp
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            No app, no sign-up, no stress. Just tap a button and chat with our team to get moving.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {actions.map(({ href, icon: Icon, title, desc, bg, text, btn }, i) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${bg} rounded-2xl p-7 flex flex-col items-center text-center hover:scale-105 transition-transform duration-200 shadow-lg group ${visible ? `animate-fade-up delay-${(i + 1) * 200}` : 'opacity-0'}`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${btn} transition-colors`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className={`font-bold text-lg mb-2 ${text}`}>{title}</h3>
              <p className={`text-sm leading-relaxed mb-5 ${text === 'text-white' ? 'opacity-80' : 'text-gray-500'}`}>{desc}</p>
              <span className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full ${btn} transition-colors`}>
                Open WhatsApp
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const { ref, visible } = useInView();

  const reviews = [
    {
      name: 'Chidinma Okafor',
      location: 'Aba to Lagos',
      rating: 5,
      text: 'I travel to Lagos for business regularly and Articulated Motors has become my go-to. The bus was spotless, the driver was professional, and we arrived ahead of schedule. Highly recommended!',
      initials: 'CO',
    },
    {
      name: 'Emeka Nwosu',
      location: 'Umuahia to Enugu',
      rating: 5,
      text: 'Booking on WhatsApp was the easiest part. They confirmed my seat in minutes, the pickup was on time, and the journey was smooth. Customer care even followed up to make sure I arrived safely.',
      initials: 'EN',
    },
    {
      name: 'Ngozi Eze',
      location: 'Ohafia to Port Harcourt',
      rating: 5,
      text: 'I hired a charter bus for my son\'s naming ceremony and the entire experience was seamless. The bus was large, air-conditioned, and the driver was very patient with our group. Will use again!',
      initials: 'NE',
    },
    {
      name: 'Kelechi Amadi',
      location: 'Arochukwu to Owerri',
      rating: 5,
      text: 'Affordable and reliable! I have used many transport companies but Articulated Motors stands out. Clean buses, honest pricing, and they actually depart when they say they will.',
      initials: 'KA',
    },
    {
      name: 'Adaobi Nwogu',
      location: 'Ozuabam to Abuja',
      rating: 5,
      text: 'The long Abuja journey was surprisingly comfortable. We had a mid-trip stop, the driver was courteous, and my luggage arrived intact. Great company from Abia State!',
      initials: 'AN',
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <SectionLabel>Customer Reviews</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            What Our Passengers Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Real feedback from real travelers who chose Articulated Motors.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(({ name, location, rating, text, initials }, i) => (
            <div
              key={name}
              className={`bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow ${visible ? `animate-fade-up delay-${(i + 1) * 100}` : 'opacity-0'}`}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-orange-400 text-orange-400" />
                ))}
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-5">"{text}"</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{name}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{location}
                  </p>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500 ml-auto flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const { ref, visible } = useInView();
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I book a bus seat?',
      a: 'Booking is simple! Tap the "Book on WhatsApp" button anywhere on this page, chat with our team, and they\'ll confirm your seat within minutes. No app downloads needed.',
    },
    {
      q: 'What are your main routes?',
      a: 'We operate interstate routes from Abia State to Lagos, Abuja, Port Harcourt, Enugu, and other major cities. We also handle intrastate travel within Abia State daily.',
    },
    {
      q: 'How much does it cost to book?',
      a: 'Prices vary based on the route and distance. Generally, interstate fares range from ₦3,000–₦15,000 depending on your destination. Chat with us for specific quotes.',
    },
    {
      q: 'Are your buses air-conditioned?',
      a: 'Yes! All our buses have working air conditioning, comfortable seats with good legroom, and clean interiors. We prioritize passenger comfort on every journey.',
    },
    {
      q: 'What if I need to cancel my booking?',
      a: 'Cancellations can be done via WhatsApp. Contact our customer care team, and depending on the timing, you may be eligible for a refund or credit for a future trip.',
    },
    {
      q: 'Do you offer charter bus services?',
      a: 'Absolutely! We offer charter services for family outings, group travel, corporate events, school trips, and more. Contact us via WhatsApp with your group size and date.',
    },
    {
      q: 'Can I send parcels with Articulated Motors?',
      a: 'Yes, we offer same-day and next-day parcel delivery services on most routes. Tap "Book on WhatsApp" and select the "Parcel Delivery" option to get started.',
    },
    {
      q: 'What are your operating hours?',
      a: 'Our customer care team is available 24/7 on WhatsApp to answer questions and take bookings. Bus departures run throughout the day depending on your route.',
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <SectionLabel>Frequently Asked Questions</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Your Questions, Answered
          </h2>
          <p className="text-gray-500">
            Can't find what you're looking for? Chat with us on WhatsApp.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 ${
                open === i ? 'bg-blue-50 border-blue-300' : 'bg-white hover:border-gray-300'
              } ${visible ? `animate-fade-up delay-${(i + 1) * 75}` : 'opacity-0'}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start gap-4 p-5 text-left hover:bg-blue-50/50 transition-colors"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-bold mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base">{faq.q}</h3>
                </div>
                <Plus
                  className={`w-5 h-5 text-blue-700 flex-shrink-0 transition-transform duration-300 ${
                    open === i ? 'rotate-45' : ''
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 border-t border-gray-200 animate-fade-in">
                  <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={`mt-12 text-center ${visible ? 'animate-fade-up delay-600' : 'opacity-0'}`}>
          <p className="text-gray-500 mb-4">Still have a question?</p>
          <WhatsAppButton href={WA_CARE} variant="primary">
            <MessageCircle className="w-4 h-4" />
            Chat with Customer Care
            <ArrowRight className="w-4 h-4" />
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-blue-950 text-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-orange-500 rounded-lg p-1.5">
                <Bus className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-lg">
                Articulated<span className="text-orange-400"> Motors</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-sm">
              Nigeria's trusted bus transportation partner. Safe, comfortable, and affordable travel across the nation from the heart of Abia State.
            </p>
            <div className="flex items-start gap-2 text-sm mb-2">
              <MapPin className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
              <span>Ozuabam, Arochukwu LGA, Abia State, Nigeria</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-orange-400" />
              <a href={WA_BASE} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['#about', '#services', '#why-us', '#testimonials', '#faq'].map((href) => (
                <li key={href}>
                  <a href={href} className="hover:text-white transition-colors capitalize">
                    {href.replace('#', '')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp CTAs */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Book Now</h4>
            <div className="space-y-3">
              <a
                href={WA_BOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors w-full justify-center"
              >
                <Bus className="w-4 h-4" />
                Book a Bus
              </a>
              <a
                href={`tel:${CALL_NUMBER}`}
                className="flex items-center gap-2 border border-blue-700 hover:border-blue-500 text-blue-200 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors w-full justify-center"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Social placeholders */}
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-blue-500 mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-lg bg-blue-900 hover:bg-blue-800 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4 text-blue-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-blue-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-500">
          <p>&copy; {year} Articulated Motors. All rights reserved.</p>
          <p>Ozuabam, Arochukwu LGA, Abia State, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp Fab ────────────────────────────────────────────────────
function FloatingWA() {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return show ? (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Call button - appears when expanded */}
      {expanded && (
        <a
          href={`tel:${CALL_NUMBER}`}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 animate-fade-in"
          aria-label="Call now"
        >
          <Phone className="w-5 h-5" />
          <span className="hidden sm:inline">Call Now</span>
        </a>
      )}

      {/* WhatsApp button */}
      <a
        href={WA_BOOK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-4 py-3 rounded-full shadow-2xl transition-all duration-200 whatsapp-pulse hover:scale-105"
        aria-label="Book on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Book on WhatsApp</span>
      </a>

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-center w-14 h-14 bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Show more options"
      >
        <Phone className="w-6 h-6" />
      </button>
    </div>
  ) : null;
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <WhatsAppCTA />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
}
