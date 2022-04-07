import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Swap from "@views/Swap";

const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hummus Exchange</title>
        <meta name="description" content="Hummus Exchange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Swap />
    </div>
  );
};

export default HomePage;
