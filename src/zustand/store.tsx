import { create } from "zustand";

interface IStoreState {
    extend: boolean;
}

interface IStoreActions {
    toggleExtend: () => void;
    getState: () => IStoreState;
    resetState: () => void;
}

const useStore = create<IStoreState & IStoreActions>((set) => ({
    // Initial state
    extend: false,

    // State mutators
    toggleExtend: () => set((state) => ({ 
        extend: !state.extend 
    })),
    
    getState: () => ({ ...getState() }),
    
    resetState: () => set(() => ({
        extend: false
    }))
}));

export default useStore;