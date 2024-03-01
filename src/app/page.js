'use client'
import Image from 'next/image'
import Link from 'next/link'
import Search from './Components/Search'


 
const imageLoader = ({ src, width }) => {
  return `${src}?w=${width}`
}

async function getData() {
  const res = await fetch('https://ghibliapi.vercel.app/films', {cache: 'no-store'})
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home() {

  const data = await getData()

  return (
    <>
    <Search  movies={data} />
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <div className="bg-white mx-auto p-10">
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        { data ? 
          data.map((movie, index)=>
            (
              <Link key={index} href={ `/movie/${movie.id}`}>
              <div className='shadow-xl p-2' >
               <Image
                loader={imageLoader}
                src={movie.image}
                width={400}
                height={400}
                alt={movie.title}
                title={movie.title}
              />
              <p className='text-pink-500 text-start text-bold'>{movie.title}</p>
              <p className='text-dark'>{movie.release_date}</p>
              <div className="overlay"></div>
              </div>
              </Link>
            )

          ) : "No hay datos"
        }


        </div>
      </div>
    </main>
    </>
  );
}
