import create from 'zustand';

interface TokenState {
  token: string | null;
  pageTitle: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
  setPageTitle: (pageTitle: string) => void;
  removePageTitle: () => void;
}

const useStore = create<TokenState>((set) => ({
  token: null,
  pageTitle: null,
  setToken: (token: string) =>
    set((state) => ({
      ...state,
      token
    })),
  removeToken: () =>
    set(() => ({
      token: null
    })),
  setPageTitle: (pageTitle: string) =>
    set((state) => ({
      ...state,
      pageTitle
    })),
  removePageTitle: () =>
    set(() => ({
      pageTitle: null
    })),
}));

export default useStore;