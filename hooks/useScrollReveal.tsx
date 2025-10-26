'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

export function ScrollRevealContainer({ 
  children, 
  className = '', 
  animation = 'fadeInUp',
  delay = 0 
}: {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn';
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal();

  const getAnimationClass = () => {
    const baseClass = 'transition-all duration-1000 ease-out';
    const delayClass = delay > 0 ? `delay-${delay}` : '';
    
    if (!isVisible) {
      switch (animation) {
        case 'fadeInUp':
          return `${baseClass} ${delayClass} opacity-0 translate-y-10`;
        case 'fadeInLeft':
          return `${baseClass} ${delayClass} opacity-0 -translate-x-10`;
        case 'fadeInRight':
          return `${baseClass} ${delayClass} opacity-0 translate-x-10`;
        case 'scaleIn':
          return `${baseClass} ${delayClass} opacity-0 scale-95`;
        default:
          return `${baseClass} ${delayClass} opacity-0`;
      }
    }
    
    return `${baseClass} ${delayClass} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div ref={ref} className={`${getAnimationClass()} ${className}`}>
      {children}
    </div>
  );
}