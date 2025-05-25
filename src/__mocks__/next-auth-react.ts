export const signIn = jest.fn(() => Promise.resolve({ ok: true }));
export const signOut = jest.fn(() => Promise.resolve({ ok: true }));
export const useSession = jest.fn(() => ({
  data: null,
  status: "unauthenticated"
}));
