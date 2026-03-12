// Returns the current year
export function getCurrentYear() {
  return new Date().getFullYear();
}

// Returns the footer text
export function getFooterCopy(isIndex) {
  return isIndex ? "Holberton School" : "Holberton School main dashboard";
}