/**
 * OptimizedImage — reusable HD image component for AMAR MEN'S WEAR
 *
 * HOW IT WORKS (Google lh3.googleusercontent.com CDN):
 * ─────────────────────────────────────────────────────
 * Google's image CDN supports URL suffixes that control output size:
 *   =w800       → resize to 800px wide,  height proportional
 *   =h1200      → resize to 1200px tall, width proportional
 *   =s1600      → resize so largest dimension = 1600px
 *   =w800-h1200 → fit inside 800×1200 box (letterbox, no crop)
 *
 * We strip any existing trailing suffix from the URL, then append
 * the appropriate size for the context (thumbnail vs card vs hero).
 *
 * For NON-Google URLs we pass through unchanged, so third-party or
 * admin-added images are never broken.
 *
 * USAGE:
 *   <OptimizedImage src={product.image} size="card" alt={product.name} className="..." />
 *
 * size presets:
 *   "thumb"  → 200px  (cart thumbnails, order items, admin table rows)
 *   "card"   → 600px  (shop grid, saved, home rail)
 *   "hero"   → 1200px (product detail main image)
 *   "full"   → 1600px (gallery, lookbook, editorial)
 */

import React, { useState, useRef } from 'react';

export type ImageSize = 'thumb' | 'card' | 'hero' | 'full';

const SIZE_MAP: Record<ImageSize, string> = {
  thumb: '=w400',   // 400 → crisp on 2× Retina at 200px display
  card:  '=w1000',  // 1000 → crisp on 2× Retina at 500px display
  hero:  '=w1800',  // 1800 → crisp on 2× Retina at 900px display
  full:  '=w2400',  // 2400 → crisp on 2× Retina at 1200px display
};

// Fallback SVG placeholder — lightweight, no network request
const PLACEHOLDER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f5f5f5'/%3E%3Crect x='160' y='190' width='80' height='80' rx='4' fill='%23e0e0e0'/%3E%3Cpath d='M160 270 l40-50 l30 35 l20-20 l30 35z' fill='%23d0d0d0'/%3E%3C/svg%3E`;

// Known quality-reportable issues — images that load but appear low-res
const qualityLog: Set<string> = new Set();

/**
 * Upgrades a Google lh3.googleusercontent.com URL to request HD resolution.
 * Strips any existing =w/=h/=s suffix and appends the appropriate one.
 * Non-Google URLs are returned unchanged.
 */
export function upgradeImageUrl(url: string, size: ImageSize): string {
  if (!url) return url;

  // Only process Google's lh3 CDN URLs
  if (!url.includes('lh3.googleusercontent.com') && !url.includes('lh4.googleusercontent.com')) {
    return url; // pass through unchanged
  }

  // Strip any existing size suffix (=w123, =h123, =s123, =w123-h456, etc.)
  const stripped = url.replace(/=[whsWSH]\d+(-[whWHsS]\d+)?(-[a-zA-Z]+)*$/, '');

  return stripped + SIZE_MAP[size];
}

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  size?: ImageSize;
  className?: string;
  /** Show a shimmer placeholder while loading */
  showPlaceholder?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  size = 'card',
  className = '',
  showPlaceholder = true,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const hdSrc = errored ? PLACEHOLDER_SVG : upgradeImageUrl(src, size);

  const handleLoad = () => {
    setLoaded(true);
    // Check for unusually small natural dimensions — log for quality report
    if (imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      if (naturalWidth < 300 || naturalHeight < 300) {
        qualityLog.add(`LOW-RES: ${src} (${naturalWidth}×${naturalHeight})`);
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[OptimizedImage] Low-res source detected: ${src} (${naturalWidth}×${naturalHeight}px). Consider replacing this image.`);
        }
      }
    }
  };

  const handleError = () => {
    setErrored(true);
    setLoaded(true);
    qualityLog.add(`BROKEN: ${src}`);
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[OptimizedImage] Failed to load image: ${src}`);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Shimmer placeholder shown while image loads */}
      {showPlaceholder && !loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f5f5] via-[#ebebeb] to-[#f5f5f5] animate-pulse" />
      )}

      <img
        ref={imgRef}
        src={hdSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        {...rest}
      />
    </div>
  );
};

/**
 * getQualityReport — call this from browser console in dev mode to see
 * all images that were detected as broken or low-resolution:
 *   import { getQualityReport } from './components/OptimizedImage';
 *   getQualityReport();
 */
export function getQualityReport(): void {
  if (qualityLog.size === 0) {
    console.log('[OptimizedImage] ✅ All images loaded at acceptable resolution.');
  } else {
    console.group('[OptimizedImage] ⚠️ Image Quality Report');
    qualityLog.forEach(entry => console.warn(entry));
    console.groupEnd();
  }
}

export default OptimizedImage;
