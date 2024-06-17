/* eslint-disable @next/next/no-img-element */
'use client';

import { CardSkeletons } from '@/components/ui/skeletons/CardSkeletons';
import { useModal } from '@/hooks/useModalStore';
import { emblems, redeemEmblem } from '@/services/emblems';
import { userEmblems } from '@/services/profile';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

export default function Emblems() {
  const { onOpen } = useModal();

  const { data: emblemsData, isLoading: emblemsIsLoading } = useQuery({
    queryFn: () => emblems(),
    queryKey: ['emblems'],
  });

  const { data: userEmblemsData, isLoading: userEmblemsIsLoading } = useQuery({
    queryFn: () => userEmblems(),
    queryKey: ['user-emblems'],
  });

  const handleRedeemEmblem = async (emblemId: string) => {
    onOpen('minigame', emblemId);
  };

  if (userEmblemsIsLoading || emblemsIsLoading) {
    return <CardSkeletons />;
  }

  const userEmblemsIds = userEmblemsData.map((emblem: any) => emblem.emblem.id);

  const filteredEmblemsData = emblemsData?.filter(
    (emblem: any) => !userEmblemsIds.includes(emblem.id),
  );

  return (
    <main className="">
      <div className="w-52 h-10 relative flex items-center mt-10 lg:mt-0">
        <img
          src="/border.svg"
          alt="teste"
          className="absolute w-[120%] h-[110%]"
        />
        <h1 className="text-cda-yellow-400 mb-8 font-bold mt-7 ml-4">
          Meus emblemas:
        </h1>
      </div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {userEmblemsData.map((emblem: any) => (
          <div key={emblem.emblem.id} className="w-52 h-32 relative bg-cda-blue-900 border border-cda-yellow-400 flex items-center justify-center rounded-md">
            <img
              src="/border.svg"
              alt="teste"
              className="absolute w-[120%] h-[110%]"
            />
            <Image
              src={emblem.emblem.image}
              width={50}
              height={50}
              alt="teste2"
            />

            <h1 className="bg-cda-yellow-400 px-2 absolute bottom-[-10px] text-sm rounded-sm">
              {emblem.emblem.name}
            </h1>
          </div>
        ))}
      </div>

      <div className="w-52 h-10 relative flex items-center mt-20">
        <img
          src="/border.svg"
          alt="teste"
          className="absolute w-[120%] h-[110%]"
        />
        <h1 className="text-cda-yellow-400 mb-8 font-bold mt-7 ml-4">
          Todos os emblemas:
        </h1>
      </div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {filteredEmblemsData?.map((emblem: any) => (
          <div
            key={emblem.id}
            onClick={() => handleRedeemEmblem(emblem.id)}
            className="w-52 h-32 flex flex-col items-center justify-center bg-cda-gray-900 rounded-sm border-cda-yellow-400 border filter grayscale hover:cursor-pointer hover:grayscale-0 transition duration-500 ease-in-out"
          >
            <Image
              src={emblem.image}
              width={50}
              height={50}
              alt={emblem.name}
            />
            {/* <h3>{emblem.name}</h3> */}
          </div>
        ))}
      </div>
    </main>
  );
}
