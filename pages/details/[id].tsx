import React, { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import clsx from "clsx";
import Layout from "../../components/Layout";

const MovieDetailPage: FC<any> = ({
  data,
  castData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Layout>
        <div className="flex w-full flex-1 flex-col max-w-[1330px] mx-auto">
          <div className="my-10 mx-4 md:px-10 ">
            <div className="flex-col-reverse md:flex-row flex justify-between gap-12">
              <main className="w-full md:w-2/3">
                <div className="mt-10 mb-2">
                  <h1 className="text-5xl leading-[56px] font-bld">
                    {data.title}
                  </h1>
                </div>
                <div className="flex items-center mb-2">
                  <div className="py-2 flex gap-1">
                    {Array.from(Array(10).keys()).map((key, index) => {
                      return (
                        <span
                          key={key}
                          className={clsx(
                            "h-4 w-4 rounded-full bg-[#e5e5e5] relative",
                            index + 1 < Math.ceil(data.vote_average) &&
                              "after:content-[''] after:absolute after:bg-black after:h-4 after:w-4 after:rounded-full",

                            data.vote_average % 1 !== 0 &&
                              index + 1 === Math.ceil(data.vote_average) &&
                              "after:content-[''] after:absolute  after:h-4 after:w-4 after:rounded-full after:bg-gradient-to-r from-black to-slate-100"
                          )}
                        ></span>
                      );
                    })}
                  </div>
                  <div className="ml-2 text-[#666] text-sm">
                    <span>
                      {data.vote_average.toFixed(1)} &bull; {data.vote_count}{" "}
                      Reviews
                    </span>
                  </div>
                </div>
                <div className="max-w-[600px] mt-2 mb-4 text-[#666]">
                  {data.overview}
                </div>
                <div className="max-w-[600px] mt-2 mb-8 text-[#666] flex gap-2">
                  {data.genres.map(
                    ({ id, name }: { id: number; name: string }) => (
                      <span
                        className="px-4 py-2 bg-[#f2f2f2] text-[#333] rounded-full text-sm"
                        key={id}
                      >
                        {name}
                      </span>
                    )
                  )}
                </div>
                <h3>
                  <strong className="font-bld">Director</strong>{" "}
                </h3>
                <h4 className="mr-4 text-[#333] underline underline-offset-4 mb-4 mt-2">
                  {
                    castData.crew.find(
                      (member: any) => member.department === "Directing"
                    ).name
                  }
                </h4>
                <h3 className="font-md">Cast</h3>
                <div className="max-w-[600px] mt-2 mb-8 text-[#666] flex flex-wrap">
                  {castData.cast.map(
                    ({ id, name }: { id: number; name: string }) => (
                      <h4
                        className="mr-4 text-[#333] underline underline-offset-4"
                        key={id}
                      >
                        {name}
                      </h4>
                    )
                  )}
                </div>
              </main>
              <aside className="w-full md:w-2/5 flex flex-col">
                <div className="relative w-full h-[660px]">
                  <Image
                    src={`http://image.tmdb.org/t/p/w500${data.poster_path}`}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default MovieDetailPage;

export const getServerSideProps: GetServerSideProps = async ({
  res,
  params,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${params?.id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`
  );
  const castResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${params?.id}/credits?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`
  );
  const data = await movieResponse.json();
  const castData = await castResponse.json();

  return {
    props: { data, castData },
  };
};
