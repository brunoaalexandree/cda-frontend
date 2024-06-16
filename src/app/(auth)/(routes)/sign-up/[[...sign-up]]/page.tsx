'use client';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { AxiosError } from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CreateAccount, createAccount } from '@/services/createAccount';
import { useModal } from '@/hooks/useModalStore';

export default function Page() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<CreateAccount>();
  const { handleLogin } = useAuth();
  const { onOpen } = useModal();

  const { mutateAsync: createAccountMutation, isPending } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      onOpen('success');
    },
  });

  const handleSignIn = async (data: CreateAccount) => {
    try {
      const user = await createAccountMutation({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (user) {
        await handleLogin(user.access_token);
        router.push('/');
      }
    } catch (err) {
      const { message, response } = err as AxiosError;
      onOpen('error', undefined, response?.status);
      console.log({ message });
    }
  };

  return (
    <section className="border-4 border-cda-gray-800 w-full max-w-[556px]">
      <div className="p-20 w-full max-w-[556px] flex flex-col border-[16px] border-cda-gray-800">
        <div className="w-full text-center flex justify-center mb-[40px]">
          <Image src="/alta.svg" alt="Cidade alta" width={150} height={150} />
        </div>

        <Form {...useForm()}>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="pt-4">
                  <FormLabel className="text-white">Name:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Seu Nome" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="pt-4">
                  <FormLabel className="text-white">Email:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="email@email.com" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem className="pt-4">
                  <FormLabel className="text-white">Senha:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="w-full mt-[40px]">
              <Button
                className="w-full bg-cda-blue-300 hover:bg-cda-blue-200"
                disabled={isPending}
              >
                Cadastrar-se
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
