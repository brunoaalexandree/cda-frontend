import { useModal } from '@/hooks/useModalStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../dialog';
import { useRouter } from 'next/navigation';

export type SuccessMessage = 'SUCCESS' | 'FAILED';

export function ModalSuccess() {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'success';
  const router = useRouter();

  const handleClose = () => {
    onClose();
    router.push('/sign-in');
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-cda-gray-800 border-cda-yellow-400">
        <DialogHeader>
          <DialogTitle className="text-white text-1xl text-center">
            PARABÉNS
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-center">
          <div className="text-2xl font-bold mb-4 text-cda-yellow-400">
            Conta criada com sucesso!
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
