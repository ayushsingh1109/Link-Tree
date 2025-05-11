import React, { useEffect, useState, useContext } from "react";
import LinkBox from "@/components/LinkBox";
import UserHeader from "@/components/UserHeader";
import { toast } from "react-toastify";
import UserContext from "../context/userContext";

const dashboard = () => {
  const [data, setData] = useState({});
  const { setUserData } = useContext(UserContext);
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
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") return toast.error("error loading");
        setData(data.userData);
        setUserData(data.userData);
        localStorage.setItem("userHandle", data.userData.handle);
      
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>
        <UserHeader/>
        <main>
          <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            <LinkBox
              lbTitle="Links"
              lbNumber={data.links}
              lbSvg="url"
              lbTheme="red"
            />
            <LinkBox
              lbTitle="Growth"
              lbNumber="20%"
              lbSvg="growth"
              lbTheme="blue"
            />
            <LinkBox
              lbTitle="Mails"
              lbNumber="12"
              lbSvg="email"
              lbTheme="red"
            />
            <LinkBox
              lbTitle="Contacts"
              lbNumber="164"
              lbSvg="ig"
              lbTheme="blue"
            />
          </section>
          <section></section>
        </main>
      </div>
    </>
  );
};

export default dashboard;
