"use client";

import React from 'react';
import ColorPalette from '@/components/documentation/ColorPalette';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ColorGuidePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16 max-w-6xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4 text-color-black">Seaton Logistics Brand Colors</h1>
          <p className="text-xl text-color-charcoal-gray/80 max-w-3xl">
            This guide provides a comprehensive overview of our brand colors and how to use them
            consistently across our digital products.
          </p>
        </div>
        
        <ColorPalette />

        <div className="mt-20 border-t pt-10">
          <h2 className="text-2xl font-bold mb-6 text-color-black">Implementation Notes</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">CSS Variables</h3>
              <p className="mb-4">Our color system uses CSS variables for consistency and flexibility:</p>
              <pre className="bg-color-light-gray p-4 rounded overflow-auto">
                <code>
{`/* In CSS */
var(--color-black)
var(--color-charcoal-gray)
var(--color-safety-orange)
var(--color-white)
var(--color-light-gray)`}
                </code>
              </pre>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Tailwind Classes</h3>
              <p className="mb-4">Use these utility classes in your components:</p>
              <pre className="bg-color-light-gray p-4 rounded overflow-auto">
                <code>
{`/* Backgrounds */
bg-color-black
bg-color-charcoal-gray
bg-color-safety-orange
bg-color-white
bg-color-light-gray

/* Text colors */
text-color-black
text-color-charcoal-gray
text-color-safety-orange
text-color-white

/* With opacity */
bg-color-black/80
text-color-charcoal-gray/60`}
                </code>
              </pre>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">JavaScript/TypeScript</h3>
              <p className="mb-4">Import the color utility functions:</p>
              <pre className="bg-color-light-gray p-4 rounded overflow-auto">
                <code>
{`import { COLORS, withOpacity, cssVar, getContrastText } from '@/utils/colors';

// Constants
const primaryColor = COLORS.safetyOrange;

// With opacity
const overlayColor = withOpacity(COLORS.black, 0.8);

// CSS Variables in inline styles
const style = { backgroundColor: cssVar('black') };

// Get contrast text color
const textColor = getContrastText(COLORS.safetyOrange);`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}