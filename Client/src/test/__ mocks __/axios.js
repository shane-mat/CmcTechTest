const mockData = [
  { id: 1, text: 'Mock Todo 1', completed: false },
  { id: 2, text: 'Mock Todo 2', completed: true },
  // Add more mock data as needed
];

export default {
  get: jest.fn().mockResolvedValue({ data: mockData }),
  post: jest.fn().mockResolvedValue({ data: {} }),
  delete: jest.fn().mockResolvedValue({}),
  put: jest.fn().mockResolvedValue({}),
};
