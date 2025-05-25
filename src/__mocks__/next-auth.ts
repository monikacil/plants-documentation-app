export const handlers = {
  GET: jest.fn(),
  POST: jest.fn()
};

export const auth = jest.fn(() => Promise.resolve(null));

const nextAuth = jest.fn(() => ({
  auth,
  handlers,
}));

export default nextAuth;
