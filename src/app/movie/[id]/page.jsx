"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Intro from "@/app/Components/Intro";


async function getMovie(id) {
  
  try {
    const res = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
    return await res.json();
    
  } catch (error) {
     console.log(error)
  }
  
}

const imageLoader = ({ src, width }) => {
  return `${src}?w=${width}`;
};

const page = async () => {
  const param = useParams();
  const movie = await getMovie(param.id);
  return (
    <>
    <Link className="ml-4 mt-4 group flex font-semibold text-sm leading-6 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white" href="/"><svg viewBox="0 -9 3 24" className="overflow-visible mr-3 text-slate-400 w-auto h-6 group-hover:text-slate-600 dark:group-hover:text-slate-300"><path d="M3 0L0 3L3 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>Regresar</Link>
    <div className="grid grid-cols-3 gap-4 p-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className=" col-span-1">
        <Image
          loader={imageLoader}
          src={movie.image}
          width={500}
          height={500}
          alt={movie.title}
          title={movie.title}
        />
      </div>

      <div className="col-span-2 md:col-span-1 lg:col-span-2">
        <p className="text-center text-dark font-bold">Titulo: <span className="text-pink-500">{movie.title}</span></p>
        <p className="mb-2 text-dark font-bold mt-3">Descripción: <span className="text-pink-500">{movie.description}</span></p>
        <p className="text-dark font-bold">Director: <span className="text-pink-500">{movie.director}</span></p>
        <p className="text-dark font-bold">Producto: <span className="text-pink-500">{movie.producer}</span></p>
        <p className="text-dark font-bold">Titulo Romanizado: <span className="text-pink-500">{movie.original_title_romanised}</span></p>
        <p className="text-dark font-bold">Puntuación: <span className="text-pink-500">{movie.rt_score}</span></p>
        <Intro/>
      </div>
    </div>
    </>
  );
};

export default page;
