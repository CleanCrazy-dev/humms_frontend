import type { NextPage } from "next";
import Head from "next/head";
import { Token } from "@config/types";
import Pool from "@views/Pool";

type StringOrNumber = string | number;

export type PoolType = {
  token: Token;
  coverageRatio: StringOrNumber;
  poolsDeposite: StringOrNumber;
  voulume: StringOrNumber;
  myDeposite: StringOrNumber;
  rewards: StringOrNumber;
  baseAPR: StringOrNumber;
  medianBostedAPR: StringOrNumber;
  myBostedAPR: StringOrNumber;
};

const PoolPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hummus Exchange | Pools</title>
        <meta name="description" content="Hummus Exchange | Pools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Pool />
    </div>
  );
};

export default PoolPage;
