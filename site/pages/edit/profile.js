import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import UserHeader from "@/components/UserHeader";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const profile = () => {
  const router = useRouter();
  const { userData, setUserData } = useContext(UserContext);
  const [social, setSocial] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    github: "",
  });
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(
    "https://cdn-icons-png.flaticon.com/128/924/924915.png"
  );

  const handleSocial = (e) => {
    setSocial({
      ...social,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setBio(userData.bio);
      setAvatar(userData.avatar);
    }
  }, [userData]);

  const saveProfile = (e) =>{
    e.preventDefault();
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/save/profile`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem("LinkTreeToken"),
        name:name,
        bio:bio,
        avatar:avatar
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") return toast.error(data.error);
        toast.success("Profile saved successfully");
      });
  }

  const saveSocials = (e) => {
    e.preventDefault();
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/save/socials`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem("LinkTreeToken"),
        socials: social,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") return toast.error(data.error);
        toast.success("Socials saved successfully");
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("LinkTreeToken")) return router.push("/login");
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/load/socials`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem("LinkTreeToken"),
      })
    }).then(res=>res.json())
    .then(data=>{
        if(data.status==="error") return toast.error(data.error);
        setSocial(data.socials)
    })
  }, []);

  return (
    <>
      <div>
        <UserHeader />
        <main>
          <section>
            <div>
              <h4 className="font-bold text-center mb-5">Edit Profile</h4>
              <div>
                <form onSubmit={saveProfile} className="flex flex-col justify-center items-center">
                  <span className="mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-7 h-10 mr-2" src="/svg/user.svg" alt="" />
                    <input
                      className="w-full outline-none px-3 py-2 rounded-md focus:outline-none"
                      type="text"
                      placeholder="Set a Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </span>
                  <span className="mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-7 h-10 mr-2" src="/svg/bio.svg" alt="" />
                    <input
                      className="w-full outline-none px-3 py-2 rounded-md focus:outline-none"
                      type="text"
                      placeholder="Enter Your Bio"
                      required
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </span>
                  <span className="mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-7 h-10 mr-2" src="/svg/user.svg" alt="" />
                    <input
                      className="w-full outline-none px-3 py-2 rounded-md focus:outline-none"
                      type="text"
                      placeholder="Enter Image Link"
                      required
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                    />
                    <img
                      className="w-10 rounded-full border-2 border-white shadow-md"
                      src={avatar}
                    />
                  </span>
                  <input
                    className="bg-green-500 w-32 px-4 py-2 rounded-md border-2 border-green-800 shadow-md cursor-pointer text-white"
                    type="submit"
                    value="Save Profile"
                  />
                </form>
              </div>
            </div>
            <div className="mt-14">
              <h4 className="font-bold text-center mb-5">Edit Socials</h4>
              <div>
                <form
                  onSubmit={saveSocials}
                  className="flex flex-col justify-center items-center"
                >
                  <span className="mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img
                      className="w-7 h-10 mr-2"
                      src="/svg/facebook.svg"
                      alt=""
                    />
                    <input
                      id="facebook"
                      className="w-full outline-none px-3 py-2 rounded-md focus:outline-none"
                      type="text"
                      placeholder="Enter Facebook ID"
                      required
                      value={social.facebook}
                      onChange={handleSocial}
                    />
                  </span>
                  <span className="mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img
                      className="w-7 h-10 mr-2"
                      src="/svg/instagram.svg"
                      alt=""
                    />
                    <input
                      id="instagram"
                      className="w-full outline-none px-3 py-2 rounded-md focus:outline-none"
                      type="text"
                      placeholder="Enter Instagram ID"
                      required
                      value={social.instagram}
                      onChange={handleSocial}
                    />
                  </span>
                  <span className="mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-7 h-10 mr-2" src="/svg/twt.svg" alt="" />
                    <input
                      id="twitter"
                      className="w-full outline-none px-3 py-2 rounded-md focus:outline-none"
                      type="text"
                      placeholder="Enter Twitter ID"
                      required
                      value={social.twitter}
                      onChange={handleSocial}
                    />
                  </span>
                  <span className="mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img
                      className="w-7 h-10 mr-2"
                      src="/svg/lnkdn.svg"
                      alt=""
                    />
                    <input
                      id="linkedin"
                      className="w-full outline-none px-3 py-2 rounded-md focus:outline-none"
                      type="text"
                      placeholder="Enter Linkedin ID"
                      required
                      value={social.linkedin}
                      onChange={handleSocial}
                    />
                  </span>
                  <span className="mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img
                      className="w-7 h-10 mr-2"
                      src="/svg/github.svg"
                      alt=""
                    />
                    <input
                      id="github"
                      className="w-full outline-none px-3 py-2 rounded-md focus:outline-none"
                      type="text"
                      placeholder="Enter Github ID"
                      required
                      value={social.github}
                      onChange={handleSocial}
                    />
                  </span>
                  <span className="mb-3 w-11/12 m-auto flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                    <img className="w-7 h-10 mr-2" src="/svg/yt.svg" alt="" />
                    <input
                      id="youtube"
                      className="w-full outline-none px-3 py-2 rounded-md focus:outline-none"
                      type="text"
                      placeholder="Enter Youtube ID @"
                      required
                      value={social.youtube}
                      onChange={handleSocial}
                    />
                  </span>
                  <input
                    className="bg-green-500 w-32 mb-10 px-4 py-2 rounded-md border-2 border-green-800 shadow-md cursor-pointer text-white"
                    type="submit"
                    value="Save Socials"
                  />
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default profile;
