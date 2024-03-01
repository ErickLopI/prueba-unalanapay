"use client";

import Link from "next/link";
import { useState } from "react";

const Search = ({ movies }) => {
  const [movieFind, setmovieFind]  = useState([])

  const handleSearch = (term) => {
        if(term.length==0){
            return setmovieFind([])
        }
        const res = movies.filter((movie) => {
            return movie.title.toLowerCase().includes(term.toLowerCase());
          });
          setmovieFind(res) 
  };

  return (
    <>
    
    <div className="flex justify-start p-4">
        <div className="w-48 sm:w-full md:w-full lg:w-48">
            <input
                className="peer w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Buscar Películas"
                onChange={(e) => {
                handleSearch(e.target.value);
                }}
            />
      </div>
    </div>
    {
    movieFind.length>0 ? 
    <div className="grid bg-slate-100 grid-cols-4 gap-4 p-5 min-[320px]:grid-cols-2  max-[620px]:grid-cols-2">
    {
        movieFind.map((movie, index)=>
                <Link href={`/movie/${movie.id}`} key={index}  className="shadow-lg p-2 w-full bg-gray-400 mt-1 text-white font-bold">{movie.title}</Link>
        )
    }
    </div> : null
    }
   </>
  );
};

export default Search;
