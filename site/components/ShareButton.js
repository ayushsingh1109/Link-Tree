import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const ShareButton = () => {
  const router = useRouter();
  const copyLink = () => {
    // change to env variable with address
    navigator.clipboard.writeText(
      process.env.NEXT_PUBLIC_CLIENT_URL + `/${router.query.handle}`
    );
    toast("Copied to clipboard");
  };

  return (
    <>
      <div
        onClick={copyLink}
        className="absolute cursor-pointer top-28 left-10 bg-indigo-200 p-2 rounded-md z-10 shadow-md border-2 border-indigo-400"
      >
        <img className="w-4" alt="share" src="/svg/share.svg" />
      </div>
    </>
  );
};

export default ShareButton;
