import React from "react";
import Link from "next/link";

const SocialTree = ({ social }) => {
  const { facebook, twitter, instagram, youtube, linkedin, github } = social;
  return (
    <>
    <div className="social flex flex-row justify-center my-4">
      <Link className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none" target="_blank" href={`${facebook}`}>
        <img src="/svg/facebook.svg" alt="" className="w-6"/>
      </Link>
      <Link className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none" target="_blank" href={`${instagram}`}>
        <img src="/svg/instagram.svg" alt="" className="w-6"/>
      </Link>
      <Link className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none" target="_blank" href={`${youtube}`}>
        <img src="/svg/yt.svg" alt="" className="w-6"/>
      </Link>
      <Link className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none" target="_blank" href={`${linkedin}`}>
        <img src="/svg/lnkdn.svg" alt="" className="w-6"/>
      </Link>
      <Link className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none" target="_blank" href={`${github}`}>
        <img src="/svg/github.svg" alt="" className="w-6"/>
      </Link>
      <Link className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-all duration-500 hover:scale-110 shadow border border-gray-70 mx-1 select-none" target="_blank" href={`${twitter}`}>
        <img src="/svg/twt.svg" alt="" className="w-6"/>
      </Link>
    </div>
    </>
  )
};

export default SocialTree;
