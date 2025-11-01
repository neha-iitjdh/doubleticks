// App-wide constants
export const DB_NAME = 'DoubleTick_CustomerDB';
export const DB_VERSION = 1;
export const STORE_NAME = 'customers';

export const TOTAL_RECORDS = 1_000_000;
export const BATCH_SIZE = 10_000;
export const ROWS_PER_PAGE = 30;
export const ROW_HEIGHT = 72;
export const BUFFER_SIZE = 10;

export const SEARCH_DEBOUNCE_MS = 250;

export const SORT_COLUMNS = {
  NAME: 'name',
  SCORE: 'score',
  LAST_MESSAGE: 'lastMessageAt',
};

export const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc',
  NONE: null,
};
