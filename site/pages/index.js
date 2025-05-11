import Link from "next/link";
import styles from "../styles/apply.module.css";

export default function Home() {
  return (
    <>
      <section
        className={
          styles.background + " min-h-screen flex justify-center items-center"
        }
      >
      <main className="w-full min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-center text-white">
          {" "}
          Welcome to <br />
          <span className="text-indigo-600 font-semibold">
            The LinkTree Utility
          </span>
        </h1>
        <Link
          title="Notice the page loader"
          className="bg-indigo-600 rounded-sm inline-block my-2 p-1 px-2 text-white"
          href="/login"
        >
          Start Exploring Now
        </Link>
      </main>
      </section>
    </>
  );
}
