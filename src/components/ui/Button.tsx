import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glow';
  icon?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden isolate";
  
  const variants = {
    primary: "bg-white text-black hover:scale-105 hover:bg-gray-100 shadow-lg",
    
    // Updated Secondary: Gradient + Glow + Inner Shine
    secondary: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/50 hover:scale-[1.02] border border-white/10",
    
    // Updated Outline: Glassmorphism effect
    outline: "border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-400 dark:hover:border-white/30 transition-all",
    
    glow: "bg-black text-white border border-madn-accent shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.8)] hover:bg-madn-accent hover:border-transparent"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Shine effect for secondary button */}
      {variant === 'secondary' && (
        <span className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
      )}

      <span className="relative z-10 flex items-center">
        {children}
        {icon && (
          <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </button>
  );
};

export default Button;


