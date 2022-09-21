import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

const MovieCard: FC<{ movie: any }> = ({ movie }) => {
  return (
    <article className="mx-auto sm:mx-0 max-w-[412px] sm:max-w-none h-[1000px] sm:h-[312px] flex flex-col sm:flex-row sm:border-b-[1px] sm:border-b-black fade-in">
      <Link href={`/details/${movie.id}`}>
        <div className="h-full w-full sm:w-[212px] sm:sborder-r-[1px] sm:sborder-r-black relative hover:cursor-pointer hover:opacity-[98%] transition">
          <Image
            src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Link>
      <div className="p-10">
        <Link href={`/details/${movie.id}`}>
          <h2 className="text-4xl font-md mb-2 hover:underline hover:underline-offset-4 hover:decoration-4 hover:cursor-pointer transition">
            {movie.title}
          </h2>
        </Link>
        <div className="flex items-center">
          <div className="py-2 flex gap-1">
            {Array.from(Array(10).keys()).map((key, index) => (
              <span
                key={key}
                className={clsx(
                  "h-4 w-4 rounded-full bg-[#e5e5e5] relative",
                  index + 1 < Math.ceil(movie.vote_average) &&
                    "after:content-[''] after:absolute after:bg-black after:h-4 after:w-4 after:rounded-full",

                  movie.vote_average % 1 !== 0 &&
                    index + 1 === Math.ceil(movie.vote_average) &&
                    "after:content-[''] after:absolute  after:h-4 after:w-4 after:rounded-full after:bg-gradient-to-r from-black to-slate-100"
                )}
              ></span>
            ))}
          </div>
          <div className="ml-2 text-[#666] text-sm">
            <span>
              {movie.vote_average.toFixed(1)} &bull; {movie.vote_count} Reviews
            </span>
          </div>
        </div>
        <div className="max-w-[600px] mt-3 mb-8 text-xl">
          {movie.overview.substring(0, 120)}{" "}
          {movie.overview.length > 120 && "..."}
        </div>
        <div>
          <Link href={`/details/${movie.id}`}>
            <button className="bg-black rounded-[4px] h-12 text-white px-4 hover:opacity-70 transition">
              Movie details
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
