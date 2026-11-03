import React from 'react';

export type SortOption = 'newest' | 'oldest' | 'alphabetical' | 'budget';

interface SortDropdownProps {
  value: SortOption;
  onChange: (opt: SortOption) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="relative inline-block w-full sm:w-auto">
      <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-xl px-3 py-2.5 shadow-sm">
        <span className="material-symbols-outlined text-outline text-xl" data-icon="sort">
          sort
        </span>
        <label htmlFor="sort-select" className="text-xs text-outline font-bold uppercase shrink-0">
          Sort:
        </label>
        <select
          id="sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          aria-label="Sort trips by criteria"
          className="bg-transparent font-label-lg text-body-md text-on-surface outline-none cursor-pointer pr-6"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="alphabetical">Destination (A-Z)</option>
          <option value="budget">Budget Tier</option>
        </select>
      </div>
    </div>
  );
};
