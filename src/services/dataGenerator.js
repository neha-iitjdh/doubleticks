import { faker } from '@faker-js/faker';

// Generate a single customer record
export const generateCustomer = (id) => {
  return {
    id,
    name: faker.person.fullName(),
    phone: `+${faker.string.numeric(12)}`,
    email: faker.internet.email().toLowerCase(),
    score: faker.number.int({ min: 0, max: 100 }),
    lastMessageAt: faker.date.recent({ days: 90 }).toISOString(),
    addedBy: faker.helpers.arrayElement([
      'Kartikey Mishra',
      'Priya Sharma',
      'Rahul Kumar',
      'Sneha Patel',
      'Amit Singh',
    ]),
  };
};

// Generate a batch of customer records
export const generateBatch = (startId, count) => {
  const batch = [];
  for (let i = 0; i < count; i++) {
    batch.push(generateCustomer(startId + i));
  }
  return batch;
};
