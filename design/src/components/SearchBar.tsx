import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
interface SearchBarProps {
  onSearch: (query: string) => void;
  compact?: boolean;
}
export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  compact = false
}) => {
  const [query, setQuery] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };
  return <form onSubmit={handleSubmit} className={`max-w-2xl mx-auto ${compact ? '' : 'mb-6'}`}>
      <div className="flex items-center bg-white rounded-full overflow-hidden border hover:shadow-md focus-within:shadow-md transition-shadow">
        <SearchIcon className="w-5 h-5 text-gray-400 ml-4" />
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search for plumbers, electricians, cleaners..." className="w-full py-3 px-4 text-gray-700 focus:outline-none text-lg" aria-label="Search for service providers" />
        <button type="submit" className="py-2 px-6 m-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm transition-colors duration-300" aria-label="Search">
          Search
        </button>
      </div>
    </form>;
};