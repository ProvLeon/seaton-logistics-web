import React from 'react';

type ColorItem = {
  name: string;
  variable: string;
  hex: string;
  description: string;
};

const colors: ColorItem[] = [
  {
    name: 'Deep Navy Blue',
    variable: '--color-navy-blue',
    hex: '#003366',
    description: 'Represents trust, professionalism, and reliability.'
  },
  {
    name: 'Charcoal Gray',
    variable: '--color-charcoal-gray',
    hex: '#333333',
    description: 'Symbolizes strength, durability, and sophistication.'
  },
  {
    name: 'Safety Orange',
    variable: '--color-safety-orange',
    hex: '#FF6600',
    description: 'Evokes energy, visibility, and safety (key for construction and mining).'
  },
  {
    name: 'White',
    variable: '--color-white',
    hex: '#FFFFFF',
    description: 'Adds clarity and simplicity.'
  },
  {
    name: 'Light Gray',
    variable: '--color-light-gray',
    hex: '#f7f7f7',
    description: 'Used for subtle backgrounds and dividers.'
  }
];

export default function ColorPalette() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Seaton Logistics Brand Colors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colors.map((color) => (
          <div 
            key={color.variable} 
            className="rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700"
          >
            <div 
              className="h-32" 
              style={{ backgroundColor: color.hex }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{color.name}</h3>
              <div className="mt-2 flex flex-col space-y-1 text-sm">
                <p><span className="font-medium">CSS Variable:</span> {color.variable}</p>
                <p><span className="font-medium">Hex:</span> {color.hex}</p>
                <p><span className="font-medium">Usage:</span> {color.description}</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="text-xs">
                  <div className={`p-2 rounded text-center text-color-white`} style={{ backgroundColor: color.hex }}>
                    bg-color-{color.variable.replace('--color-', '')}
                  </div>
                </div>
                <div className="text-xs">
                  <div className={`p-2 rounded text-center bg-color-white border`} style={{ color: color.hex }}>
                    text-color-{color.variable.replace('--color-', '')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Usage Guidelines</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-medium">Text Color:</span> Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">text-color-navy-blue</code> format</li>
          <li><span className="font-medium">Background Color:</span> Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">bg-color-navy-blue</code> format</li>
          <li><span className="font-medium">With Opacity:</span> Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">bg-color-navy-blue/80</code> for 80% opacity</li>
          <li><span className="font-medium">Primary Buttons:</span> Use Safety Orange for main calls-to-action</li>
          <li><span className="font-medium">Secondary Buttons:</span> Use Navy Blue or transparent with white borders</li>
        </ul>
      </div>
      
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Example Usage</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-color-navy-blue p-4">
              <h4 className="text-color-white font-semibold">Buttons</h4>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <button className="bg-color-safety-orange text-color-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
                  Primary Button
                </button>
              </div>
              <div>
                <button className="bg-color-navy-blue text-color-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
                  Secondary Button
                </button>
              </div>
              <div>
                <button className="border-2 border-color-white text-color-navy-blue px-6 py-3 rounded-full font-medium hover:bg-color-light-gray transition-all">
                  Outline Button
                </button>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-color-navy-blue p-4">
              <h4 className="text-color-white font-semibold">Text Elements</h4>
            </div>
            <div className="p-6 space-y-4">
              <h5 className="text-color-navy-blue text-xl font-bold">Navy Blue Heading</h5>
              <p className="text-color-charcoal-gray">Charcoal gray paragraph text for main content.</p>
              <p className="text-color-safety-orange font-medium">Safety orange for emphasis or highlights.</p>
              <div className="bg-color-light-gray p-4 rounded">
                <p className="text-color-charcoal-gray/80">Text with reduced opacity (80%)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}