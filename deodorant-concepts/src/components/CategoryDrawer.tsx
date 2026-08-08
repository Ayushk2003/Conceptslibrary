import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Layers } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string | null;
  onCategoryClick: (category: string) => void;
}

function CategoryDrawer({ isOpen, onClose, selectedCategory, onCategoryClick }: CategoryDrawerProps) {
  const categories = ['deodorant'];
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const initialFocus = panelRef.current?.querySelector<HTMLElement>('[data-drawer-close]');
    initialFocus?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md lg:max-w-xl bg-white dark:bg-dark-900 shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Categories"
          >
            <div className="flex items-center justify-between p-4 lg:p-6 border-b border-dark-200 dark:border-dark-800">
              <h2 className="text-lg lg:text-xl font-bold text-dark-900 dark:text-white">Categories</h2>
              <button
                data-drawer-close
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label="Close drawer"
              >
                <X className="w-6 h-6 text-dark-600 dark:text-dark-300" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 lg:p-6">
              <div className="space-y-4">
                <h3 className="text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider mb-3">Product Categories</h3>
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => onCategoryClick(category)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                      selectedCategory === category
                        ? 'bg-primary-50 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-700'
                        : 'hover:bg-gray-100 dark:hover:bg-dark-800 border border-dark-200 dark:border-dark-700'
                    }`}
                  >
                    <Layers className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                    <span className="font-medium text-dark-900 dark:text-white capitalize">{category}</span>
                    <ChevronRight className="w-4 h-4 text-dark-400 ml-auto" />
                  </motion.button>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-dark-200 dark:border-dark-800">
                <p className="text-sm text-dark-500 dark:text-dark-400 text-center mb-4">Explore design concepts</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'storefront', name: 'Storefront', icon: '🛍️', color: 'from-primary-500 to-primary-600' },
                    { id: '3d', name: '3D Experience', icon: '🎮', color: 'from-purple-500 to-pink-500' },
                    { id: 'storytelling', name: 'Storytelling', icon: '📖', color: 'from-teal-500 to-cyan-500' },
                    { id: 'modern', name: 'Modern Minimal', icon: '✨', color: 'from-slate-700 to-slate-900' },
                  ].map((concept) => (
                    <button
                      key={concept.id}
                      onClick={() => onCategoryClick(concept.id)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dark-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-800 transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${concept.color} flex items-center justify-center flex-shrink-0 text-xl`}>
                        {concept.icon}
                      </div>
                      <span className="font-medium text-dark-900 dark:text-white text-sm">{concept.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 lg:p-6 border-t border-dark-200 dark:border-dark-800">
              <p className="text-xs text-center text-dark-500 dark:text-dark-400">
                Press Esc to close
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CategoryDrawer;
