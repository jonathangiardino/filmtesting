import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import useSWR from "swr";
import Head from "next/head";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import List from "../components/List";

const NextHead = () => (
  <Head>
    <title>&bull; filmtesting</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

const Home: NextPage = ({
  genres,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`,
    fetcher
  );

  return (
    <>
      <NextHead />
      <div className="flex min-h-screen flex-col">
        <Layout>
          <main className="flex w-full flex-1 flex-col max-w-[1330px] mx-auto">
            <Hero />
            <List data={data} genres={genres}/>
          </main>
        </Layout>
      </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const genresResponse = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`
  );
  const genresData = await genresResponse.json();
  const genres = genresData.genres.map(
    ({ id, name }: { id: number; name: string }) => ({ id, name })
  );

  return {
    props: {
      genres,
    },
  };
};
