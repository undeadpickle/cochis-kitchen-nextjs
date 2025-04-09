import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' }
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Determine which section is currently in view
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';

      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-10 left-0 right-0 z-[900] transition-all duration-300 border-b',
          isScrolled
            ? 'bg-cochi-red shadow-lg border-cochi-gold/20'
            : 'bg-cochi-red py-4 border-cochi-red'
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="#home" className="flex items-center" aria-label="Cochi's Kitchen">
            <img
              src="/images/cochis_kitchen_logo.svg"
              alt="Cochi's Kitchen Logo"
              className="h-12 md:h-14"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'nav-link font-medium tracking-wide text-sm',
                  activeSection === item.href.replace('#', '')
                    ? 'active text-cochi-gold font-bold'
                    : 'text-white hover:text-cochi-gold'
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 bg-cochi-red-light/60 hover:bg-cochi-red-light rounded-full transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation - rendered outside the header */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-gradient-to-b from-cochi-red to-cochi-red-dark bg-opacity-95 z-[1000] md:hidden flex flex-col">
          {/* Header area - mirrors the main header */}
          <div className={cn(
            'w-full transition-all duration-300 border-b',
            isScrolled
              ? 'shadow-lg border-cochi-gold/20'
              : 'py-4 border-cochi-red'
          )}>
            <div className="container mx-auto px-4 flex justify-between items-center">
              <a href="#home" className="flex items-center" aria-label="Cochi's Kitchen">
                <img
                  src="/images/cochis_kitchen_logo.svg"
                  alt="Cochi's Kitchen Logo"
                  className="h-12 md:h-14"
                />
              </a>

              {/* Close button in the same position as hamburger */}
              <button
                className="text-white p-2 bg-cochi-red-light/60 hover:bg-cochi-red-light rounded-full transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Menu content */}
          <div className="flex-1 flex flex-col justify-center items-center space-y-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "text-xl font-medium transition-all duration-200 px-4 py-2 rounded-md",
                  activeSection === item.href.replace('#', '')
                    ? "text-cochi-gold border-b-2 border-cochi-gold font-bold"
                    : "text-white hover:text-cochi-gold hover:bg-cochi-red-light/40"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
