import React from 'react';

type ColorSwatchProps = {
  color: string;
  name: string;
  hex: string;
  cssVar?: string;
  className?: string;
  showText?: boolean;
};

export default function ColorSwatch({
  color,
  name,
  hex,
  cssVar,
  className = '',
  showText = true,
}: ColorSwatchProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div 
        className="h-20 w-full rounded-t-lg shadow-inner border border-gray-200 dark:border-gray-800"
        style={{ backgroundColor: color }}
      />
      {showText && (
        <div className="p-3 border border-t-0 rounded-b-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
          <div className="font-medium text-sm">{name}</div>
          <div className="text-xs mt-1 text-gray-700 dark:text-gray-300">{hex}</div>
          {cssVar && (
            <div className="text-xs mt-1 font-mono text-gray-600 dark:text-gray-400">
              {cssVar}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Grid of multiple swatches
export function ColorSwatchGrid({ 
  colors 
}: { 
  colors: Array<Omit<ColorSwatchProps, 'className'>> 
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {colors.map((color) => (
        <ColorSwatch
          key={color.name}
          {...color}
          className="flex-1"
        />
      ))}
    </div>
  );
}