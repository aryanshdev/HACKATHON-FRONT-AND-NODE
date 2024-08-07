import React, { useState } from "react";
import InsideNav from "./InsideNav";
import toast from "react-hot-toast";
import AnimatedGridPattern from "../magicui/animated-grid-pattern";

const DownloadModels = () => {
  const [cleanedCSV, setCleanedCSV] = useState(null);
  const [svm, setSVM] = useState(null);
  const [randomForest, setRandomForest] = useState(null);
  const [bagging, setBagging] = useState(null);
  const [xgboost, setXGBoost] = useState(null);
  const [decisionTree, setdecisionTree] = useState(null);
  const getAllDownloads = async () => {
    fetch("/app/downloadFiles", {
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCleanedCSV(data["cleanedCSV"]);
        setSVM(data["svm"]);
        setBagging(data["bagging"]);
        setRandomForest(data["random_forest"]);
        setdecisionTree(data["decision_tree"]);
        setXGBoost(data["xgboost"]);
      });
  };
  const closeSession = async () => {
    fetch("/app/closeSession", {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        toast.success("Session Closed Successfully");
      });
  };
  return (
    <div
      className="overflow-hidden rounded-lg w-screen md:shadow-xl"
      onLoad={getAllDownloads}
    >
      <AnimatedGridPattern
        numSquares={120}
        maxOpacity={0.7}
        duration={2}
        repeatDelay={1}
        className={" h-full fill-white"}
      />

      <div className="relative z-50">
        <InsideNav currentPage="Downloads" />

        <div className="p-5 px-16 w-screen h-full mt-16 -z-10 justify-center">
          <div className="m-auto shadow-lg h-[85vh] p-7 bg-[#171717] flex-col overflow-x-hidden overflow-y-auto text-white rounded-2xl w-11/12">
            <h1 style={{ fontSize: "30px", fontWeight: "bolder" }}>
              {" "}
              <i
                className="fa-solid fa-download"
                style={{ color: "#036EFD" }}
              ></i>{" "}
              &nbsp; Download Files
            </h1>
            {/* DOWNLOAD BUTTONS */}
            <div className="flex w-1/2 flex-col gap-8 my-6 ">
              {/* CLEAND CSV */}
              <div className="flex w-full justify-between gap-6 align-middle">
                <h2 className="font-bold text-xl">Download Cleaned CSV</h2>
                <a
                  download
                  href={"file://" + cleanedCSV}
                  className="bg-white py-2 px-6 text-blue-600 rounded-full font-semibold cursor-default"
                >
                  <i className="fa-solid fa-download"></i> Download
                </a>
              </div>

              <div
                className={
                  (svm ? "flex" : "hidden") +
                  " w-full justify-between gap-6 align-middle"
                }
              >
                <h2 className="font-bold text-xl">Download SVM (RBF)</h2>
                <a
                  download
                  href={"file://" + svm}
                  className="bg-white py-2 px-6 text-blue-600 rounded-full font-semibold cursor-default"
                >
                  <i className="fa-solid fa-download"></i> Download
                </a>
              </div>

              <div
                className={
                  (randomForest ? "flex" : "hidden") +
                  " w-full justify-between gap-6 align-middle"
                }
              >
                <h2 className="font-bold text-xl">Download Random Forest</h2>
                <a
                  download
                  href={"file://" + randomForest}
                  className="bg-white py-2 px-6 text-blue-600 rounded-full font-semibold cursor-default"
                >
                  <i className="fa-solid fa-download"></i> Download
                </a>
              </div>

              <div
                className={
                  (decisionTree ? "flex" : "hidden") +
                  " w-full justify-between gap-6 align-middle"
                }
              >
                <h2 className="font-bold text-xl">Download Decision Tree</h2>
                <a
                  download
                  href={"file://" + decisionTree}
                  className="bg-white py-2 px-6 text-blue-600 rounded-full font-semibold cursor-default"
                >
                  <i className="fa-solid fa-download"></i> Download
                </a>
              </div>

              <div
                className={
                  (xgboost ? "flex" : "hidden") +
                  " w-full justify-between gap-6 align-middle"
                }
              >
                <h2 className="font-bold text-xl">Download XG Boost</h2>
                <a
                  download
                  href={"file://" + xgboost}
                  className="bg-white py-2 px-6 text-blue-600 rounded-full font-semibold cursor-default"
                >
                  <i className="fa-solid fa-download"></i> Download
                </a>
              </div>

              <div
                className={
                  (bagging ? "flex" : "hidden") +
                  " w-full justify-between gap-6 align-middle"
                }
              >
                <h2 className="font-bold text-xl">Download Bagging</h2>
                <a
                  download
                  href={"file://" + bagging}
                  className="bg-white py-2 px-6 text-blue-600 rounded-full font-semibold cursor-default"
                >
                  <i className="fa-solid fa-download"></i> Download
                </a>
              </div>
            </div>
            <div className="flex flex-row gap-4 w-full justify-between align-middle items-center font-semibold text-lg py-4 text-gray-300">
              <ul className="px-3 py-1 gap-2 list-disc list-inside">
                <li>
                  All Files Will Be Automatically Deleted After 2 Days. Make
                  Sure To Download Needed Files Before That.
                </li>

                <li>
                  {" "}
                  Close This Session When Done. By Default This Session Will Be
                  Closed After 2 Days.
                </li>
              </ul>
            </div>
            <div className="flex flex-row gap-4 w-full justify-between align-middle items-center">
              <button className="bg-white text-blue-500 font-bold text-lg px-4 py-2 rounded-full" >
                <i className="fa-solid fa-user scale-100 pr-4"></i>
                Logout
              </button>
              <div className="flex flex-col gap-3 w-fit justify-center items-center font-semibold">
                <button className="bg-white text-blue-500 font-bold text-lg px-4 py-2 rounded-full w-fit " onClick={closeSession}>
                  Close This Session
                </button>
                Closing Session Deletes All Models And Datasets
                <br />
                And Clears All Your Data Giving You A Fresh Start
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModels;
