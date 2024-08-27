import { useState, useEffect, useRef } from "react";

const useLazyLoad = () => {
  // states
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  //   element refrence
  const elementRef = useRef<HTMLDivElement | null>(null);
  // is in view port
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasLoaded]);

  return { isVisible, elementRef };
};

export default useLazyLoad;
