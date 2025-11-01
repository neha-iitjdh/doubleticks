import { useState, useEffect } from 'react';
import { SearchInput } from './SearchInput';
import { FilterDropdown } from './FilterDropdown';
import { CustomerTable } from './CustomerTable';
import { useDebounce } from '../hooks/useDebounce';
import { getRecords, searchRecords, getSortedRecords, getCount } from '../services/indexedDB';
import { SEARCH_DEBOUNCE_MS, ROWS_PER_PAGE, SORT_DIRECTIONS } from '../utils/constants';

// Main customer list component
export const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    column: null,
    direction: SORT_DIRECTIONS.NONE,
  });
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DEBOUNCE_MS);

  // Load initial data and update total count
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const count = await getCount();
        setTotalCount(count);
        await fetchCustomers();
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Fetch customers based on search and sort
  const fetchCustomers = async () => {
    try {
      let results;

      if (debouncedSearchTerm) {
        // Search mode
        results = await searchRecords(debouncedSearchTerm, 0, ROWS_PER_PAGE * 100);
      } else if (sortConfig.column && sortConfig.direction !== SORT_DIRECTIONS.NONE) {
        // Sort mode
        results = await getSortedRecords(
          sortConfig.column,
          sortConfig.direction,
          0,
          ROWS_PER_PAGE * 100
        );
      } else {
        // Default mode
        results = await getRecords(0, ROWS_PER_PAGE * 100);
      }

      setCustomers(results);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // Re-fetch when search or sort changes
  useEffect(() => {
    fetchCustomers();
  }, [debouncedSearchTerm, sortConfig]);

  // Handle sort column click
  const handleSort = (column, direction) => {
    setSortConfig({ column, direction });
  };

  return (
    <div className="customer-list">
      <div className="customer-list__title">
        <h1>All Customers</h1>
        <span className="customer-list__badge">{totalCount.toLocaleString()}</span>
      </div>

      <div className="controls">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search Customers"
        />
        <FilterDropdown />
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <div className="loading-text">Loading customers...</div>
        </div>
      ) : (
        <CustomerTable
          customers={customers}
          totalCount={debouncedSearchTerm ? customers.length : totalCount}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      )}
    </div>
  );
};
