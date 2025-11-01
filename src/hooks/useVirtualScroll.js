import { useState, useEffect, useRef, useCallback } from 'react';
import { ROW_HEIGHT, ROWS_PER_PAGE, BUFFER_SIZE } from '../utils/constants';

// Custom hook for virtual scrolling with infinite scroll
export const useVirtualScroll = (totalItems) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  // Calculate visible range based on scroll position
  const visibleStart = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER_SIZE);
  const visibleEnd = Math.min(
    totalItems,
    Math.ceil((scrollTop + window.innerHeight) / ROW_HEIGHT) + BUFFER_SIZE
  );

  // Total height of the scrollable content
  const totalHeight = totalItems * ROW_HEIGHT;

  // Handle scroll event with throttling
  const handleScroll = useCallback((e) => {
    const target = e.target;
    setScrollTop(target.scrollTop);
  }, []);

  return {
    visibleStart,
    visibleEnd,
    totalHeight,
    containerRef,
    handleScroll,
    scrollTop,
  };
};
