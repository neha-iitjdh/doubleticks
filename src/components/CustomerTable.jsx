import { TableHeader } from './TableHeader';
import { CustomerRow } from './CustomerRow';
import { useVirtualScroll } from '../hooks/useVirtualScroll';
import { ROW_HEIGHT } from '../utils/constants';

// Main table component with virtual scrolling
export const CustomerTable = ({ customers, totalCount, sortConfig, onSort, onLoadMore }) => {
  const { visibleStart, visibleEnd, totalHeight, containerRef, handleScroll } = 
    useVirtualScroll(totalCount);

  // Get visible customers for current scroll position
  const visibleCustomers = customers.slice(visibleStart, visibleEnd);

  return (
    <div className="table-container">
      <TableHeader sortConfig={sortConfig} onSort={onSort} />
      
      <div
        className="table-scroll-container"
        ref={containerRef}
        onScroll={handleScroll}
      >
        <div className="table-content" style={{ height: `${totalHeight}px` }}>
          {visibleCustomers.map((customer, index) => {
            const actualIndex = visibleStart + index;
            return (
              <CustomerRow
                key={customer.id}
                customer={customer}
                style={{
                  transform: `translateY(${actualIndex * ROW_HEIGHT}px)`,
                }}
              />
            );
          })}
        </div>
      </div>

      {customers.length === 0 && (
        <div className="empty-state">
          <div className="empty-state__text">No customers found</div>
          <div className="empty-state__subtext">Try adjusting your search</div>
        </div>
      )}
    </div>
  );
};
