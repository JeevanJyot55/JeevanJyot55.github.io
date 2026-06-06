import { useEffect, useRef, useState } from 'react';

export default function ScrollFade({ children, speed = 30, triggerOffset = 0.25, ...props }) {
  const elementRef = useRef(null);
  const [styles, setStyles] = useState({ opacity: 0, transform: 'translateY(20px)' });

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate where the element center is relative to the viewport
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      
      // Calculate distance from viewport center (normalized from -1 to 1)
      // -1 means it is at the very top, 1 means it is at the very bottom
      const distance = (elementCenter - viewportCenter) / (windowHeight / 2);
      
      // Compute opacity:
      // Maximum opacity (1) in the middle of the viewport.
      // Opacity fades to 0 as it moves past the triggerOffset boundary towards the edges.
      const absDistance = Math.abs(distance);
      let opacity = 0;
      
      if (absDistance < 1) {
        // Smooth interpolation
        opacity = 1 - Math.max(0, (absDistance - (1 - triggerOffset - 0.5)) / (triggerOffset + 0.5));
      }
      opacity = Math.max(0, Math.min(1, opacity));

      // Translate Y slightly depending on scroll position for a subtle parallax effect.
      const translateY = distance * speed;

      setStyles({
        opacity: opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
        willChange: 'opacity, transform'
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to establish initial styling
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, triggerOffset]);

  return (
    <div ref={elementRef} style={styles} {...props}>
      {children}
    </div>
  );
}
