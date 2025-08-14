import { useRef, useState, useEffect } from 'react';
import type { FC } from 'react';

// Custom hook for detecting if an element is in the viewport
const useOnScreen = (options: IntersectionObserverInit) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible] as const;
};

// FadeIn component for scroll animations
const FadeIn: FC<{ children: React.ReactNode; delay?: string }> = ({ children, delay }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    const style = { transitionDelay: delay || '0ms' };
    return (
        <div
            ref={ref}
            style={style}
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            {children}
        </div>
    );
};

export default FadeIn;
