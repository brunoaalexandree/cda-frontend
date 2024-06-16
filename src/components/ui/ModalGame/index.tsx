import { useModal } from '@/hooks/useModalStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../dialog';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { redeemEmblem } from '@/services/emblems';
import { generateRandomLetters } from '@/lib/generateRandomLetters';
import { userEmblems } from '@/services/profile';

export type SuccessMessage = 'SUCCESS' | 'FAILED';

export function ModalGame() {
  const { isOpen, onClose, type, emblemId } = useModal();
  const isModalOpen = isOpen && type === 'minigame';
  const [letters, setLetters] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(7);
  const [progress, setProgress] = useState<number>(0);
  const [success, setSuccess] = useState<SuccessMessage | null>(null);

  const { refetch } = useQuery({
    queryFn: () => userEmblems(),
    queryKey: ['user-emblems'],
  });

  const resetState = () => {
    setInput('');
    setIsCompleted(false);
    setTimer(7);
    setProgress(100);
    setSuccess(null);
  };

  useEffect(() => {
    if (isModalOpen) {
      setLetters(generateRandomLetters(5));
      setInput('');
      setIsCompleted(false);
      setTimer(7);
      setProgress(100);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;

    if (timer === 0) {
      setSuccess('FAILED');
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
      setProgress(prev => prev - 100 / 7);
    }, 1000);

    return () => clearInterval(interval);
  }, [isModalOpen, timer]);

  const { mutate } = useMutation({
    mutationFn: redeemEmblem,
    onSuccess: () => {
      setSuccess('SUCCESS');
      onClose();
      refetch();
    },
    onError: error => {
      alert('Erro ao resgatar emblema!');
      console.error(error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value === letters.join('')) {
      setIsCompleted(true);
      if (emblemId) {
        mutate({ emblemId });
      }
    }
  };

  const handleClose = () => {
    onClose();
    resetState();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-cda-gray-800 border-cda-yellow-400">
        <DialogHeader>
          <DialogTitle className="text-white text-1xl text-center">
            MINIGAME
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-center">
          <div className="text-2xl font-bold mb-4 text-cda-yellow-400">
            {letters.join(' ')}
          </div>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="border p-2 rounded w-full text-center"
            disabled={isCompleted || success === 'FAILED'}
          />
          <span className="text-[12px] text-cda-yellow-400">
            *atente-se se o capslock está ativo, se não estiver ative-o
          </span>
          {isCompleted && <p className="text-green-500 mt-4">Completado!</p>}

          {!success ? (
            <>
              <div className="w-full h-2 bg-cda-gray-600 mt-10 rounded relative overflow-hidden">
                <div
                  className="h-full bg-cda-yellow-400 absolute left-0 top-0 transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </>
          ) : (
            success === 'FAILED' && (
              <h1 className="bg-red-800 w-full py-2 flex items-center justify-center text-white mt-4">
                FALHOU
              </h1>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
