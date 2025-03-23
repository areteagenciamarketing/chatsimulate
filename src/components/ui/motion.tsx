
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedElementProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: 
    | "fade-in" 
    | "slide-up" 
    | "slide-down" 
    | "scale-in" 
    | "float";
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  animation = "fade-in",
  delay = 0,
  duration = 400,
  className,
  children,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  return (
    <div
      ref={ref}
      className={cn(
        isVisible ? `animate-${animation}` : "opacity-0",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const FadeIn = ({
  children,
  delay = 0,
  className,
  ...props
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <AnimatedElement 
      animation="fade-in" 
      delay={delay} 
      className={className}
      {...props}
    >
      {children}
    </AnimatedElement>
  );
};

export const SlideUp = ({
  children,
  delay = 0,
  className,
  ...props
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <AnimatedElement 
      animation="slide-up" 
      delay={delay} 
      className={className}
      {...props}
    >
      {children}
    </AnimatedElement>
  );
};

export const SlideDown = ({
  children,
  delay = 0,
  className,
  ...props
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <AnimatedElement 
      animation="slide-down" 
      delay={delay} 
      className={className}
      {...props}
    >
      {children}
    </AnimatedElement>
  );
};

export const ScaleIn = ({
  children,
  delay = 0,
  className,
  ...props
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <AnimatedElement 
      animation="scale-in" 
      delay={delay} 
      className={className}
      {...props}
    >
      {children}
    </AnimatedElement>
  );
};

export const Float = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div 
      className={cn("animate-float", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const SequentialFadeIn = ({
  children,
  delay = 100,
  className,
  itemClassName,
  ...props
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  itemClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={className} {...props}>
      {React.Children.map(children, (child, index) => (
        <FadeIn delay={index * delay} className={itemClassName}>
          {child}
        </FadeIn>
      ))}
    </div>
  );
};
