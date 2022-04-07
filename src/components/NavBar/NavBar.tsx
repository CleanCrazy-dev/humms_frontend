import { useSettingsModalToggle } from "@state/application/hooks";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
const navStyles =
  "px-12 py-3 font-medium cursor-pointer rounded-full hover:bg-darkBlue/5 duration-100 text-dark/40 select-none block";
const activeNavStyles = "!bg-darkOrange !text-white";

interface NavType {
  title: ReactNode;
  url: string;
}
const navs: NavType[] = [
  {
    title: "Swap",
    url: "/swap",
  },
  {
    title: "Pool",
    url: "/pool",
  },
  {
    title: "veHUM",
    url: "/stake",
  },
];

const NavBar = ({ path }: { path: string }) => {
  const [toggleSettingsModal] = useSettingsModalToggle()

  return (
    <div className="flex flex-row justify-center content-center w-full mt-20 px-5 md:px-0">
      <div className="relative flex flex-col-reverse items-end gap-5">
        <ul className="flex flex-row justify-center items-center bg-white rounded-full overflow-hidden p-2">
          {navs.map((nav: NavType, index: number) => (
            <li key={index}>
              <Link href={nav.url} prefetch={true}>
                <a
                  className={`${navStyles} ${
                    path === nav.url ? activeNavStyles : ""
                  }`}
                >
                  {nav.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleSettingsModal}
          className="sm:absolute top-1/2 left-[calc(100%+30px)] w-12 h-12 rounded-full text-dark/40 sm:-translate-y-1/2 bg-white flex items-center justify-center duration-150 hover:scale-105 hover:bg-darkOrange hover:text-white"
        >
          <AiOutlineSetting size={28} />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
