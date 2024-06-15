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
import { signIn } from '@/services/auth';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const { control, handleSubmit } = useForm();
  const { handleLogin } = useAuth();

  const { mutateAsync: authenticate, isPending } = useMutation({
    mutationFn: signIn,
  });

  const handleSignIn = async (data: any) => {
    try {
      const user = await authenticate({
        email: data.email,
        password: data.password,
      });

      if (user) {
        await handleLogin(user.access_token);
        router.push('/');
      }
    } catch (err) {
      const { message } = err as AxiosError;
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
              name="email"
              render={({ field }) => (
                <FormItem>
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
                <FormItem className="mt-2">
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
                Entrar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
