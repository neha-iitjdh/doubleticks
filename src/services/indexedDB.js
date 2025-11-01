import { DB_NAME, DB_VERSION, STORE_NAME } from '../utils/constants';

let db = null;

// Initialize IndexedDB with proper indexes
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      
      // Delete old store if exists
      if (database.objectStoreNames.contains(STORE_NAME)) {
        database.deleteObjectStore(STORE_NAME);
      }

      // Create object store
      const objectStore = database.createObjectStore(STORE_NAME, { keyPath: 'id' });

      // Create indexes for fast queries
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('email', 'email', { unique: false });
      objectStore.createIndex('phone', 'phone', { unique: false });
      objectStore.createIndex('score', 'score', { unique: false });
      objectStore.createIndex('lastMessageAt', 'lastMessageAt', { unique: false });
    };
  });
};

// Bulk insert records
export const bulkInsert = (records) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);

    records.forEach((record) => {
      objectStore.add(record);
    });

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

// Get total count of records
export const getCount = () => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.count();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Get paginated records
export const getRecords = (offset, limit) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const objectStore = transaction.objectStore(STORE_NAME);
    const records = [];
    let currentOffset = 0;

    const request = objectStore.openCursor();

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      
      if (cursor) {
        if (currentOffset >= offset && records.length < limit) {
          records.push(cursor.value);
        }
        currentOffset++;
        
        if (records.length < limit) {
          cursor.continue();
        } else {
          resolve(records);
        }
      } else {
        resolve(records);
      }
    };

    request.onerror = () => reject(request.error);
  });
};

// Search records by partial match on name, email, or phone
export const searchRecords = (searchTerm, offset, limit) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const objectStore = transaction.objectStore(STORE_NAME);
    const records = [];
    const lowerSearchTerm = searchTerm.toLowerCase();
    let currentOffset = 0;

    const request = objectStore.openCursor();

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      
      if (cursor) {
        const record = cursor.value;
        // Partial match on name, email, or phone
        if (
          record.name.toLowerCase().includes(lowerSearchTerm) ||
          record.email.toLowerCase().includes(lowerSearchTerm) ||
          record.phone.includes(lowerSearchTerm)
        ) {
          if (currentOffset >= offset && records.length < limit) {
            records.push(record);
          }
          currentOffset++;
        }
        
        if (records.length < limit) {
          cursor.continue();
        } else {
          resolve(records);
        }
      } else {
        resolve(records);
      }
    };

    request.onerror = () => reject(request.error);
  });
};

// Get sorted records
export const getSortedRecords = (column, direction, offset, limit) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const objectStore = transaction.objectStore(STORE_NAME);
    const index = objectStore.index(column);
    const records = [];
    let currentOffset = 0;

    const cursorDirection = direction === 'desc' ? 'prev' : 'next';
    const request = index.openCursor(null, cursorDirection);

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      
      if (cursor) {
        if (currentOffset >= offset && records.length < limit) {
          records.push(cursor.value);
        }
        currentOffset++;
        
        if (records.length < limit) {
          cursor.continue();
        } else {
          resolve(records);
        }
      } else {
        resolve(records);
      }
    };

    request.onerror = () => reject(request.error);
  });
};

// Check if database is already populated
export const isDatabasePopulated = async () => {
  try {
    const count = await getCount();
    return count > 0;
  } catch (error) {
    return false;
  }
};

// Clear all data (useful for reset)
export const clearDatabase = () => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
