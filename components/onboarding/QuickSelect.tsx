'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface QuickSelectProps {
  type: 'single' | 'multi';
  options: string[];
  allowCustom: boolean;
  onSelect: (value: string) => void;
}

export function QuickSelect({ type, options, allowCustom, onSelect }: QuickSelectProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const toggle = (option: string) => {
    if (type === 'single') {
      setSelected([option]);
    } else {
      setSelected(prev =>
        prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
      );
    }
  };

  const handleConfirm = () => {
    const all = [...selected];
    if (customInput.trim()) all.push(customInput.trim());
    if (all.length > 0) {
      onSelect(all.join(', '));
    }
  };

  const handleSingleSelect = (option: string) => {
    if (type === 'single') {
      onSelect(option);
    } else {
      toggle(option);
    }
  };

  return (
    <div className="mt-3 mb-2">
      <div className="flex flex-wrap gap-2 mb-3">
        {options.map(option => (
          <button
            key={option}
            onClick={() => handleSingleSelect(option)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
              selected.includes(option)
                ? 'bg-orange-500 border-orange-500 text-white'
                : 'bg-white border-gray-300 text-gray-700 hover:border-orange-400 hover:text-orange-600'
            }`}
          >
            {option}
          </button>
        ))}
        {allowCustom && (
          <button
            onClick={() => setShowCustom(!showCustom)}
            className="px-3 py-1.5 rounded-full text-sm border border-dashed border-gray-300 text-gray-500 hover:border-orange-400 hover:text-orange-600 transition-all"
          >
            + Add your own
          </button>
        )}
      </div>

      {showCustom && (
        <input
          type="text"
          value={customInput}
          onChange={e => setCustomInput(e.target.value)}
          placeholder="Type your own..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm mb-2 focus:outline-none focus:border-orange-400"
          onKeyDown={e => e.key === 'Enter' && handleConfirm()}
          autoFocus
        />
      )}

      {type === 'multi' && (selected.length > 0 || customInput.trim()) && (
        <Button
          size="sm"
          className="bg-orange-500 hover:bg-orange-600 mt-1"
          onClick={handleConfirm}
        >
          Confirm Selection ({selected.length + (customInput.trim() ? 1 : 0)})
        </Button>
      )}
    </div>
  );
}
