// Utility function for combining conditional class names
// Similar to clsx but simplified for our needs

export function cn(...classes) {
  return classes
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default cn; 