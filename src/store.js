import create from "zustand";

const useStore = create((set) => ({
  collections: [],
  setCollections: (collectionsData) => set({ collections: collectionsData }),
}));

export default useStore;
