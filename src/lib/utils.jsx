/**
 * Combines class names with conditional logic
 */
export function cn(...args) {
  return args.filter(Boolean).join(' ')
}