import React, { useState } from "react";
import InsideNav from "./InsideNav";
import Models from "./Models";
import toast from "react-hot-toast";
import AnimatedGridPattern from "../magicui/animated-grid-pattern";

const RunModels = () => {
  const [tableHead, setTableHead] = useState("");
  const [tableData, setTableData] = useState("");
  const [testingSplit, setTestingSplit] = useState("25");
  document.addEventListener("DOMContentLoaded", () => {
    setTableHead(getCookie("tableHead"));
    setTableData(getCookie("tableBody"));
  });
  const [trainingSplit, setTrainSplit] = useState("75");

  const displayOutput = (data) => {
    console.log(data);
  };

  const setTargetValue = () => {
    var data = new FormData();
    data.append("code", getCookie("ssid"));
    data.append(
      "targetValue",
      document.querySelector('input[name="targetValue"]').value
    );
    fetch("/app/setTarget", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        response.json();
      })
      .then((response) => {
        toast.success(response["message"]);
      });
  };
  const updateTest = (e) => {
    if (e.target.value > 100) {
      e.target.value = 100;
    }
    setTrainSplit(e.target.value);
    setTestingSplit(100 - e.target.value);
  };
  const saveSplits = () => {
    var data = new FormData();
    var training = document.querySelector('input[name="training"]').value;
    data.append("code", getCookie("ssid"));
    data.append("trainingSplits", training);
    console.log(data);
    fetch("/app/saveSplits", {
      method: "POST",
      body: data,
    }).then((response) => {
      toast.success(response["message"]);
    });
  };

  const setEncoderStatus = () => {
    var data = new FormData();
    data.append(
      "encoderStatus",
      document.querySelector('select[name="encoderStatus"]').options[
        document.querySelector('select[name="encoderStatus"]').selectedIndex
      ].value
    );
    fetch("/app/setEncoder", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        toast.success(response["message"]);
      })
      .catch((error) => {
        toast.error("An error occured");
      });
  };

  const runSVM = () => {
    var data = new FormData();
    data.append("param1", document.getElementById("cValSVM").value);
    data.append("param2", document.getElementById("gammaValSVM").value);
    data.append("param3", document.getElementById("KernelSVM").value);
    data.append("code", getCookie("ssid"));
    fetch("/app/runSVM", {
      method: "POST",
      body: data,
    })
      .then((data) => {
        if (data["status"] == "succ") {
          displayOutput(data);
          toast.success(data["message"]);
        } else {
          toast.error(data["message"]);
        }
      })
      .catch((error) => {
        toast.error("An error occured");
      });
  };

  const runRandomForest = () => {
    var data = new FormData();
    data.append("param1", document.getElementById("nestimatorsRF").value);
    data.append("param2", document.getElementById("MaxDepthDtree").value);
    data.append("param3", document.getElementById("minSampleSplit").value);
    data.append("code", getCookie("ssid"));
    fetch("/app/runRandomForest", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        if (data["status"] == "succ") {
          displayOutput(data);
          toast.success(data["message"]);
        } else {
          toast.error(data["message"]);
        }
      })
      .catch((error) => {
        toast.error("An error occured");
      });
  };
  const runXGBoost = () => {
    var data = new FormData();
    data.append("param1", document.getElementById("NEstimatorsXG").value);
    data.append("param2", document.getElementById("MaxDepthXG").value);
    data.append("param3", document.getElementById("LearnRateXG").value);
    data.append("code", getCookie("ssid"));
    fetch("/app/runXGBoost", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        if (data["status"] == "succ") {
          displayOutput(data);
          toast.success(data["message"]);
        } else {
          toast.error(data["message"]);
        }
      })
      .catch((error) => {
        toast.error("An error occured");
      });
  };
  const runDecision = () => {
    var data = new FormData();
    data.append("param1", document.getElementById("MaxDepthDectree").value);
    data.append("param2", document.getElementById("minSampleSplitDtree").value);
    data.append("param3", document.getElementById("KernelDecisionTree").value);
    data.append("code", getCookie("ssid"));
    fetch("/app/runDecision", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        if (data["status"] == "succ") {
          displayOutput(data);
          toast.success(data["message"]);
        } else {
          toast.error(data["message"]);
        }
      })
      .catch((error) => {
        toast.error("An error occured");
      });
  };
  const runBagging = () => {
    var data = new FormData();
    data.append("param1", document.getElementById("NEstimatorsBagging").value);
    data.append("param2", document.getElementById("MaxSampleBagging").value);
    data.append("param3", document.getElementById("MaxFeaturesBagging").value);
    data.append("code", getCookie("ssid"));
    fetch("/app/runBagging", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        if (data["status"] == "succ") {
          displayOutput(data);
          toast.success(data["message"]);
        } else {
          toast.error(data["message"]);
        }
      })
      .catch((error) => {
        toast.error("An error occured");
      });
  };

  return (
    <div className="overflow-hidden rounded-lg w-screen md:shadow-xl">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.6}
        duration={1}
        repeatDelay={1}
        className={" h-full fill-white"}
      />

      <div className="relative z-50">
        <InsideNav currentPage="Train" />

        <div className="p-5 w-screen h-full grid gap-4 grid-flow-row md:grid-flow-col grid-col-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 mt-16 -z-10">
          <div className="form rounded-lg shadow-lg h-[85vh] p-5 bg-[#171717] overflow-scroll text-white rounded-l-2xl">
          <h1 style={{ fontSize: "30px", fontWeight: "bolder" }}>
              {" "}
              <i
                class="fa-brands fa-strava"
                style={{ color: "#036EFD" }}
              ></i>{" "}
              &nbsp; Pre-Training
            </h1>
            {/* Target Form */}
            <form
              action="javascript:void"
              className="flex flex-col"
              onSubmit={setTargetValue}
            >
              <label htmlFor="targetValue" className="font-bold text-xl py-2">
                Enter Target Column Name Value
              </label>
              <input
                type="text"
                name="targetValue"
                placeholder="Target Column Name"
                className="font-semibold text-white bg-gray-700 px-4 py-2 rounded-full focus:outline-none"
              />
              <div className="bg-white px-4 py-1 w-fit rounded-full my-3">
                <button
                  type="submit"
                  className="text-lg bg-gradient-to-bl from-blue-500 to-green-400 font-bold bg-clip-text text-transparent"
                >
                  Set Target Column Value
                </button>
              </div>
            </form>

            {/* Encoder Form */}
            <form
              action="javascript:void"
              className="flex flex-col mt-2"
              onSubmit={setEncoderStatus}
            >
              <label htmlFor="targetValue" className="font-bold text-xl p-2">
                Set Encoder
              </label>
              <select
                name="encoderStatus"
                id="encoderStatus"
                className="bg-gray-700 p-2 text-base rounded-full items-center align-middle focus:outline-none"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <div className="bg-white px-4 py-1 w-fit rounded-full my-3">
                <button
                  type="submit"
                  className="text-lg bg-gradient-to-bl from-blue-500 to-green-400 font-bold bg-clip-text text-transparent"
                >
                  Set Encoder
                </button>
              </div>
            </form>
            {/* Left form div Stands here */}

            <form
              action="javascript:void(0)"
              className="flex flex-col w-full mt-2"
              onSubmit={saveSplits}
            >
              <h1 className="font-bold text-xl"> Train Test Split</h1>
              <h2 className="text-base">Enter Training-Test Split %</h2>
              <div className="w-full">
                <input
                  type="text"
                  name="training"
                  placeholder="Enter Training Percentage"
                  className="px-3 py-2 text-white bg-gray-700 font-semibold text-lg  after:text-white after:bg-gray-500 after:content-['%'] rounded-l-full focus:outline-none w-3/4"
                  value={trainingSplit}
                  onChange={updateTest}
                />
                <input
                  type="text"
                  id="testSplit"
                  className="px-3 py-2 text-white bg-gray-800 font-semibold text-lg after:text-white after:bg-gray-500 after:content-['%'] rounded-r-full focus:outline-none w-1/4"
                  value={testingSplit}
                  disabled
                />
              </div>{" "}
              <div className="bg-white px-4 py-1 w-fit rounded-full my-3">
                <button
                  type="submit"
                  className="text-lg bg-gradient-to-bl from-blue-500 to-green-400 font-bold bg-clip-text text-transparent"
                >
                  Submit
                </button>
              </div>
            </form>
            {/* Model Training */}
            
            <h1 style={{ marginTop:"1.5rem", fontSize: "30px", fontWeight: "bolder" }}>
              {" "}
              <i
                class="fa-brands fa-strava"
                style={{ color: "#036EFD" }}
              ></i>{" "}
              &nbsp; Model Training
            </h1>
               
            {/* SVM Model */}
            <form action="javascript:void(0)" className="flex flex-col my-4" onSubmit={runSVM}>
              <h1
               className="font-bold text-2xl"
              >
                <i
                  class="fa-solid fa-gears"
                  style={{ color: "#036EFD", fontSize: "20px" }}
                ></i>{" "}
                &nbsp;SVM Model
              </h1>
              <div class="mb-3">
            
                <div className="flex flex-row w-full flex-wrap text-lg justify-between my-1 items-center mt-2">
                <label htmlFor="KernelSVM">Enter Kernal value:</label>
                
                <select
                  name="KernelSVM"
                  id="KernelSVM"
                  class="bg-gray-700 text-white focus:outline-none placeholder:text-gray-400 w-3/5 px-3 py-2 text-lg rounded-2xl"
                >
                  <option value="rbf">rbf</option>
                </select>
                </div>
              </div>
             <div className="flex flex-row w-full flex-wrap text-lg justify-between my-1 items-center">
             <label htmlFor="cValSVM">Enter C value:</label>
              <input
                type="text"
                class="bg-gray-700 text-white focus:outline-none placeholder:text-gray-400 w-3/5 px-3 py-2 text-lg"
                id="cValSVM"
                name="cValSVM"
                placeholder=" Enter value between 10⁻³ to 10³"
                style={{ borderRadius: "20px" }}
              />
             </div>
              
              <div className="flex flex-row w-full flex-wrap text-lg justify-between my-1 items-center">
              <label htmlFor="gammaValSVM">Enter Gamma value:</label>
              <input
                type="text"
                class="bg-gray-700 text-white focus:outline-none placeholder:text-gray-400 w-3/5 px-3 py-2 text-lg"
                id="gammaValSVM"
                name="gammaValSVM"
                placeholder=" Enter value between 10⁻³ to 10³"
                style={{ borderRadius: "20px" }}
              />
              </div>
              <div className="bg-white px-4 py-1 w-fit rounded-full my-3">
                <button
                  type="submit"
                  className="text-lg bg-gradient-to-bl from-blue-500 to-green-400 font-bold bg-clip-text text-transparent"
                >
                  Run SVM Model
                </button>
                </div>
            </form>
            
            
            {/* Random Forest  */}

            <form action="javascript:void(0)" className="flex flex-col my-4" onSubmit={runRandomForest}>
              <h1
               className="font-bold text-2xl"
              >
                <i
                  class="fa-solid fa-angle-down"
                  style={{ color: "#036EFD", fontSize: "20px" }}
                ></i>{" "}
                &nbsp; Random Forest{" "}
              </h1>
              
              <div class="mb-3">
                <label htmlFor="nestimatorsRF">Enter N Estimators value:</label>
                <input
                  type="text"
                  class="bg-gray-700 text-white focus:outline-none placeholder:text-gray-400 w-3/5 px-3 py-2 text-lg"
                  id="nestimatorsRF"
                  name="nestimatorsRF"
                  placeholder=" Enter value between 1 to infinity"
                  style={{ borderRadius: "20px" }}
                />

                

                <label htmlFor="MaxDepthDtree">Enter Max Depth value:</label>
                <input
                  type="text"
                  class="bg-gray-700 text-white focus:outline-none placeholder:text-gray-400 w-3/5 px-3 py-2 text-lg"
                  id="MaxDepthDtree"
                  name="MaxDepthDtree"
                  placeholder=" Enter value between 1 to infinity or none"
                  style={{ borderRadius: "20px" }}
                />

                

                <label htmlFor="minSampleSplit">
                  Enter Min Sample-Split value:
                </label>
                <input
                  type="text"
                  class="bg-gray-700 text-white focus:outline-none placeholder:text-gray-400 w-3/5 px-3 py-2 text-lg"
                  id="minSampleSplit"
                  name="minSampleSplit"
                  placeholder=" Enter value between 2 to infinity"
                  style={{ borderRadius: "20px" }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  borderRadius: "20px",
                  width: "40vh",
                  background:
                    "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)",
                  color: "white",
                  borderColor: "#EFF2FF",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Run
                Random Forest Model
              </button>
            </form>
            
            
            {/* XGBoost  */}

            <form action="javascipt:void" onSubmit={runXGBoost}>
              <h1
               className="font-bold text-2xl"
              >
                {" "}
                <i
                  class="fa-solid fa-bars"
                  style={{ color: "#036EFD", fontSize: "20px" }}
                ></i>{" "}
                &nbsp;XGBoost{" "}
              </h1>
              
              <div class="mb-3">
                <label htmlFor="NEstimatorsXG">Enter N-Estimators value:</label>
                <input
                  type="text"
                  class="bg-gray-700 text-white focus:outline-none placeholder:text-gray-400 w-3/5 px-3 py-2 text-lg"
                  id="NEstimatorsXG"
                  name="NEstimatorsXG"
                  placeholder=" Enter value between 0 to infinity"
                  style={{ borderRadius: "20px" }}
                />

                

                <label htmlFor="MaxDepthXG">Enter Max Depth value:</label>
                <input
                  type="text"
                  class="bg-gray-700 text-white focus:outline-none placeholder:text-gray-400 w-3/5 px-3 py-2 text-lg"
                  id="MaxDepthXG"
                  name="MaxDepthXG"
                  placeholder=" Enter value between 3 to infinity"
                  style={{ borderRadius: "20px" }}
                />

                

                <label htmlFor="LearnRateXG">Enter Learning Rate value:</label>
                <input
                  type="text"
                  class="bg-gray-700 text-white focus:outline-none placeholder:text-gray-400 w-3/5 px-3 py-2 text-lg"
                  id="LearnRateXG"
                  name="LearnRateXG"
                  placeholder=" Enter value between 0.01 to 0.3"
                  style={{ borderRadius: "20px" }}
                />
                
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  borderRadius: "20px",
                  width: "40vh",
                  background:
                    "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)",
                  color: "white",
                  borderColor: "#EFF2FF",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Run
                XGBoost
              </button>
            </form>
            
            

            {/* Decision Tree  */}
            <form action="javascript:void" onSubmit={runDecision}>
              <h1
               className="font-bold text-2xl"
              >
                <i
                  class="fa-solid fa-wand-magic-sparkles"
                  style={{ color: "#036EFD", fontSize: "20px" }}
                ></i>{" "}
                &nbsp;Decision Tree{" "}
              </h1>
              
              
              <label htmlFor="MaxDepthDectree">Enter Max Depth value:</label>
              <input
                type="text"
                class="bg-gray-700 text-white focus:outline-none placeholder:text-gray-400 w-3/5 px-3 py-2 text-lg"
                id="MaxDepthDectree"
                name="MaxDepthDectree"
                placeholder=" Enter value between 1 to infinity"
                style={{ borderRadius: "20px" }}
              />

              
              <label htmlFor="minSampleSplitDtree">
                Enter Min Sample-Split value:
              </label>
              <input
                type="text"
                class="bg-gray-700 text-white focus:outline-none placeholder:text-gray-400 w-3/5 px-3 py-2 text-lg"
                id="minSampleSplitDtree"
                name="minSampleSplitDtree"
                placeholder=" Enter value between 2 to infinity"
                style={{ borderRadius: "20px" }}
              />

              
              <label htmlFor="KernelDecisionTree">Enter Kernal value:</label>
              
              <select
                name="KernelDecisionTree"
                id="KernelDecisionTree"
                style={{ borderRadius: "20px", width: "20vh" }}
              >
                <option value="gini">gini</option>
                <option value="entropy">entropy</option>
                <option value="log-loss">log-loss</option>
              </select>
              
              
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  borderRadius: "20px",
                  width: "40vh",
                  background:
                    "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)",
                  color: "white",
                  borderColor: "#EFF2FF",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Run
                Decision Tree Model
              </button>
            </form>
            
            
            {/* Bagging  */}
            <form action="javascript:void" onSubmit={runBagging}>
              {" "}
              <h1
               className="font-bold text-2xl"
              >
                <i
                  class="fa-solid fa-bolt"
                  style={{ color: "#036EFD", fontSize: "20px" }}
                ></i>{" "}
                &nbsp;Bagging{" "}
              </h1>
              <div class="mb-3">
                
                <label htmlFor="NEstimatorsBagging">
                  Enter N-Estimators value:
                </label>
                <input
                  type="text"
                  class="bg-gray-700 text-white focus:outline-none placeholder:text-gray-400 w-3/5 px-3 py-2 text-lg"
                  id="NEstimatorsBagging"
                  name="NEstimatorsBagging"
                  placeholder=" Enter value between 1 to infinity"
                  style={{ borderRadius: "20px" }}
                />

                

                <label htmlFor="MaxSampleBagging">
                  Enter Max Sample value:
                </label>
                <input
                  type="text"
                  class="bg-gray-700 text-white focus:outline-none placeholder:text-gray-400 w-3/5 px-3 py-2 text-lg"
                  id="MaxSampleBagging"
                  name="MaxSampleBagging"
                  placeholder=" Enter value between 1 to infinity"
                  style={{ borderRadius: "20px" }}
                />

                

                <label htmlFor="MaxFeaturesBagging">
                  Enter Max Feature value:
                </label>
                <input
                  type="text"
                  class="bg-gray-700 text-white focus:outline-none placeholder:text-gray-400 w-3/5 px-3 py-2 text-lg"
                  id="MaxFeaturesBagging"
                  name="MaxFeaturesBagging"
                  placeholder=" Enter value between 0 to 1"
                  style={{ borderRadius: "20px" }}
                />

                

                
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  borderRadius: "20px",
                  width: "40vh",
                  background:
                    "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)",
                  color: "white",
                  borderColor: "#EFF2FF",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <i class="fa-solid fa-arrow-up-from-bracket"></i> Run Bagging
              </button>
            </form>
            
            
          </div>

          {/* Table div Starts Here */}
          <div className="table-primary rounded-lg shadow-lg p-5 h-[85vh] bg-[#171717] text-white rounded-r-2xl">
            
            <div className="h-full">
              <h1 style={{ fontSize: "30px", fontWeight: "bolder" }}>
                {" "}
                <i
                  className="fa-solid fa-file-csv"
                  style={{ color: "#036EFD" }}
                ></i>{" "}
                &nbsp; Running Status / Results
              </h1>
              
            </div>
            
            <table
              className="table overflow-scroll"
              style={{
                backgroundColor: "#FCD571",
                width: "100%",
                borderRadius: "10px",
              }}
            >
              <thead
                className="font-bold"
                dangerouslySetInnerHTML={{ __html: tableHead }}
              ></thead>
              <tbody dangerouslySetInnerHTML={{ __html: tableData }}></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunModels;
