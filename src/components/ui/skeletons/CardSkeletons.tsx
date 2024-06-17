/* eslint-disable @next/next/no-img-element */
import { Skeleton } from "../skeleton";

export function CardSkeletons() {
  return (
    <>
      <div className="w-52 h-10 relative flex items-center">
        <img
          src="/border.svg"
          alt="teste"
          className="absolute w-[120%] h-[110%]"
        />
        <h1 className="text-cda-yellow-400 mb-8 font-bold mt-7 ml-4">
          Meus emblemas:
        </h1>
      </div>
      <div className="mt-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <Skeleton className="w-52 h-32 rounded-md opacity-30" />
        <Skeleton className="w-52 h-32 rounded-md opacity-30" />
        <Skeleton className="w-52 h-32 rounded-md opacity-30" />
        <Skeleton className="w-52 h-32 rounded-md opacity-30" />
        <Skeleton className="w-52 h-32 rounded-md opacity-30" />
        <Skeleton className="w-52 h-32 rounded-md opacity-30" />
        <Skeleton className="w-52 h-32 rounded-md opacity-30" />
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
      <div className="mt-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <Skeleton className="w-52 h-32 rounded-md opacity-30" />
        <Skeleton className="w-52 h-32 rounded-md opacity-30" />
        <Skeleton className="w-52 h-32 rounded-md opacity-30" />
        <Skeleton className="w-52 h-32 rounded-md opacity-30" />
        <Skeleton className="w-52 h-32 rounded-md opacity-30" />
      </div>
    </>
  );
}
