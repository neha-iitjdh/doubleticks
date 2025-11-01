import { SortUpIcon, SortDownIcon, SortIcon } from '../assets/icons';
import { SORT_COLUMNS, SORT_DIRECTIONS } from '../utils/constants';

// Table header with sortable columns
export const TableHeader = ({ sortConfig, onSort }) => {
  // Handle column sort click
  const handleSort = (column) => {
    if (!column) return;

    let newDirection;
    if (sortConfig.column === column) {
      // Toggle: asc -> desc -> none
      if (sortConfig.direction === SORT_DIRECTIONS.ASC) {
        newDirection = SORT_DIRECTIONS.DESC;
      } else if (sortConfig.direction === SORT_DIRECTIONS.DESC) {
        newDirection = SORT_DIRECTIONS.NONE;
      } else {
        newDirection = SORT_DIRECTIONS.ASC;
      }
    } else {
      newDirection = SORT_DIRECTIONS.ASC;
    }

    onSort(column, newDirection);
  };

  // Render sort icon based on current state
  const renderSortIcon = (column) => {
    if (sortConfig.column !== column || sortConfig.direction === SORT_DIRECTIONS.NONE) {
      return <SortIcon />;
    }
    return sortConfig.direction === SORT_DIRECTIONS.ASC ? <SortUpIcon /> : <SortDownIcon />;
  };

  return (
    <div className="table-header">
      <div className="table-header__cell">
        <input type="checkbox" className="table-header__checkbox" />
      </div>
      
      <div
        className={`table-header__cell table-header__cell--sortable ${
          sortConfig.column === SORT_COLUMNS.NAME ? 'table-header__cell--active' : ''
        }`}
        onClick={() => handleSort(SORT_COLUMNS.NAME)}
      >
        Customer
        {renderSortIcon(SORT_COLUMNS.NAME)}
      </div>
      
      <div
        className={`table-header__cell table-header__cell--sortable ${
          sortConfig.column === SORT_COLUMNS.SCORE ? 'table-header__cell--active' : ''
        }`}
        onClick={() => handleSort(SORT_COLUMNS.SCORE)}
      >
        Score
        {renderSortIcon(SORT_COLUMNS.SCORE)}
      </div>
      
      <div className="table-header__cell">
        Email
      </div>
      
      <div
        className={`table-header__cell table-header__cell--sortable ${
          sortConfig.column === SORT_COLUMNS.LAST_MESSAGE ? 'table-header__cell--active' : ''
        }`}
        onClick={() => handleSort(SORT_COLUMNS.LAST_MESSAGE)}
      >
        Last message sent at
        {renderSortIcon(SORT_COLUMNS.LAST_MESSAGE)}
      </div>
      
      <div className="table-header__cell">
        Added by
      </div>
    </div>
  );
};
