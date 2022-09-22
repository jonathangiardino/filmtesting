import React, { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";

const MovieDetailPage: FC<any> = ({
  data,
  castData,
  reviewsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(data);

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
                <div className="mt-16 mb-8">
                  {reviewsData?.results.length ? (
                    <h2 className="text-4xl font-md mb-2 hover:underline hover:underline-offset-4 hover:decoration-4 hover:cursor-pointer transition">
                      {data.title} reviews ({reviewsData?.results.length})
                    </h2>
                  ) : (
                    <h2 className="text-4xl font-md mb-2 hover:underline hover:underline-offset-4 hover:decoration-4 hover:cursor-pointer transition">
                      No reviews for {data.title} found
                    </h2>
                  )}
                </div>
                <div>
                  {reviewsData?.results.map((review: any) => {
                    const formattedAvatar =
                      review.author_details?.avatar_path &&
                      review.author_details?.avatar_path.startsWith("/http")
                        ? review.author_details?.avatar_path.replace(
                            "/http",
                            "http"
                          )
                        : `http://image.tmdb.org/t/p/w500${review.author_details?.avatar_path}`;

                    return (
                      <div className="mb-8 pb-4 border-b border-b-1 border-gray-300">
                        <header className="flex items-center mb-4">
                          {review.author_details.avatar_path ? (
                            <div className="relative rounded-full h-[44px] w-[44px]">
                              <Image
                                src={formattedAvatar}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                              />
                            </div>
                          ) : (
                            <div className="rounded-full h-[44px] w-[44px] bg-black text-white flex justify-center items-center font-bld">
                              {review.author.split("")[0]}
                            </div>
                          )}
                          <div className="flex flex-col ml-3">
                            {review.author_details.name && (
                              <span className="text-sm font-bld opacity-50">
                                {review.author_details.name}
                              </span>
                            )}
                            <span className="text-sm font-bld">
                              {review.author_details.username}
                            </span>
                          </div>
                        </header>

                        <div className="py-2 flex gap-1 items-center">
                          {Array.from(Array(10).keys()).map((key, index) => (
                            <>
                              <span
                                key={key}
                                className={clsx(
                                  "h-4 w-4 rounded-full bg-[#e5e5e5] relative",
                                  index + 1 <
                                    Math.ceil(review.author_details.rating) &&
                                    "after:content-[''] after:absolute after:bg-black after:h-4 after:w-4 after:rounded-full",

                                  review.author_details.rating % 1 !== 0 &&
                                    index + 1 ===
                                      Math.ceil(review.author_details.rating) &&
                                    "after:content-[''] after:absolute  after:h-4 after:w-4 after:rounded-full after:bg-gradient-to-r from-black to-slate-100"
                                )}
                              />
                            </>
                          ))}
                          {!review.author_details.rating && (
                            <span className="ml-1 text-xs opacity-50">
                              No rating
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="text-lg my-4">
                            <ReactMarkdown>{review.content}</ReactMarkdown>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {data.backdrop_path && (
                    <div className="relative w-full h-[330px]">
                      <Image
                        src={`http://image.tmdb.org/t/p/w500${data.backdrop_path}`}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
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

  const url = "https://api.themoviedb.org/3/movie/";
  const API_KEY = `?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`;

  const movieResponse = fetch(`${url}${params?.id}${API_KEY}`);
  const castResponse = fetch(`${url}${params?.id}/credits${API_KEY}`);
  const reviewsResponse = fetch(`${url}${params?.id}/reviews${API_KEY}`);

  const [data, castData, reviewsData] = await Promise.all([
    movieResponse,
    castResponse,
    reviewsResponse,
  ]);

  const dataJson = await data.json();
  const castJson = await castData.json();
  const reviewsJson = await reviewsData.json();

  return {
    props: {
      data: dataJson,
      castData: castJson,
      reviewsData: reviewsJson,
    },
  };
};
