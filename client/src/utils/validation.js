// Validation helpers - reusable field-level validation functions used across all forms

// Checks if an email looks valid (has @ and a domain with a dot)
export function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// Checks if a URL looks valid (must start with http:// or https://)
export function isValidUrl(url) {
  if (!url) return true; // empty is allowed since Job URL is optional
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Returns an error message for a required field, or empty string if valid
export function requiredField(value, label) {
  if (!value || !value.trim()) {
    return `${label} is required`;
  }
  return '';
}