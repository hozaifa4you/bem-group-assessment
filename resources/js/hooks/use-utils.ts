import { create } from 'zustand';

type Store = {
   open: boolean;
   setOpen: () => void;
};

export const useUtils = create<Store>()((set) => ({
   open: false,
   setOpen: () => set((state) => ({ open: !state.open })),
}));
