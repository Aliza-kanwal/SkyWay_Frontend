export const formatPrice = (price) => {
  // Convert USD to PKR (approximate)
  const pkrPrice = price * 280; // 1 USD ≈ 280 PKR
  return `PKR ${pkrPrice.toLocaleString()}`;
};

// Or use this if backend already returns PKR
export const formatPKR = (price) => {
  return `PKR ${price.toLocaleString()}`;
};
// Add this function if not present
const formatPKR = (price) => {
  return `PKR ${price.toLocaleString()}`;
};

// Use it in the JSX:
<p className="text-3xl font-bold text-blue-600">{formatPKR(flight.price)}</p>