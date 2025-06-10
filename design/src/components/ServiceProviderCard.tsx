import React from 'react';
import { StarIcon, PhoneIcon, CalendarIcon, DollarSignIcon } from 'lucide-react';
export interface ServiceProvider {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  price: string | number;
  bookingMethod: string;
  neptuneScore: number;
}
interface ServiceProviderCardProps {
  provider: ServiceProvider;
}
export const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({
  provider
}) => {
  const renderStars = (rating: number) => {
    return <div className="flex items-center">
        {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : i < rating ? 'text-yellow-400 fill-yellow-400 opacity-50' : 'text-gray-300'}`} />)}
        <span className="ml-2 text-gray-700">{provider.rating.toFixed(1)}</span>
        <span className="ml-1 text-gray-500">({provider.reviewCount})</span>
      </div>;
  };
  return <div className="py-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-xl text-blue-600 hover:underline mb-1">
            {provider.name}
          </h3>
          <div className="mb-2">{renderStars(provider.rating)}</div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <DollarSignIcon className="w-4 h-4 mr-1" />
              {typeof provider.price === 'number' ? `$${provider.price}` : provider.price}
            </div>
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1" />
              {provider.bookingMethod}
            </div>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full transition-colors duration-300 flex items-center">
          <PhoneIcon className="w-4 h-4 mr-2" />
          Contact
        </button>
      </div>
    </div>;
};