import React, { useState } from "react";
import { Group, Input, Select, Button } from "elementz";
import { InterswitchPay } from "react-interswitch";
import { motion } from "framer-motion";
import axios from "axios";
import ResultPage from "./ResultPage";

const Home = () => {
  const [type, setType] = useState("");
  const selectType = (value) => {
    if (value === "tax") {
      setType(value);
    }
    type === "" ? setType("") : setType("");
    type === "tax" ? setType(value) : setType(value);
    type === "sos" ? setType(value) : setType(value);
  };
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12 h-screen flex justify-center">
      <div>
        <h1 className="font-black text-4xl">Tax Payment System</h1>
        <div className="flex flex-col p-6">
          <h2 className="text-xl">Select Identification Type</h2>
          <motion.div animate={{ scale: "1" }} initial={{ scale: 0.1 }}>
            <Select.Nice
              lg
              full
              info
              className="mt-20 mw-350 text-xl"
              onChange={(value) => selectType(value)}
            >
              <option selected value="">
                Select ID Type
              </option>
              <option value="sos">Social ID</option>
              <option value="tax">Tax ID</option>
            </Select.Nice>
          </motion.div>
        </div>
        <div>
          {type === "" && ""}
          {type === "tax" && <TaxID />}
          {type === "sos" && <SocialID />}
        </div>
      </div>
    </div>
  );
};

const ErrorMessage = ({ message }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-auto"
      role="alert"
    >
      <span className="block sm:inline">ID {message.statusText}!</span>
    </div>
  );
};
const Result = ({ data }) => {
  const paymentParameters = {
    merchantCode: "MX65905",
    payItemID: "Default_Payable_MX65905",
    customerEmail: "johndoe@gmail.com",
    redirectURL: "http://localhost:3000",
    text: "Pay Now",
    mode: "TEST",
    transactionReference: Date.now().toString(),
    amount: "10000",
    style: {
      fontWeight: "bold",
      border: "none",
      color: "#fff",
      backgroundColor: "transparent",
    },
    callback: (response) => {
      console.log("response: ", response);
      <ResultPage response={response} />;
      window.location.href = "http://localhost:3000/result";
    },
  };
  return (
    <motion.div
      animate={{ scale: 1 }}
      initial={{ scale: 0.6 }}
      className="border-2 border-gray-100"
    >
      <div className="pb-6 sm:pb-8 lg:pb-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <section className="flex flex-col items-center">
            <div className="max-w-xl flex flex-col items-center text-center pt-8 pb-0 sm:pb-16 lg:pb-32">
              <h1 className="text-black-800 text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12">
                {data.firstname} {data.lastname}
              </h1>

              <p className="text-gray-500 xl:text-lg leading-relaxed mb-8 md:mb-12">
                {data.email}
              </p>

              <div className="w-full flex flex-col sm:flex-row sm:justify-center gap-2.5">
                <span className="inline-block bg-red-500 hover:bg-red-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                  <InterswitchPay {...paymentParameters} />
                </span>

                <a
                  href="#"
                  className="inline-block bg-white hover:bg-gray-100 active:bg-gray-200 focus-visible:ring ring-indigo-300 border text-gray-500 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                >
                  Review Invoice{" "}
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

const SocialID = () => {
  const [fetchID, setFetchID] = useState("");
  const [fetchIDError, setFetchIDError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    const sosID = document.getElementById("sosID");
    if (sosID.value.length === 0) {
      alert("Please Enter Your Social ID");
      setFetchID("");
      setFetchIDError(null);
      return;
    }
    axios
      .get(`http://localhost:5000/users/${sosID.value}`)
      .then(({ data }) => {
        if (data.length > 0) {
          setFetchID("");
          return;
        }
        setFetchID(data);
        setFetchIDError(null);
      })
      .catch((err) => {
        setFetchIDError(err.response);
        setFetchID("");
      });
  };
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12 h-screen">
      <div className="flex flex-col p-6">
        <h2 className="text-xl">Enter Social ID</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Group space>
            <Input
              lg
              info
              full
              id="sosID"
              className="mt-20 mw-350 text-xl"
              placeholder="Enter Social ID"
            />
            <Button
              lg
              icon="refresh-double"
              effect="Verify"
              success
              className=""
              type="submit"
            >
              Verify ID
            </Button>
          </Group>
        </form>
      </div>
      <div className="flex flex-col p-6">
        {fetchID && <Result data={fetchID} />}
        {fetchIDError && <ErrorMessage message={fetchIDError} />}
      </div>
    </div>
  );
};

const TaxID = () => {
  const [fetchID, setFetchID] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const taxID = document.getElementById("taxID");

    const response = axios.get(`http://localhost:5000/users/${taxID.value}`);
    response
      .then(({ data }) => {
        console.log(data);
        setFetchID(data);
      })
      .catch((err) => {
        console.log(err);
        setFetchID("");
      });
  };
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12 h-screen">
      <div className="flex flex-col p-6">
        <h2 className="text-xl">Enter Tax ID</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Group space>
            <Input lg info full id="taxID" className="mt-20 mw-350 text-xl" />
            <Button
              lg
              icon="refresh-double"
              effect="Verify"
              success
              className=""
              type="submit"
            >
              Verify ID
            </Button>
          </Group>
        </form>
      </div>
      <div className="flex flex-col p-6">
        {fetchID && <Result data={fetchID} />}
      </div>
    </div>
  );
};
export default Home;
