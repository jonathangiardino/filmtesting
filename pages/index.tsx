import type { NextPage } from "next";
import useSWR from "swr";
import Head from "next/head";
import Footer from "../components/Footer";

// Cmponents
import Header from "../components/Header";
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

const Home: NextPage = () => {
  const { data } = useSWR(
    "https://api.themoviedb.org/3/movie/popular?api_key=44107d49ea12440cb98fa5c8b8d38851",
    fetcher
  );

  if (data) {
    console.log(data);
  }

  return (
    <>
      <NextHead />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex w-full flex-1 flex-col max-w-[1330px] mx-auto">
          <Hero />
          <List data={data}/>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;
