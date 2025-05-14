import React from 'react';

type ColorItem = {
  name: string;
  variable: string;
  hex: string;
  description: string;
  textColor?: string;
};

const colors: ColorItem[] = [
  {
    name: 'Deep Navy Blue',
    variable: '--color-navy-blue',
    hex: '#003366',
    description: 'Represents trust, professionalism, and reliability.',
    textColor: 'white'
  },
  {
    name: 'Charcoal Gray',
    variable: '--color-charcoal-gray',
    hex: '#333333',
    description: 'Symbolizes strength, durability, and sophistication.',
    textColor: 'white'
  },
  {
    name: 'Safety Orange',
    variable: '--color-safety-orange',
    hex: '#FF6600',
    description: 'Evokes energy, visibility, and safety (key for construction and mining).',
    textColor: 'white'
  },
  {
    name: 'White',
    variable: '--color-white',
    hex: '#FFFFFF',
    description: 'Adds clarity and simplicity.',
    textColor: 'navy-blue'
  },
  {
    name: 'Light Gray',
    variable: '--color-light-gray',
    hex: '#f7f7f7',
    description: 'Used for subtle backgrounds and dividers.',
    textColor: 'charcoal-gray'
  }
];

export default function ColorPalette() {
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-8 text-color-navy-blue dark:text-color-white">Seaton Logistics Brand Colors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {colors.map((color) => (
          <div 
            key={color.variable} 
            className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 group"
          >
            <div 
              className="h-40 flex items-center justify-center relative overflow-hidden" 
              style={{ backgroundColor: color.hex }}
            >
              <span className={`text-color-${color.textColor} text-4xl font-bold opacity-30 group-hover:opacity-70 transition-opacity duration-300`}>
                {color.name.split(' ')[0]}
              </span>
              <div className="absolute bottom-3 right-3 bg-color-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-mono text-color-white">
                {color.hex}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-color-navy-blue dark:text-color-white">{color.name}</h3>
              <div className="mt-3 flex flex-col space-y-2 text-sm text-color-charcoal-gray/80 dark:text-color-white/80">
                <p><span className="font-semibold">CSS Variable:</span> {color.variable}</p>
                <p><span className="font-semibold">Usage:</span> {color.description}</p>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="text-xs">
                  <div className={`p-2 rounded-lg text-center text-color-${color.textColor} shadow-sm`} style={{ backgroundColor: color.hex }}>
                    bg-color-{color.variable.replace('--color-', '')}
                  </div>
                </div>
                <div className="text-xs">
                  <div className={`p-2 rounded-lg text-center bg-color-white dark:bg-color-charcoal-gray border shadow-sm`} style={{ color: color.hex }}>
                    text-color-{color.variable.replace('--color-', '')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 pt-8 border-t border-color-light-gray dark:border-color-charcoal-gray">
        <h3 className="text-2xl font-bold mb-6 text-color-navy-blue dark:text-color-white">Usage Guidelines</h3>
        <ul className="list-disc pl-6 space-y-3 text-color-charcoal-gray/80 dark:text-color-white/80">
          <li><span className="font-semibold text-color-navy-blue dark:text-color-white">Text Color:</span> Use <code className="bg-color-light-gray dark:bg-color-charcoal-gray px-2 py-0.5 rounded text-color-safety-orange">text-color-navy-blue</code> format</li>
          <li><span className="font-semibold text-color-navy-blue dark:text-color-white">Background Color:</span> Use <code className="bg-color-light-gray dark:bg-color-charcoal-gray px-2 py-0.5 rounded text-color-safety-orange">bg-color-navy-blue</code> format</li>
          <li><span className="font-semibold text-color-navy-blue dark:text-color-white">With Opacity:</span> Use <code className="bg-color-light-gray dark:bg-color-charcoal-gray px-2 py-0.5 rounded text-color-safety-orange">bg-color-navy-blue/80</code> for 80% opacity</li>
          <li><span className="font-semibold text-color-navy-blue dark:text-color-white">Primary Buttons:</span> Use Safety Orange for main calls-to-action</li>
          <li><span className="font-semibold text-color-navy-blue dark:text-color-white">Secondary Buttons:</span> Use Navy Blue or transparent with white borders</li>
        </ul>
      </div>
      
      <div className="mt-16 pt-8 border-t border-color-light-gray dark:border-color-charcoal-gray">
        <h3 className="text-2xl font-bold mb-6 text-color-navy-blue dark:text-color-white">Example Usage</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="border border-color-light-gray dark:border-color-charcoal-gray rounded-xl overflow-hidden shadow-lg">
            <div className="bg-color-navy-blue p-5">
              <h4 className="text-color-white font-bold text-lg">Buttons</h4>
            </div>
            <div className="p-8 space-y-6 bg-color-white dark:bg-color-charcoal-gray/20">
              <div>
                <button className="bg-color-safety-orange text-color-white px-7 py-3 rounded-full font-medium hover:bg-opacity-90 hover:shadow-md transition-all">
                  Primary Button
                </button>
              </div>
              <div>
                <button className="bg-color-navy-blue text-color-white px-7 py-3 rounded-full font-medium hover:bg-opacity-90 hover:shadow-md transition-all">
                  Secondary Button
                </button>
              </div>
              <div>
                <button className="border-2 border-color-navy-blue dark:border-color-white text-color-navy-blue dark:text-color-white px-7 py-3 rounded-full font-medium hover:bg-color-navy-blue/5 dark:hover:bg-color-white/10 transition-all">
                  Outline Button
                </button>
              </div>
            </div>
          </div>
          
          <div className="border border-color-light-gray dark:border-color-charcoal-gray rounded-xl overflow-hidden shadow-lg">
            <div className="bg-color-navy-blue p-5">
              <h4 className="text-color-white font-bold text-lg">Text Elements</h4>
            </div>
            <div className="p-8 space-y-5 bg-color-white dark:bg-color-charcoal-gray/20">
              <h5 className="text-color-navy-blue dark:text-color-white text-2xl font-bold">Navy Blue Heading</h5>
              <p className="text-color-charcoal-gray dark:text-color-white/90">Charcoal gray paragraph text for main content.</p>
              <p className="text-color-safety-orange font-medium">Safety orange for emphasis or highlights.</p>
              <div className="bg-color-light-gray dark:bg-color-navy-blue/30 p-5 rounded-lg">
                <p className="text-color-charcoal-gray/80 dark:text-color-white/80">Text with reduced opacity (80%)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}