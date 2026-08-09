import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { ChevronDown, Menu, Sparkles, Box, BookOpen, Layers, Sun, Moon, ArrowLeft, Check, Zap, Shield, Smartphone, Paintbrush, Code2, Gem } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ConceptCard from './components/ConceptCard';
import CategoryDrawer from './components/CategoryDrawer';
const StorefrontConcept = lazy(() => import('./concepts/StorefrontConcept'));
const ThreeDConcept = lazy(() => import('./concepts/ThreeDConcept'));
const StorytellingConcept = lazy(() => import('./concepts/StorytellingConcept'));
const ModernConcept = lazy(() => import('./concepts/ModernConcept'));
import './App.css';

const madyLabsUrl = import.meta.env.VITE_MADY_LABS_URL || '/';

type ConceptType = 'storefront' | '3d' | 'storytelling' | 'modern' | null;
type ViewMode = 'hub' | 'concept';

interface Concept {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  shortDesc: string;
  color: string;
  bgColor: string;
  tags: string[];
}

const concepts: Concept[] = [
  {
    id: 'modern',
    name: 'Modern Minimal',
    icon: Sparkles,
    description: 'Clean typography, generous whitespace, subtle animations. Inspired by Apple, Linear, Vercel. Ultra-fast, accessible, zero friction.',
    shortDesc: 'Clean, fast, accessible',
    color: 'from-slate-700 to-slate-900',
    bgColor: 'bg-slate-50 dark:bg-slate-900/20',
    tags: ['Minimal', 'Fast', 'Accessible', 'Premium'],
  },
  {
    id: '3d',
    name: 'Interactive 3D',
    icon: Box,
    description: 'Immersive WebGL hero with interactive 3D models, smooth camera moves, depth, lighting, mouse/touch interactivity. Optimized with fallbacks.',
    shortDesc: 'WebGL, immersive, performant',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    tags: ['WebGL', 'Three.js', 'Interactive', '60fps'],
  },
  {
    id: 'storytelling',
    name: 'Storytelling',
    icon: BookOpen,
    description: 'Scroll-driven chapters with smooth transitions, parallax, progress indicator. Each scroll reveals a new section. Cinematic but usable.',
    shortDesc: 'Scroll-driven, cinematic, narrative',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    tags: ['Scroll', 'Parallax', 'Chapters', 'Narrative'],
  },
  {
    id: 'storefront',
    name: 'Immersive Storefront',
    icon: Layers,
    description: 'Luxury showroom feel with interactive shelves, large concept cards, horizontal carousels, filters, quick view, compare, favorites.',
    shortDesc: 'E-commerce, filters, luxury feel',
    color: 'from-primary-500 to-primary-600',
    bgColor: 'bg-primary-50 dark:bg-primary-900/20',
    tags: ['E-commerce', 'Filters', 'Carousel', 'Luxury'],
  },
];

const sharedBenefits = [
  { icon: Zap, title: 'Performance First', desc: 'Optimized bundles, lazy loading, 60fps animations' },
  { icon: Shield, title: 'Accessibility', desc: 'WCAG 2.1 AA, keyboard nav, screen readers' },
  { icon: Smartphone, title: 'Responsive', desc: 'Mobile-first, works beautifully on all devices' },
  { icon: Paintbrush, title: 'Design System', desc: 'Consistent tokens, spacing, component library' },
  { icon: Sun, title: 'Dark Mode', desc: 'System-aware, persistent, instant switching' },
  { icon: Code2, title: 'Developer Experience', desc: 'TypeScript, ESLint, Prettier, Vitest ready' },
];

const darkModeKey = 'concept-showcase-dark-v2';

function getInitialDark(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = window.localStorage.getItem(darkModeKey);
  if (stored !== null) return stored === 'true';
  return false;
}

function Header({
  onMenuClick,
  onCategoryClick,
  onThemeToggle,
  isDark,
  scrolled,
  viewMode,
  onBack,
}: {
  onMenuClick: () => void;
  onCategoryClick: () => void;
  onThemeToggle: () => void;
  isDark: boolean;
  scrolled: boolean;
  viewMode: ViewMode;
  onBack: () => void;
}) {
  if (viewMode === 'concept') {
    return (
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Concept navigation">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="Back to concepts"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">Concepts</span>
            </button>

            <div className="flex items-center gap-3">
              <a
                href={madyLabsUrl}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-dark-600 transition-colors hover:bg-gray-100 hover:text-primary-600 dark:text-dark-300 dark:hover:bg-dark-800 dark:hover:text-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label="Back to MADY labs"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">MADY labs</span>
              </a>
              <button
                onClick={onThemeToggle}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun className="w-5 h-5 text-dark-300" /> : <Moon className="w-5 h-5 text-dark-600" />}
              </button>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-8">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-dark-900 dark:text-white" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <Gem className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-dark-900 dark:text-white hidden sm:block">
                Concepts <span className="font-normal text-dark-500 dark:text-dark-400">by MADY</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-6">
            <button
              onClick={onCategoryClick}
              className="relative hidden px-4 py-2 text-sm font-medium text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors lg:flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
              aria-label="Open categories"
            >
              <span>Concepts</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <a
              href={madyLabsUrl}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-dark-600 transition-colors hover:bg-gray-100 hover:text-primary-600 dark:text-dark-300 dark:hover:bg-dark-800 dark:hover:text-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="Back to MADY labs"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">MADY labs</span>
            </a>

            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5 text-dark-300" /> : <Moon className="w-5 h-5 text-dark-600" />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-10 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-30">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-400/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-purple-400/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-pink-400/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          Designs for your ease
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark-900 dark:text-white tracking-tight mb-6 text-balance">
          Experience the Web
          <br />
          <span className="text-gradient bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500">
            Four Ways
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto leading-relaxed">
          A premium interactive gallery of four distinct website experience concepts. Explore each direction,
          compare the craft, and choose the one that fits your brand.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {['Framer Motion', 'Three.js', 'GSAP', 'Tailwind', 'Responsive'].map((tag) => (
            <span key={tag} className="px-3 py-1.5 text-sm font-medium rounded-full bg-white/70 dark:bg-dark-800/70 border border-dark-200 dark:border-dark-700 text-dark-600 dark:text-dark-300">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function HubView({ concepts, onConceptClick }: { concepts: Concept[]; onConceptClick: (id: string) => void }) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Hero />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {concepts.map((concept, index) => (
          <ConceptCard
            key={concept.id}
            concept={concept}
            index={index}
            onClick={() => onConceptClick(concept.id)}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-20 lg:mt-24"
      >
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest">Shared Foundations</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mt-3 mb-4">
            Every concept, built on the same <span className="text-gradient bg-gradient-to-r from-primary-500 to-purple-500">premium base</span>
          </h2>
          <p className="text-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
            Fully responsive, accessible, performant, and theme-aware by default — so your choice is about direction, not quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sharedBenefits.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
              className="group flex items-start gap-4 p-6 bg-white dark:bg-dark-900 rounded-2xl border border-dark-200 dark:border-dark-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg hover:shadow-primary-500/5 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <feature.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-900 dark:text-white mb-1 flex items-center gap-2">
                  {feature.title}
                  <Check className="w-4 h-4 text-emerald-500" />
                </h3>
                <p className="text-dark-600 dark:text-dark-300 text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<ConceptType>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('hub');
  const [isDark, setIsDark] = useState<boolean>(getInitialDark);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.replace('#/', '') as ConceptType;
      if (id && concepts.some((concept) => concept.id === id)) {
        setSelectedConcept(id);
        setViewMode('concept');
      } else {
        setSelectedConcept(null);
        setViewMode('hub');
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    window.localStorage.setItem(darkModeKey, String(isDark));
  }, [isDark]);

  const handleConceptClick = useCallback((conceptId: string) => {
    setSelectedConcept(conceptId as ConceptType);
    setViewMode('concept');
    setIsDrawerOpen(false);
    window.history.pushState(null, '', `#/${conceptId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToHub = useCallback(() => {
    setSelectedConcept(null);
    setViewMode('hub');
    window.history.pushState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCategoryClick = useCallback((category: string) => {
    setSelectedCategory(category);
    setIsDrawerOpen(false);
    if (category !== 'deodorant') {
      handleConceptClick(category);
    }
  }, [handleConceptClick]);

  const renderConcept = () => {
    switch (selectedConcept) {
      case 'storefront':
        return <StorefrontConcept onBack={handleBackToHub} isDark={isDark} />;
      case '3d':
        return <ThreeDConcept onBack={handleBackToHub} isDark={isDark} />;
      case 'storytelling':
        return <StorytellingConcept onBack={handleBackToHub} isDark={isDark} />;
      case 'modern':
        return <ModernConcept onBack={handleBackToHub} isDark={isDark} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-dark-950 ${isDark ? 'dark' : ''}`}>
      {viewMode === 'hub' && <Header
        onMenuClick={() => setIsDrawerOpen(true)}
        onCategoryClick={() => setIsDrawerOpen(true)}
        onThemeToggle={() => setIsDark((d) => !d)}
        isDark={isDark}
        scrolled={scrolled}
        viewMode={viewMode}
        onBack={handleBackToHub}
      />}

      <CategoryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />

      <div className={`${viewMode === 'hub' ? 'pt-16 lg:pt-20' : ''} min-h-screen`}>
        <AnimatePresence mode="wait">
          {viewMode === 'hub' ? (
            <motion.div
              key="hub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HubView concepts={concepts} onConceptClick={handleConceptClick} />
            </motion.div>
          ) : (
            <motion.div
              key={selectedConcept}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Suspense fallback={<div className="min-h-[70vh] grid place-items-center" role="status"><div className="flex items-center gap-3 text-dark-500 dark:text-dark-300"><span className="h-5 w-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />Loading experience…</div></div>}>
                {renderConcept()}
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {viewMode === 'hub' && (
        <footer className="border-t border-dark-200 dark:border-dark-800 py-8 px-4">
          <div className="max-w-7xl mx-auto text-center text-sm text-dark-500 dark:text-dark-400">
            <p>Concepts by MADY &copy; 2026 — Designs for your ease.</p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
