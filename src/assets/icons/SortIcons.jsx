// Sort arrow icons - INCREASED SIZE
export const SortUpIcon = ({ className = "" }) => (
  <svg
    width="16" // Changed from 12 to 16
    height="16" // Changed from 12 to 16
    viewBox="0 0 16 16" // Changed from "0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8 4L12 10H4L8 4Z" // Scaled path from 6,3,9,7,3 to 8,4,12,10,4
      fill="currentColor"
    />
  </svg>
);

export const SortDownIcon = ({ className = "" }) => (
  <svg
    width="16" // Changed from 12 to 16
    height="16" // Changed from 12 to 16
    viewBox="0 0 16 16" // Changed from "0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8 12L4 6H12L8 12Z" // Scaled path from 6,9,3,5,9 to 8,12,4,6,12
      fill="currentColor"
    />
  </svg>
);

export const SortIcon = ({ className = "" }) => (
  <svg
    width="16" // Changed from 12 to 16
    height="18" // Changed from 14 to 18
    viewBox="0 0 16 18" // Changed from "0 0 12 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M8 3L12 8H4L8 3Z" fill="#D0D0D0" /> // Scaled up
    <path d="M8 15L4 10H12L8 15Z" fill="#D0D0D0" /> // Scaled up
  </svg>
);
