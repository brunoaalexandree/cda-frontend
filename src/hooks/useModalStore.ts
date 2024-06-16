import { create } from 'zustand';

export type ModalType = 'minigame' | 'success' | 'error';

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  emblemId?: string;
  errorCode?: number;
  onOpen: (type: ModalType, emblemId?: string, errorCode?: number) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>(set => ({
  type: null,
  emblemId: undefined,
  isOpen: false,
  errorCode: undefined,
  onOpen: (type, emblemId = undefined, errorCode = undefined) =>
    set({ isOpen: true, type, emblemId, errorCode }),
  onClose: () => set({ type: null, isOpen: false }),
}));
