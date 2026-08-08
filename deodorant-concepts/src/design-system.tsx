import { motion, AnimatePresence } from 'framer-motion';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode, type ElementType } from 'react';
import { X } from 'lucide-react';

export const transitions = {
  fast: { duration: 0.15 },
  normal: { duration: 0.25 },
  slow: { duration: 0.35 },
  spring: { type: 'spring', stiffness: 300, damping: 25 },
  springSoft: { type: 'spring', stiffness: 200, damping: 20 },
  springBouncy: { type: 'spring', stiffness: 400, damping: 15 },
} as const;

export const easings = {
  easeOut: [0.25, 0.46, 0.45, 0.94] as const,
  easeIn: [0.55, 0.06, 0.68, 0.19] as const,
  easeInOut: [0.42, 0, 0.58, 1] as const,
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const;

export const colors = {
  primary: {
    50: '#fef7ee',
    100: '#fdedd6',
    200: '#fad9ac',
    300: '#f6bf78',
    400: '#f19d43',
    500: '#ed7d1a',
    600: '#e05f0f',
    700: '#bc420d',
    800: '#963412',
    900: '#792d11',
  },
  dark: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
} as const;

export const borderRadius = {
  none: '0',
  sm: '0.25rem',
  base: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
} as const;

export const zIndices = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
  toast: 1700,
} as const;

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', loading = false, iconLeft, iconRight, fullWidth = false, className = '', disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variantStyles = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm',
      secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700',
      ghost: 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
      outline: 'border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800',
    };
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-5 py-2.5 text-base gap-2',
      lg: 'px-7 py-3.5 text-lg gap-2.5',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        disabled={disabled || loading}
        {...(props as unknown as Record<string, unknown>)}
      >
        {loading && (
          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {!loading && iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
        {children}
        {!loading && iconRight && <span className="flex-shrink-0">{iconRight}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

interface CardProps extends ComponentPropsWithoutRef<'article'> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card = forwardRef<HTMLElement, CardProps>(
  ({ children, variant = 'default', padding = 'md', hover = false, className = '', ...props }, ref) => {
    const variantStyles = {
      default: 'bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-800',
      elevated: 'bg-white dark:bg-dark-900 shadow-lg',
      outlined: 'bg-transparent border-2 border-dark-200 dark:border-dark-700',
    };
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const Component: ElementType = hover ? motion.article : 'article';
    const motionProps = hover ? { whileHover: { y: -4, boxShadow: shadows.xl } } : {};

    return (
      <Component ref={ref} className={`rounded-2xl ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`} {...motionProps} {...props}>
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-200 bg-white dark:bg-dark-900 text-dark-900 dark:text-white placeholder:text-dark-400 dark:placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-slate-100 dark:disabled:bg-dark-800 disabled:cursor-not-allowed ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-dark-200 dark:border-dark-700 hover:border-dark-300 dark:hover:border-dark-600'
          } ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-dark-500 dark:text-dark-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', size = 'md', dot = false, className = '', ...props }, ref) => {
    const variantStyles = {
      default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
      primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
      success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
      warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
      danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    };
    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
    };
    return (
      <span ref={ref} className={`inline-flex items-center gap-1.5 rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
        {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, size = 'lg', className = '', ...props }, ref) => {
    const sizeStyles = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-[90rem]',
      full: 'max-w-full',
    };
    return (
      <div ref={ref} className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeStyles[size]} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'none' | 'subtle' | 'primary' | 'dark';
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, size = 'lg', background = 'none', className = '', ...props }, ref) => {
    const backgroundStyles = {
      none: '',
      subtle: 'bg-slate-50 dark:bg-dark-900/50',
      primary: 'bg-gradient-to-b from-primary-50 to-white dark:from-primary-900/20 dark:to-dark-950',
      dark: 'bg-dark-900 dark:bg-dark-950',
    };
    return (
      <section ref={ref} className={`py-12 sm:py-16 lg:py-20 xl:py-24 ${backgroundStyles[background]} ${className}`} {...props}>
        <Container size={size}>{children}</Container>
      </section>
    );
  }
);

Section.displayName = 'Section';

export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

export function LiveRegion({ message, politeness = 'polite' }: { message: string; politeness?: 'polite' | 'assertive' }) {
  return (
    <div aria-live={politeness} aria-atomic="true" className="sr-only">
      {message}
    </div>
  );
}

interface SwitchProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  id?: string;
}

export function Switch({ checked, onChange, label, description, disabled, id }: SwitchProps) {
  const switchId = id || `switch-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <label htmlFor={switchId} className="block font-medium text-dark-900 dark:text-white">
          {label}
        </label>
        {description && <p className="text-sm text-dark-500 dark:text-dark-400 mt-0.5">{description}</p>}
      </div>
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-7 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
          checked ? 'bg-primary-500' : 'bg-slate-300 dark:bg-dark-600'
        }`}
      >
        <motion.span className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md" animate={{ x: checked ? 20 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
      </button>
    </div>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
  color?: string;
}

export function ProgressBar({ value, max = 100, label, className = '', color }: ProgressBarProps) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={`w-full ${className}`} role="progressbar" aria-valuenow={Math.round(percent)} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-dark-700 overflow-hidden">
        <motion.div className={`h-full rounded-full ${color || 'bg-gradient-to-r from-primary-500 to-pink-500'}`} animate={{ width: `${percent}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
      </div>
    </div>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  labelledById?: string;
}

export function Modal({ open, onClose, title, children, labelledById }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[1300] flex items-center justify-center p-4" initial="hidden" animate="visible" exit="hidden">
          <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: 0.2 }} aria-hidden="true" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledById}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-dark-900 rounded-2xl border border-dark-200 dark:border-dark-700 shadow-2xl"
            variants={{ hidden: { opacity: 0, y: 24, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1 } }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <div className="flex items-start justify-between p-5 border-b border-dark-200 dark:border-dark-700">
              <h2 id={labelledById} className="text-xl font-bold text-dark-900 dark:text-white">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mt-1 -mr-1 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 text-dark-600 dark:text-dark-300" />
              </button>
            </div>
            <div className="p-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface TabsProps<T extends string> {
  tabs: { id: T; label: string; icon?: ReactNode }[];
  active: T;
  onChange: (id: T) => void;
  ariaLabel?: string;
}

export function Tabs<T extends string>({ tabs, active, onChange, ariaLabel }: TabsProps<T>) {
  return (
    <div role="tablist" aria-label={ariaLabel} className="inline-flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-dark-800 rounded-xl border border-dark-200 dark:border-dark-700">
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            role="tab"
            id={`${tab.id}-tab`}
            aria-selected={isActive}
            aria-controls={`${tab.id}-panel`}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
              isActive ? 'bg-white dark:bg-dark-900 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-dark-600 dark:text-dark-300 hover:text-dark-900 dark:hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
