import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface TokenState {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
}

const useStore = create<TokenState>((set) => ({
  token: null,
  setToken: (token) =>
    set((state) => ({
      ...state,
      token
    })),
  removeToken: () =>
    set(() => ({
      token: null
    })),
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Store', useStore);
}

export default useStore;