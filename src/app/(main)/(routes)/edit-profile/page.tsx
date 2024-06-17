"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { updateUser, user } from "@/services/profile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const editProfileSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").optional(),
  email: z.string().email("Email inválido").optional(),
});

type EditProfileSchema = z.infer<typeof editProfileSchema>;

export default function EditProfile() {
  const { state, dispatch } = useAuth();

  const { data, isLoading } = useQuery({
    queryFn: () => user(state.user!.access_token),
    queryKey: ["user-data"],
    enabled: !!state.user,
  });

  const mutation = useMutation({
    mutationFn: (userData: Partial<EditProfileSchema>) => updateUser(userData),
    onSuccess: (updatedUser) => {
      localStorage.setItem(
        "USER_STORAGE_LOCATION",
        JSON.stringify(updatedUser)
      );

      console.log({ updatedUser });

      dispatch({ type: "LOGIN", payload: { ...state.user!, ...updatedUser! } });
      alert("foi");
    },
    onError: (error) => {
      console.error("Erro ao atualizar o perfil:", error);
      alert("Erro ao atualizar o perfil!");
    },
  });

  const { control, handleSubmit, reset } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        email: data.email,
      });
    }
  }, [data, reset]);

  const onSubmit = (values: EditProfileSchema) => {
    mutation.mutate(values);
  };

  if (isLoading) {
    <>
      <Skeleton className="w-full h-10 mt-10" />
      <Skeleton className="w-full h-10 mt-10" />
    </>;
  }

  return (
    <main className="flex flex-col w-full p-10">
      <h1 className="text-lg text-white font-bold">Edite seu perfil</h1>

      <Form {...useForm()}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-white">Nome:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-white">Email:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Atualizar Perfil
          </button>
        </form>
      </Form>
    </main>
  );
}
