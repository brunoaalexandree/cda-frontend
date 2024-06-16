import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full">
      <Image
        src="/alta.svg"
        width={150}
        height={150}
        alt="Cidade Alta"
        className="mt-4"
      />

      <p className="text-white text-lg mt-10">
        Bem vindo ao painel de emblemas do Cidade Alta
      </p>
    </main>
  );
}
