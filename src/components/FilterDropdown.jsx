import { useState, useRef, useEffect } from 'react';
import { FilterIcon } from '../assets/icons';

// Non-functional filter dropdown (UI only)
export const FilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        className="filter-dropdown__button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FilterIcon />
        <span>Add Filters</span>
      </button>

      {isOpen && (
        <div className="filter-dropdown__menu">
          <div className="filter-dropdown__item">Filter 1</div>
          <div className="filter-dropdown__item">Filter 2</div>
          <div className="filter-dropdown__item">Filter 3</div>
          <div className="filter-dropdown__item">Filter 4</div>
        </div>
      )}
    </div>
  );
};
