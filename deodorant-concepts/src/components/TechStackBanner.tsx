import { motion } from 'framer-motion';
import { Code, Zap } from 'lucide-react';

const techStacks = [
  { name: 'React 18', icon: '⚛️', category: 'Framework', color: 'bg-blue-500' },
  { name: 'TypeScript', icon: '📘', category: 'Language', color: 'bg-blue-600' },
  { name: 'Vite', icon: '⚡', category: 'Build Tool', color: 'bg-yellow-500' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'Styling', color: 'bg-cyan-500' },
  { name: 'Framer Motion', icon: '🎭', category: 'Animation', color: 'bg-pink-500' },
  { name: 'Three.js', icon: '🎮', category: '3D Graphics', color: 'bg-purple-500' },
  { name: 'GSAP', icon: '📜', category: 'Animation', color: 'bg-green-500' },
  { name: 'ESLint', icon: '🔍', category: 'Linting', color: 'bg-violet-500' },
  { name: 'Prettier', icon: '✨', category: 'Formatting', color: 'bg-orange-500' },
  { name: 'Vitest', icon: '🧪', category: 'Testing', color: 'bg-red-500' },
  { name: 'PWA Ready', icon: '📱', category: 'Features', color: 'bg-indigo-500' },
  { name: 'SEO Optimized', icon: '🔍', category: 'Features', color: 'bg-teal-500' },
];

function TechStackBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 py-3">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative flex items-center gap-8 px-4">
        <div className="flex items-center gap-2 text-white/90 font-medium text-sm whitespace-nowrap">
          <Zap className="w-4 h-4" />
          <span>Tech Stack:</span>
        </div>
        <div className="flex items-center gap-6 whitespace-nowrap animate-marquee">
          {techStacks.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${tech.color}`}>
                {tech.icon}
              </span>
              <span>{tech.name}</span>
              <Code className="w-3 h-3 opacity-50" />
            </motion.div>
          ))}
          {techStacks.map((tech, i) => (
            <motion.div
              key={`${tech.name}-dup`}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${tech.color}`}>
                {tech.icon}
              </span>
              <span>{tech.name}</span>
              <Code className="w-3 h-3 opacity-50" />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary-600 via-purple-600 to-pink-600 to-transparent pointer-events-none" />
    </div>
  );
}

export default TechStackBanner;