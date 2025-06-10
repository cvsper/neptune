import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { ResultsList } from './components/ResultsList';
import { mockProviders } from './data/mockProviders';
export function App() {
  const [query, setQuery] = useState('');
  const [providers, setProviders] = useState<typeof mockProviders>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setProviders(mockProviders);
    setCurrentPage(1);
  };
  const totalPages = Math.ceil(providers.length / resultsPerPage);
  const paginatedProviders = providers.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);
  return <div className="min-h-screen bg-white">
      <div className={`transition-all duration-300 ${query ? 'pt-6' : 'pt-[30vh]'}`}>
        <div className="container mx-auto px-4">
          <h1 className={`text-4xl font-bold text-center mb-8 ${query ? 'hidden' : ''}`}>
            Service
            <span className="text-blue-500"> Finder</span>
          </h1>
          <SearchBar onSearch={handleSearch} compact={Boolean(query)} />
        </div>
      </div>
      {query && <main className="container mx-auto px-4 py-8">
          <div className="mb-6 text-sm text-gray-600">
            Showing results for "{query}"
          </div>
          <ResultsList providers={paginatedProviders} currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </main>}
    </div>;
}