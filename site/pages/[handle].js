import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import LinkTree from "@/components/LinkTree";
import Link from "next/link";
import SocialTree from "@/components/SocialTree";
import ShareButton from "@/components/ShareButton";

const Handle = () => {
  const [data, setData] = useState({});
  const [userFound, setUserFound] = useState(false);
  const router = useRouter();

  const [social, setSocial] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    github: "",
  });

  useEffect(() => {
    if (router.query?.handle) {
      fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/get/${router.query.handle}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "error") return toast.error(data.error);
          if (data.status === "success") {
            setData(data.userData);
            setSocial(data.socials);
            setUserFound(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.query]);

  

  if (!userFound) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="not-found px-3">
          <h1 className="font-bold text-lg">User Not Found👎👎</h1>
          <p>
            Looking for a user?
            <br /> Check the handle
          </p>
          Create your own{" "}
          <Link
            className="bg-indigo-600 px-2 ml-2 text-white hover:bg-indigo-400 transition-all duration-500"
            href="/apply"
          >
            LinkTree
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ShareButton/>
      <LinkTree data={data} />
      <SocialTree social={social} />
    </div>
  );
};

export default Handle;
