import { ServiceProvider } from '../components/ServiceProviderCard';
import { calculateNeptuneScore } from '../utils/calculateNeptuneScore';
// Helper function to calculate Neptune Score for each provider
const addNeptuneScore = (provider: Omit<ServiceProvider, 'neptuneScore'> & {
  priceClarity: number;
}): ServiceProvider => {
  const score = calculateNeptuneScore(provider.rating, provider.reviewCount, provider.priceClarity);
  return {
    ...provider,
    neptuneScore: score
  };
};
export const mockProviders: ServiceProvider[] = [addNeptuneScore({
  id: '1',
  name: 'Elite Plumbing Services',
  rating: 4.8,
  reviewCount: 203,
  price: 85,
  bookingMethod: 'Online booking',
  priceClarity: 90
}), addNeptuneScore({
  id: '2',
  name: 'Swift Electrical Solutions',
  rating: 4.7,
  reviewCount: 156,
  price: 95,
  bookingMethod: 'Phone call',
  priceClarity: 85
}), addNeptuneScore({
  id: '3',
  name: 'Sparkle Home Cleaning',
  rating: 4.9,
  reviewCount: 312,
  price: 75,
  bookingMethod: 'Online booking',
  priceClarity: 95
}), addNeptuneScore({
  id: '4',
  name: 'Green Gardens Landscaping',
  rating: 4.5,
  reviewCount: 89,
  price: 'Contact for quote',
  bookingMethod: 'Email or phone',
  priceClarity: 60
}), addNeptuneScore({
  id: '5',
  name: 'Reliable Roofing Co.',
  rating: 4.6,
  reviewCount: 124,
  price: 'From $500',
  bookingMethod: 'Phone consultation',
  priceClarity: 70
}), addNeptuneScore({
  id: '6',
  name: 'Quick Fix Handyman',
  rating: 4.3,
  reviewCount: 67,
  price: 45,
  bookingMethod: 'Phone call',
  priceClarity: 80
})];