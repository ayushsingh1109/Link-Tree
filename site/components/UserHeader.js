import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import UserContext from "../context/userContext";
import { toast } from "react-toastify";

const UserHeader = () => {
  // const { name, role, avatar, handle, links } = data;
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const { userData, setUserData } = useContext(UserContext);
  const { role, avatar, handle } = userData;

  useEffect(() => {
    if (!localStorage.getItem("LinkTreeToken")) {
      return (window.location.href = "/login");
    }

    fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/data/dashboard`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem("LinkTreeToken"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") return toast.error("error loading");
        // setData(data.userData);
        setUserData(data.userData);
        localStorage.setItem("userHandle", data.userData.handle);
        // toast.success(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <header className="flex flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row p-5">
          <Link href="/edit/links">
            <button className="inline-flex w-full md:w-auto px-5 py-3 text-purple-500 font-bold hover:text-purple-700 hover:bg-purple-100 rounded-md mb-3 border-2 border-purple-500">
              <img src="/svg/url.svg" className="w-6 mr-3" />
              Edit Links
            </button>
          </Link>
          <Link href="/edit/profile">
            <button className="inline-flex w-full md:w-auto px-5 py-3 text-red-500 font-bold hover:text-red-700 hover:bg-red-100 rounded-md mb-3 border-2 border-red-500 md:ml-4">
              <img src="/svg/user.svg" className="w-6 mr-3" />
              Edit Profile
            </button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-1 items-center justify-center">
          <Link href={process.env.NEXT_PUBLIC_CLIENT_URL + `/${handle}`}>
            <div className="inline-flex mr-2 text-right items-center bg-gray-200 px-3 py-2 rounded-lg">
              <div className="text-xs md:text-md flex flex-col flex-wrap">
                <span className="font-bold">{handle}</span>
                <span>{role} Pack</span>
              </div>
              <div className="user-img">
                <img className="rounded-full w-10 ml-5" src={avatar} />
              </div>
            </div>
          </Link>
          <div className="flex items-center justify-center gap-3">
            <Link href={process.env.NEXT_PUBLIC_CLIENT_URL + `/${handle}`}>
              <div className="bg-gray-200 px-2 py-2 mx-2 rounded-lg text-center">
                <span className="font-medium">My Tree🌲</span>
              </div>
            </Link>
            <div>
              <img
                className="w-6 mr-5 cursor-pointer"
                src="/svg/logout.svg"
                alt=""
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default UserHeader;
