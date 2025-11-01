export const SortUpIcon = ({ className = "" }) => (
  <svg
    width="16"
    height="16" 
    viewBox="0 0 16 16" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8 4L12 10H4L8 4Z" 
      fill="currentColor"
    />
  </svg>
);

export const SortDownIcon = ({ className = "" }) => (
  <svg
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8 12L4 6H12L8 12Z" 
      fill="currentColor"
    />
  </svg>
);

export const SortIcon = ({ className = "" }) => (
  <svg
    width="16"
    height="18" 
    viewBox="0 0 16 18" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M8 3L12 8H4L8 3Z" fill="#D0D0D0" /> // Scaled up
    <path d="M8 15L4 10H12L8 15Z" fill="#D0D0D0" /> // Scaled up
  </svg>
);
