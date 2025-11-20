import React, { Suspense, lazy } from 'react';

// Lazy load the heavy 3D component so it doesn't slow down the initial page load
const Spline = lazy(() => import('@splinetool/react-spline'));

export function SplineScene({ scene, className }) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          {/* A simple Tailwind spinner while the 3D model loads */}
          <div className="w-10 h-10 border-4 border-swish-darkblue border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  );
}