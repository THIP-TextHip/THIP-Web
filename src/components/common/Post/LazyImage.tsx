import { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const PLACEHOLDER_SRC =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

const LazyImage = ({ src, alt, width, height }: LazyImageProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!imgRef.current || shouldLoad) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '200px 0px',
        threshold: 0.01,
      },
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  const handleLoad = () => {
    if (shouldLoad) {
      setIsLoaded(true);
    }
  };

  const handleError = () => {
    setIsLoaded(true);
  };

  return (
    <div
      style={{
        width,
        height,
        overflow: 'hidden',
        backgroundColor: '#2a2a2a',
      }}
    >
      <img
        ref={imgRef}
        src={shouldLoad ? src : PLACEHOLDER_SRC}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoaded ? 1 : 0,
          filter: isLoaded ? 'blur(0px)' : 'blur(16px)',
          transform: isLoaded ? 'scale(1)' : 'scale(1.04)',
          transition: 'opacity 240ms ease, filter 320ms ease, transform 320ms ease',
        }}
      />
    </div>
  );
};

export default LazyImage;
