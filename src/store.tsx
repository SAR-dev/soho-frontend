import create from 'zustand';

interface TokenState {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
}

const useStore = create<TokenState>((set) => ({
  token: null,
  setToken: (token: string) =>
    set((state) => ({
      ...state,
      token
    })),
  removeToken: () =>
    set(() => ({
      token: null
    })),
}));

export default useStore;