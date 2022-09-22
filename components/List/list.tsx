import React, { FC, useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import clsx from "clsx";
import { IoMdClose } from "react-icons/io";

import { useFilter } from "../../context/store";
import MovieCard from "../MovieCard";
import SearchIcon from "../Shared/Icons/Search";

const List: FC<{ data: any; genres: any[] }> = ({ data, genres }) => {
  const [filteredData, setFilteredData] = useState<any>([]);
  const { activateFilter, clearFilter, activeFilter } = useFilter();

  const handleActivateFilters = (selectedId: number) => {
    activateFilter(selectedId);
  };

  useEffect(() => {
    const filtered = data?.results?.filter((movie: any) => {
      return movie.genre_ids.some((id: number) => id === activeFilter);
    });
    if (activeFilter !== null) {
      setFilteredData(filtered);
    } else {
      setFilteredData(data?.results);
    }
  }, [data, activeFilter]);

  return (
    <div>
      <div className="mt-10 mb-8 px-10">
        <div className="relative w-full">
          <div className="flex w-full items-center gap-2 border-2 border-solid border-[#E7E7E9] rounded-[50px] py-3 px-[14px] focus-within:border-black focus-within:border-2 transition">
            <SearchIcon />{" "}
            <input
              type="text"
              placeholder="Search for movies"
              className="h-full focus:outline-none w-full"
            />
          </div>
        </div>
      </div>
      <div className="flex px-10 mb-8 w-full">
        {genres.length ? (
          <div className="flex flex-wrap items-center justify-start gap-4">
            {genres.map((genre) => (
              <button
                key={genre.id}
                className={clsx(
                  "inline-flex items-center gap-1 px-4 py-[10px] rounded-full border-2 border-solid transition-all font-md min-h-[48px]",
                  genre.id === activeFilter
                    ? "bg-black text-white border-black"
                    : "border-[#E7E7E9] hover:border-[#CCCCCC] bg-white"
                )}
                onClick={() =>
                  handleActivateFilters(
                    activeFilter === null || activeFilter !== genre.id
                      ? genre.id
                      : null
                  )
                }
              >
                {genre.name}
                {genre.id === activeFilter && <IoMdClose />}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      {/* <div className="flex items-center justify-end w-full mb-2 px-10">
        <button className="py-[10px] px-4 rounded-[4px] hover:bg-[#f2f2f2] flex items-center gap-2">
          <strong>Order</strong> <span>Recommended</span> <BiChevronDown />
        </button>
      </div> */}
      <div className="maxed:px-10">
        {filteredData ? (
          <div className="sm:border-solid sm:border-x-[1px] sm:border-t-[1px] sm:border-x-black sm:border-t-black ">
            <div className="min-h-96">
              {filteredData.map((movie: any) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        ) : (
          <div className="border-solid border-[1px] border-black h-96 w-full pt-8 flex justify-center">
            <PulseLoader />
          </div>
        )}
        {!filteredData?.length && (
          <div className="border-solid border-[1px] border-black border-t-0 h-40 w-full flex flex-col items-center justify-center p-4 text-center">
            Sorry, there are no movies for this category at the moment 🙁
            <div
              className="mt-2 underline underline-offset-4 cursor-pointer"
              onClick={clearFilter}
            >
              &#x2716; Clear filters
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
