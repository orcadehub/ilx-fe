// Currency utility for consistent currency handling across the app
export const detectCurrency = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code === 'IN' ? '₹' : '$';
  } catch (error) {
    console.log('Failed to detect location, defaulting to rupee');
    return '₹'; // Default to rupee if API fails
  }
};

export const convertPrice = (priceInRupees, currency, exchangeRate = 60) => {
  if (currency === '$') {
    return `$${Math.round(priceInRupees / 60)}`;
  }
  return `₹${priceInRupees}`;
};

export const formatCurrency = (amount, currency = '₹') => {
  if (currency === '$') {
    return `$${Math.round(amount / 60)}`;
  }
  return `₹${Number(amount).toLocaleString()}`;
};