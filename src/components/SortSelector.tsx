import React from 'react';
import { SortAsc, SortDesc } from 'lucide-react';
import { clsx } from 'clsx';

export type SortOrder = 'newest' | 'oldest';

interface SortSelectorProps {
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

export function SortSelector({ sortOrder, onSortChange }: SortSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onSortChange('newest')}
        className={clsx(
          'flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
          sortOrder === 'newest'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:bg-gray-100'
        )}
      >
        <SortDesc className="h-4 w-4" />
        <span>Newest</span>
      </button>
      <button
        onClick={() => onSortChange('oldest')}
        className={clsx(
          'flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
          sortOrder === 'oldest'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:bg-gray-100'
        )}
      >
        <SortAsc className="h-4 w-4" />
        <span>Oldest</span>
      </button>
    </div>
  );
}