import React, { Fragment } from 'react';
import { ServiceProvider, ServiceProviderCard } from './ServiceProviderCard';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
interface ResultsListProps {
  providers: ServiceProvider[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export const ResultsList: React.FC<ResultsListProps> = ({
  providers,
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (providers.length === 0) {
    return <div className="text-center text-gray-600 mt-8">
        No service providers found. Try a different search term.
      </div>;
  }
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('...');
      }
      // Add visible pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }
      // Always show last page
      pages.push(totalPages);
    }
    return pages;
  };
  return <div>
      <div className="divide-y">
        {providers.map(provider => <ServiceProviderCard key={provider.id} provider={provider} />)}
      </div>
      {totalPages > 1 && <div className="flex justify-center items-center gap-1 mt-8">
          <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 text-gray-600 disabled:text-gray-300" aria-label="Previous page">
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          {renderPageNumbers().map((page, index) => <Fragment key={index}>
              {page === '...' ? <span className="px-2 text-gray-400">...</span> : <button onClick={() => onPageChange(page as number)} className={`w-8 h-8 rounded-full text-sm ${currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  {page}
                </button>}
            </Fragment>)}
          <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 text-gray-600 disabled:text-gray-300" aria-label="Next page">
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>}
    </div>;
};