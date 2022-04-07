import Stake from "@views/Stake";
import type { NextPage } from "next";
import Head from "next/head";

const StakePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hummus Exchange | Stake</title>
        <meta name="description" content="Hummus Exchange | Stake" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stake />
    </div>
  );
};

export default StakePage;
