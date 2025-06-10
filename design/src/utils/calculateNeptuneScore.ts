// Calculate Neptune Score based on:
// - Rating weight (50%)
// - Number of reviews (30%)
// - Price fairness and clarity (20%)
export const calculateNeptuneScore = (rating: number, reviewCount: number, priceClarity // 0-100 score for price clarity and fairness
: number): number => {
  // Rating score (out of 50)
  const ratingScore = rating / 5 * 50;
  // Review count score (out of 30)
  // Log scale to handle varying numbers of reviews
  // 0 reviews = 0, 10 reviews = 15, 100+ reviews = 30
  const reviewScore = reviewCount === 0 ? 0 : Math.min(30, Math.round(15 * Math.log10(reviewCount + 1)));
  // Price clarity score (out of 20)
  const priceScore = priceClarity / 100 * 20;
  // Total Neptune Score
  const neptuneScore = Math.round(ratingScore + reviewScore + priceScore);
  return Math.min(100, Math.max(0, neptuneScore));
};