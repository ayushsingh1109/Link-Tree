import React, { useState } from "react";
import styles from "../styles/apply.module.css";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";

const Apply = () => {

const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = (e) => {
    e.preventDefault();
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast("You are logged in!");
          localStorage.setItem("LinkTreeToken", data.token);
          router.push('/dashboard')
        }
        else if (data.status === "error") {
          toast.error("User not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
      setEmail("")
      setPassword("");
  };

  const handleGuest = (e)=>{
    
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email:"guest@mail.com",
        password:"12345",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.status)
        if (data.status === "success") {
          toast("You are logged in!");
          localStorage.setItem("LinkTreeToken", data.token);
          router.push('/dashboard')
        }
        else if (data.status === "error") {
          toast.error("User not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }


  return (
    <>
      <section
        className={
          styles.background + " min-h-screen flex justify-center items-center"
        }
      >
        <div className="main">
          <div className="content bg-white mb-12 border-2 px-4 py-8 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold text-center">
              Join the top 1% creators
            </h1>
            <p className="text-center">Create Linktree for your brand</p>
            <p className="text-center py-5 font-bold text-gray-500">
              Start Building Your Hub
            </p>
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4 text-lg mt-5"
            >
              <span className="flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                <img
                  className="w-7 h-10 mr-2"
                  src="/svg/email.svg"
                  alt="email"
                />
                <input
                  className="outline-none px-3 py-2 rounded-md focus:outline-none"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
              <input
                required
                className="shadow-md border-2 px-3 py-2 rounded-md focus:outline-none"
                type="password"
                placeholder="Set a Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="submit"
                value="Login"
                className="bg-indigo-600 text-white py-2 rounded-lg cursor-pointer"
              />
               <input
                type="button"
                value="Guest Login"
                className="bg-indigo-600 text-white py-2 rounded-lg cursor-pointer"
                onClick={handleGuest}
              />
             
            </form>
          </div>
          <h4 className="text-center text-white pt-1">
            {" "}
            New Here?{" "}
            <Link className="font-bold text-red-400" href="/apply">
              {" "}
              Register
            </Link>
          </h4>
        </div>
      </section>
    </>
  );
};

export default Apply;
