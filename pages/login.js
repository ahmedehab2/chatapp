import { useAuthContext } from "context/AuthContext";
import Head from "next/head";
import React from "react";
import { Toaster } from "react-hot-toast";

const login = () => {
  const { sign } = useAuthContext();
  return (
    <>
      <Head>
        <title>Textto</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Toaster />
      <section className="pt-40 bg-gray-50 dark:bg-gray-900 h-screen">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black dark:text-gray-100 sm:text-4xl lg:text-5xl">
              Welcome!
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
              Login or Signup With Google account
            </p>
          </div>

          <div className="relative max-w-md mx-auto mt-8 md:mt-16">
            <div className="overflow-hidden bg-gray-200 dark:bg-gray-800 rounded-md shadow-md">
              <div className="px-4 py-6 sm:px-8 sm:py-7 ">
                <div className="space-y-5 flex">
                  <button
                    onClick={sign}
                    type="button"
                    className="relative inline-flex items-center justify-center w-full mt-4 px-4 py-4 text-base font-semibold text-gray-700 dark:text-gray-100 transition-all duration-200 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                  >
                    <div className="absolute inset-y-0 left-0 p-4">
                      <svg
                        className="w-6 h-6 text-rose-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                      </svg>
                    </div>
                    Login with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default login;
