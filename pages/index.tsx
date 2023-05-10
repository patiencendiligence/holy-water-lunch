import { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/client";

import Chip from "../components/common/Chip";
import SvgButton from "../components/common/SvgButton";
import Seo from "components/common/Seo";

const lunchType = [
  {
    name: "RANDOM",
    color: " #ee7c01",
    width: "43%",
    href: "/lunch/RandomLunch",
    type: "normal",
  },
  {
    name: "JAPANESE",
    color: "#c766e7",
    width: "48%",
    href: "/lunch/japanese",
    type: "normal",
  },
  {
    name: "ASIAN",
    color: "#5390f2",
    width: "31%",
    href: "/lunch/asian",
    type: "svg",
  },
  {
    name: "🍔",
    color: "#f6c101",
    width: "20%",
    href: "/lunch/burger",
    type: "normal",
  },
  {
    name: "CHINESE",
    color: "#f6c101",
    width: "35%",
    href: "/lunch/chinese",
    type: "normal",
  },
  {
    name: "ALL",
    color: "#c165e5",
    width: "47%",
    href: "/lunch/LunchList",
    type: "normal",
  },
  {
    name: "+",
    color: " #568EFF",
    width: "42%",
    href: "/AddLunch",
    type: "normal",
  },
  {
    name: "🥪",
    color: "#c21",
    width: "18%",
    href: "/lunch/sandwich",
    type: "normal",
  },
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
    width: "28%",
    href: "/lunch/italian",
    type: "normal",
  },
  {
    name: "☕️ & 🥐",
    color: "#a60",
    width: "42%",
    href: "/lunch/coffee",
    type: "normal",
  },
  { name: "?", color: "#047462", width: "18%", href: "/about", type: "normal" },
  {
    name: "💬",
    color: "#c766e7",
    width: "18%",
    href: "/chat",
    type: "normal",
  },
];
export default function Home() {
  useEffect(() => {
    //do something on page load
  }, []);
  return (
    <div className="sm:px-0 lg:px-15 text-lg w-full text-gray-600 my-2 mx-auto overflow-hidden bg-black min-h-screen">
      <Seo title="HOLY WATER LUNCH" />
      <div className="max-w-4xl w-90 mx-auto mt-10">
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
      </div>
    </div>
  );
}
