import React, { FC } from "react";
import { BiChevronDown } from "react-icons/bi";
import MovieCard from "../MovieCard";
import SearchIcon from "../Shared/Icons/Search";

const List: FC<{ data: any }> = ({ data }) => {
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
      <div className="flex items-center justify-end w-full mb-2 px-10">
        <button className="py-[10px] px-4 rounded-[4px] hover:bg-[#f2f2f2] flex items-center gap-2">
          <strong>Order</strong> <span>Recommended</span> <BiChevronDown />
        </button>
      </div>
      <div className="maxed:px-10">
        {data?.results?.length ? (
          <div className="sm:border-solid sm:border-x-[1px] sm:border-t-[1px] sm:border-x-black sm:border-t-black ">
            <div className="min-h-96">
              {data?.results.map((movie: any) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          </div>
        ) : (
          <div className="border-solid border-[1px] border-black min-h-96">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
