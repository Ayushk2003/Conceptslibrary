import { motion } from 'framer-motion';
import { ExternalLink, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useRef, type MouseEvent } from 'react';

interface ConceptCardProps {
  concept: {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    shortDesc: string;
    tags: string[];
    color: string;
    bgColor: string;
  };
  index: number;
  onClick: () => void;
}

function ConceptCard({ concept, index, onClick }: ConceptCardProps) {
  const Icon = concept.icon;
  const cardRef = useRef<HTMLElement>(null);

  const handlePointerMove = (e: MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      onPointerMove={handlePointerMove}
      onClick={onClick}
      className={`spotlight-card group relative overflow-hidden rounded-3xl p-6 lg:p-8 ${concept.bgColor} border border-dark-200 dark:border-dark-700 cursor-pointer transition-all duration-300 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-2xl hover:shadow-primary-500/10`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      aria-label={`View ${concept.name} concept`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute top-5 right-5 flex items-center gap-2">
        <span className="text-xs font-mono text-dark-400 dark:text-dark-500">{String(index + 1).padStart(2, '0')}</span>
        <div className="w-8 h-8 rounded-full bg-white/60 dark:bg-dark-800/60 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 text-dark-700 dark:text-white" />
        </div>
      </div>

      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${concept.color} flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>

        <h3 className="text-xl lg:text-2xl font-bold text-dark-900 dark:text-white mb-2">
          {concept.name}
        </h3>

        <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-3">
          {concept.shortDesc}
        </p>

        <p className="text-dark-600 dark:text-dark-300 mb-6 line-clamp-3">
          {concept.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {concept.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/70 dark:bg-dark-800/70 border border-dark-200 dark:border-dark-700 text-dark-600 dark:text-dark-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-dark-200 dark:border-dark-700">
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1 group-hover:gap-2 transition-all">
            Enter Concept
            <ChevronRight className="w-4 h-4" />
          </span>
          <ExternalLink className="w-4 h-4 text-dark-400 group-hover:text-primary-500 transition-colors" aria-hidden="true" />
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${concept.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
    </motion.article>
  );
}

export default ConceptCard;
