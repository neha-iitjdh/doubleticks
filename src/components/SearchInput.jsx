import { SearchIcon } from '../assets/icons';

// Search input with debouncing
export const SearchInput = ({ value, onChange, placeholder = "Search Customers" }) => {
  return (
    <div className="search-input">
      <div className="search-input__icon">
        <SearchIcon />
      </div>
      <input
        type="text"
        className="search-input__field"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
