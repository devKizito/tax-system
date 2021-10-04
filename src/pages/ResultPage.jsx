import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckIcon, CheckCircleIcon } from "@heroicons/react/outline";
const ResultPage = ({ response }) => {
  return (
    <div className="bg-white flex justify-center mt-40">
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0.6 }}
        className="border-2 border-gray-100 w-1/2"
      >
        <div className="pb-6 sm:pb-8 lg:pb-12">
          <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
            <section className="flex flex-col items-center">
              <div className="max-w-xl flex flex-col items-center text-center pt-8 lg:pt-32 pb-0 sm:pb-16 lg:pb-32">
                <h1 className="text-green-500 text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 flex flex-col items-center">
                  <motion.div
                    animate={{ scale: 2 }}
                    initial={{ scale: "0" }}
                    transition={{ delay: 1 }}
                    className=""
                  >
                    <CheckCircleIcon className="w-8 h-8 mb-2 mb-20" />
                  </motion.div>
                  Payment Successful
                </h1>
                <div className="w-full flex flex-col sm:flex-row sm:justify-center gap-2.5">
                  <Link
                    to="/"
                    className="inline-block bg-white hover:bg-gray-100 active:bg-gray-200 focus-visible:ring ring-indigo-300 border text-gray-500 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                  >
                    {" "}
                    Back to Homepage
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultPage;
