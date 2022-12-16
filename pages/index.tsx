import { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/client";
import styled from "@emotion/styled";
import Chip from "../components/common/Chip";
import SvgButton from "../components/common/SvgButton";
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: space-evenly;
  align-items: center;
`;
const lunchType = [
  {
    name: "RANDOM",
    color: " #ee7c01",
    width: "45%",
    href: "/lunch/random",
    type: "normal",
  },
  {
    name: "JAPANESE",
    color: "#c766e7",
    width: "35%",
    href: "/lunch/japanese",
    type: "normal",
  },
  {
    name: "THAILAND",
    color: "#5390f2",
    width: "28%",
    href: "/lunch/thailand",
    type: "svg",
  },
  {
    name: "CHINESE",
    color: "#f6c101",
    width: "35%",
    href: "/lunch/chinese",
    type: "normal",
  },
  { name: "?", color: "#047462", width: "25%", href: "/about", type: "normal" },
  { name: "+", color: " #568EFF", width: "50%", href: "/add", type: "normal" },
  {
    name: "KOREAN",
    color: "#0253c2",
    width: "38%",
    href: "/lunch/korean",
    type: "normal",
  },
  {
    name: "ITALIAN",
    color: "#117237",
    width: "42%",
    href: "/lunch/italian",
    type: "normal",
  },
  {
    name: "ALL",
    color: "#c165e5",
    width: "20%",
    href: "/lunch/LunchList",
    type: "normal",
  },
  {
    name: "☕️ & 🥐",
    color: "#a60",
    width: "18%",
    href: "/lunch/coffee",
    type: "normal",
  },
];
export default function Home() {
  useEffect(() => {
    //do something on page load
  }, []);
  return (
    <>
      <HomeContainer>
        <div className="mx-auto sm:px-0 lg:px-20 text-xl sm:w-full lg:w-1/2 text-gray-600 my-2 max-w-7xl">
          <>
            {lunchType.map((item: any, index: number) => (
              <Link href={item.href} key={index}>
                {item.type !== "svg" ? (
                  <Chip
                    width={item.width}
                    color={item.color}
                    outlined={[2, 4, 5, 8].indexOf(index) > -1}
                    isBounce={index === 0}
                    text={item.name}
                  >
                    {index === 5 ? (
                      <span
                        className="animate-ping absolute inline-flex rounded-full bg-sky-400 opacity-75"
                        style={{
                          top: "50%",
                          left: " 50%",
                          width: "50px",
                          margin: "-25px 0 0 -25px",
                          height: " 50px",
                        }}
                      ></span>
                    ) : (
                      ""
                    )}
                  </Chip>
                ) : (
                  <SvgButton
                    width={item.width}
                    color={item.color}
                    index={index}
                    text={item.name}
                  ></SvgButton>
                )}
              </Link>
            ))}
          </>
        </div>
      </HomeContainer>
    </>
  );
}
