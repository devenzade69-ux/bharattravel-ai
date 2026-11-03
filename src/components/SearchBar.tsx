import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search by destination, travel type, budget...'
}) => {
  return (
    <div className="relative w-full">
      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" data-icon="search">
        search
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search saved trips"
        className="w-full pl-11 pr-10 py-3 rounded-xl border border-outline-variant focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-surface-container-lowest font-body-md text-body-md transition-all shadow-sm"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1"
          aria-label="Clear search query"
        >
          <span className="material-symbols-outlined text-lg" data-icon="close">
            close
          </span>
        </button>
      )}
    </div>
  );
};
