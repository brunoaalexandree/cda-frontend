import { useModal } from '@/hooks/useModalStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../dialog';

export type SuccessMessage = 'SUCCESS' | 'FAILED';

export function ModalError() {
  const { isOpen, onClose, type, errorCode } = useModal();
  const isModalOpen = isOpen && type === 'error';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cda-gray-800 border-red-600">
        <DialogHeader>
          <DialogTitle className="text-white text-1xl text-center">
            Ops...
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-center">
          <div className="text-2xl font-bold mb-4 text-red-600">
            Erro ao tentar criar conta
          </div>

          {errorCode === 409 && (
            <span className="text-sm text-red-400">
              Este e-mail já foi cadastrado
            </span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
