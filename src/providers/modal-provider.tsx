'use client';

import { ModalError } from '@/components/ui/ModalError';
import { ModalGame } from '@/components/ui/ModalGame';
import { ModalSuccess } from '@/components/ui/ModalSuccess';
import { useEffect, useState } from 'react';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ModalGame />
      <ModalSuccess />
      <ModalError />
    </>
  );
};
