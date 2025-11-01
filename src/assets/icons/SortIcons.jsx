// Sort arrow icons
export const SortUpIcon = ({ className = '' }) => (
  <svg 
    width="12" 
    height="12" 
    viewBox="0 0 12 12" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M6 3L9 7H3L6 3Z" 
      fill="currentColor"
    />
  </svg>
);

export const SortDownIcon = ({ className = '' }) => (
  <svg 
    width="12" 
    height="12" 
    viewBox="0 0 12 12" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M6 9L3 5H9L6 9Z" 
      fill="currentColor"
    />
  </svg>
);

export const SortIcon = ({ className = '' }) => (
  <svg 
    width="12" 
    height="14" 
    viewBox="0 0 12 14" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M6 2L9 6H3L6 2Z" fill="#D0D0D0" />
    <path d="M6 12L3 8H9L6 12Z" fill="#D0D0D0" />
  </svg>
);
