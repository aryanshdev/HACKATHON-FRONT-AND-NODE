import React, { useState } from "react";
import { Link } from "react-router-dom";
import InsideNav from "./InsideNav";
import Models from "./Models";
import toast from "react-hot-toast";

const DataTransform = () => {
  const [tableHeader, setHeader] = useState("");
  const [tableBody, setBody] = useState("Upload Dataset");

  const loadDisplayTable = () => {
    fetch("/app/getDatasetDisplay", {
      method: "POST",
    })
      .then((response) => {
        if(response.status === 400){
          toast.error("Session Expired, Please Login Again");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
          return;
        }
        return response.json();
      })
      .then((response) => {
       
        setTableCompletely(response);
      })
      .catch((err) => {

    
        
        toast.error("Error Fetching Table");
        console.log(err);
      });
  };

  function setTableCompletely(response) {
    response = JSON.parse(response["data"]);
    const heads = response[0];
    let headerString = "<tr>";
    for (var col in heads) {
      headerString += `<td>${col}</td>`;
    }
    setHeader(headerString + "</tr>");

    var bodyString = "";
    for (const entry of response) {
      bodyString += "<tr>";
      for (var value in entry) {
        bodyString += `<td>${entry[value]}</td>`;
      }
      bodyString += "</tr>";
    }
    setBody(bodyString);
  }

  const cleanColumns = () => {
    const formData = new URLSearchParams();
    fetch("/app/cleanColumnNames", {
      method: "POST",
      body: formData,
      credentials: "include", // Include this line if you need to send cookies with the request
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        toast.success(response["message"]);
        setTableCompletely(response);
      })
      .catch((err) => {
        toast.error("Error Cleaning Columns");
        console.log(err);
      });
  };

  const deleteDuplicates = () => {
    const formData = new URLSearchParams();
    fetch("/app/removeDuplicates", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        toast.success(response["message"]);
        setTableCompletely(response);
      })
      .catch((err) => {
        toast.error("Error Deleting Duplicates");
        console.log(err);
      });
  };

  const checkMissingValuesForColumns = () => {
    fetch("/app/checkMissing", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((response) => {
        toast.success(response["message"]);
        console.log(response);
        setTableCompletely(response);
      })
      .catch((err) => {
        toast.error("Error Checking Missing Values");
        console.log(err);
      });
  };

  const handleNonNumericSelection = () => {
    if (
      document.getElementById("handleNonNum").options[
        document.getElementById("handleNonNum").selectedIndex
      ].text == "Fill"
    ) {
      handleNonNumericFill();
    } else {
      handleNonNumericDrop();
    }
  };

  const handleNonNumericFill = () => {
    var formData = new URLSearchParams();
    var col = document.querySelector("input[name='handleNonNum']").value;
    formData.append("col", col);
    fetch("/app/handle_NonNumeric_Fill", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        toast.success(response["message"]);
        setTableCompletely(JSON.parse(response["data"]));
      })
      .catch((err) => {
        toast.error("Error Non Numeric Fill Columns");
        console.log(err);
      });
  };

  const handleNonNumericDrop = () => {
    var formData = new URLSearchParams();
    var col = document.querySelector("input[name='handleNonNum']").value;
    formData.append("col", col);
    fetch("/app/handle_NonNumeric_Drop", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        toast.success(response["message"]);
        setTableCompletely(response);
      })
      .catch((err) => {
        toast.error("Error Dropping Non Numerical Columns");
        console.log(err);
      });
  };

  const handleNumericMissing = () => {
    var formData = new URLSearchParams();
    var col = document.querySelector(
      "input[name='handleNumericMissing']"
    ).value;
    formData.append("col", col);
    fetch("/app/handle_Numeric_Missing", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        toast.success(response["message"]);
        setTableCompletely(response);
      })
      .catch((err) => {
        toast.error("Error Dropping Non Numerical Columns");
        console.log(err);
      });
  };

  const handleDeleteCol = () => {
    var formData = new URLSearchParams();
    var col = document.querySelector("input[name='dropColumnName']").value;
    formData.append("col", col);
    fetch("/app/dropColumn", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        toast.success(response["message"]);
        setTableCompletely(response);
      })
      .catch((err) => {
        toast.error("Error Dropping Non Numerical Columns");
        console.log(err);
      });
  };

  const convertNumeric = () => {
    var formData = new URLSearchParams();
    var col = document.querySelector("input[name='convertNumeric']").value;
    formData.append("col", col);
    fetch("/app/convertNumeric", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        toast.success(response["message"]);
        setTableCompletely(response);
      })
      .catch((err) => {
        toast.error("Error Convert Numeric");
        console.log(err);
      });
  };
  const normalizeDate = () => {
    var formData = new URLSearchParams();

    formData.append(
      "col",
      document.querySelector("input[name='dateColName']").value
    );
    fetch("/app/normalizeDate", {
      method: "POST",
      body: formData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setTableCompletely(response);
      })
      .catch((err) => {
        toast.error("Error Normalize Date");
        console.log(err);
      });
  };
  const oneHot = () => {
    var formData = new URLSearchParams();

    formData.append(
      "col",
      document.querySelector("input[name='onehotColNum']").value
    );
    fetch("/app/oneHot", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setTableCompletely(response);
      })
      .catch((err) => {
        toast.error("Error One Hot Encoding");
        console.log(err);
      });
  };
  const getDatatypes = () => {
    var formData = new URLSearchParams();

    formData.append(
      "col",
      document.querySelector("input[name='dateColName']").value
    );
    fetch("/app/get_Col_Datatypes", {
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setTableCompletely(response);
      })
      .catch((err) => {
        toast.error("Error Get Column Data Types");
        console.log(err);
      });
  };
  const dropColWithoutTarget = () => {
    var formData = new URLSearchParams();

    formData.append(
      "col",
      document.querySelector("input[name='dropColWOTarget']").value
    );
    fetch("/app/drop_Rows_WO_Target", {
      method: "POST",
      body: formData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setTableCompletely(response);
      })
      .catch((err) => {
        toast.error("Error Drop Rows Without Target");
        console.log(err);
      });
  };

  return (
    <div
      className="relative bg-gray-900 h-auto w-screen"
      onLoad={loadDisplayTable}
    >
      <InsideNav currentPage={"Transform"} />
      <div className="text-white flex flex-row justify-center items-center w-screen p-10 bg-black">
        <div className="grid grid-cols-2 gap-4 py-10">
          <div className="h-full">
            <div className="form rounded-lg shadow-lg p-5 h-[80vh] overflow-y-scroll bg-[#171717] text-white">
              {/* Left form div Stands here */}
              {/* Clean columns */}
              <br />
              <h1 style={{ fontSize: "30px", fontWeight: "bolder" }}>
                {" "}
                <i
                  className="fa-solid fa-file-zipper"
                  style={{ color: "#036EFD" }}
                ></i>{" "}
                &nbsp; Data Transformation
              </h1>
              <br />
              <br />
              <form
                action="javascript:void(0)"
                
                onSubmit={cleanColumns}
              >
                <h1 className="font-bold text-2xl">
                  <i
                    class="fa-solid fa-broom "
                    style={{ color: "#036EFD", fontSize: "20px" }}
                  ></i>{" "}
                  &nbsp;Clean Column Names{" "}
                </h1>
                <button
                  type="submit"
                  className="bg-white px-3 py-2 rounded-full text-blue-600 font-bold"
                >
                  <i class="fa-solid fa-arrow-up-from-bracket"></i>&nbsp; Clean
                  Column Names
                </button>
              </form>
              {/* Remove Duplicates , buttons */}
              <br />
              <br />
              <form
                action="javascript:void(0)"
                
                onSubmit={deleteDuplicates}
              >
                <h1 className="font-bold text-2xl">
                  <i
                    class="fa-solid fa-eraser"
                    style={{ color: "#036EFD", fontSize: "20px" }}
                  ></i>{" "}
                  &nbsp;Remove Duplicate Rows{" "}
                </h1>
                <button
                  type="submit"
                  className="bg-white px-3 py-2 rounded-full text-blue-600 font-bold"
                >
                  <i class="fa-solid fa-arrow-up-from-bracket"></i>&nbsp; Remove
                  Duplicate Rows
                </button>
              </form>
              <br />
              <br />
              {/* Check missing value */}
              <br />
              <form
                action="javascript:void(0)"
                
                onSubmit={checkMissingValuesForColumns}
              >
                <h1 className="font-bold text-2xl">
                  {" "}
                  <i
                    class="fa-solid fa-circle-check"
                    style={{ color: "#036EFD", fontSize: "20px" }}
                  ></i>{" "}
                  &nbsp;Check Missing Values For Columns
                </h1>
                <button
                  type="submit"
                  className="bg-white px-3 py-2 rounded-full text-blue-600 font-bold"
                >
                  <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Check
                  Missing Values For Columns
                </button>
              </form>
              <br />
              <br />
              {/* Handle non numeric */}
              <form
                action="javascript:void(0)"
                
                onSubmit={handleNonNumericSelection}
              >
                <h1 className="font-bold text-2xl">
                  <i
                    class="fa-solid fa-angle-down"
                    style={{ color: "#036EFD", fontSize: "20px" }}
                  ></i>{" "}
                  &nbsp; Handle Missing Non Numeric Data{" "}
                </h1>
                <br />
                <div class="mb-1 flex flex-col items-center">
                  <button
                    type="button"
                    onClick={loadDisplayTable}
                    className="bg-white px-3 py-2 rounded-full text-blue-600 font-bold"
                  >
                    Show Table Again
                  </button>
                  <label htmlFor="">
                    Enter Non Numeric Column Names, Comma Separated
                  </label>
                  <input
                    className="bg-gray-700 text-white font-semibold px-3 py-2 placeholder:text-gray-500 w-full focus:outline-none"
                    type="text"
                    class="form-control mb-2 pb-2"
                    name="handleNonNum"
                    placeholder="Enter Column Names"
                    style={{ borderRadius: "20px" }}
                  />
                </div>

                <div class="dropdown mt-2 p-0 flex flex-col justify-center items-center align-middle">
                  <label htmlFor="handleNonNum">
                    {" "}
                    Select whether to Drop of Fill Data{" "}
                  </label>
                  <select
                    name="handleNonNum"
                    id="handleNonNum"
                    className="w-64 my-2 p-2 rounded-2xl bg-gray-700 focus:outline-none"
                  >
                    <option value="fill">Fill</option>
                    <option value="fill" selected>
                      Drop
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-white px-3 py-2 rounded-full text-blue-600 font-bold"
                >
                  <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp;
                  Handle Non Numeric
                </button>
              </form>
              <br />
              <br />
              {/* Handle numeric data   */}
              <form
                action="javascript:void(0)"
                onSubmit={handleNumericMissing}
                
              >
                <h1 className="font-bold text-2xl">
                  {" "}
                  <i
                    class="fa-solid fa-bars"
                    style={{ color: "#036EFD", fontSize: "20px" }}
                  ></i>{" "}
                  &nbsp;Handle missing numeric data{" "}
                </h1>
                <br />
                <div class="mb-3">
                  <label htmlFor="">
                    Enter Numeric Column Names To Be Filled By Median Values
                  </label>
                  <input
                    className="bg-gray-700 text-white font-semibold px-3 py-2 placeholder:text-gray-500 w-full focus:outline-none"
                    type="text"
                    class="w-full font-semibold text-black px-3 py-2 placeholder:text-gray-500"
                    name="handleNumericMissing"
                    placeholder="Enter Column Name Value"
                    style={{ borderRadius: "20px" }}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white px-3 py-2 rounded-full text-blue-600 font-bold"
                >
                  <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp;
                  Handle numeric data median
                </button>
              </form>
              <br />
              <br />
              <br />
              {/* Convert to numeric  */}
              <form
                action="javascript:void(0)"
                
                onSubmit={convertNumeric}
              >
                <h1 className="font-bold text-2xl">
                  <i
                    class="fa-solid fa-wand-magic-sparkles"
                    style={{ color: "#036EFD", fontSize: "20px" }}
                  ></i>{" "}
                  &nbsp;Convert to numeric{" "}
                </h1>
                <div class="mb-3">
                  <label htmlFor="">Enter Date Column Name</label>
                  <input
                    className="bg-gray-700 text-white font-semibold px-3 py-2 placeholder:text-gray-500 w-full focus:outline-none"
                    type="text"
                    class="w-full font-semibold text-black px-3 py-2 placeholder:text-gray-500"
                    name="convertNumeric"
                    placeholder="Enter Date Column Name"
                    style={{ borderRadius: "20px" }}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white px-3 py-2 rounded-full text-blue-600 font-bold"
                >
                  <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp;
                  Covert to numeric
                </button>
              </form>
              <br />
              <br />
              {/* Normalize date coloumn  */}
              <form
                action="javascript:void(0)"
                
                onSubmit={normalizeDate}
              >
                {" "}
                <h1 className="font-bold text-2xl">
                  <i
                    class="fa-solid fa-bolt"
                    style={{ color: "#036EFD", fontSize: "20px" }}
                  ></i>{" "}
                  &nbsp;Normalize date coloumn{" "}
                </h1>
                <div class="mb-3">
                  <label htmlFor="">Enter Date Column Name</label>
                  <input
                    className="bg-gray-700 text-white font-semibold px-3 py-2 placeholder:text-gray-500 w-full focus:outline-none"
                    type="text"
                    class="w-full font-semibold text-black px-3 py-2 placeholder:text-gray-500"
                    name="dateColName"
                    placeholder="Enter Date Column Name"
                    style={{ borderRadius: "20px" }}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white px-3 py-2 rounded-full text-blue-600 font-bold"
                >
                  <i class="fa-solid fa-arrow-up-from-bracket"></i> Normalize
                  date coloumn
                </button>
              </form>
              <br />
              <br />
              {/* Handle Delete Column   */}
              <form
                action="javascript:void(0)"
                onSubmit={handleDeleteCol}
                
              >
                <h1 className="font-bold text-2xl">
                  {" "}
                  <i
                    class="fa-solid fa-bars"
                    style={{ color: "#036EFD", fontSize: "20px" }}
                  ></i>{" "}
                  &nbsp;Drop Columns{" "}
                </h1>
                <br />
                <div class="mb-3">
                  <label htmlFor="">
                    Enter Column Names, Comma Separated, To Drop
                  </label>
                  <input
                    className="bg-gray-700 text-white font-semibold px-3 py-2 placeholder:text-gray-500 w-full focus:outline-none"
                    type="text"
                    class="w-full font-semibold text-black px-3 py-2 placeholder:text-gray-500"
                    name="dropColumnName"
                    placeholder="Enter Column Names"
                    style={{ borderRadius: "20px" }}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white px-3 py-2 rounded-full text-blue-600 font-bold"
                >
                  <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Drop
                  Columns
                </button>
              </form>
              <br />
              {/* One hot encoding */}
              <form
                action="javascript:void(0)"
                
                onSubmit={oneHot}
              >
                {" "}
                <h1 className="font-bold text-2xl">
                  <i
                    class="fa-solid fa-fire"
                    style={{ color: "#036EFD", fontSize: "20px" }}
                  ></i>{" "}
                  &nbsp;One hot encoding
                </h1>
                <div class="mb-3">
                  <label htmlFor="">Enter Target Column Name</label>
                  <input
                    className="bg-gray-700 text-white font-semibold px-3 py-2 placeholder:text-gray-500 w-full focus:outline-none"
                    type="text"
                    class="w-full font-semibold text-black px-3 py-2 placeholder:text-gray-500"
                    name="onehotColNum"
                    placeholder="Enter Column Name"
                    style={{ borderRadius: "20px" }}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white px-3 py-2 rounded-full text-blue-600 font-bold"
                >
                  <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp;
                  &nbsp; One Hot
                </button>
              </form>
              <br />
              <br />
              {/* Get  column data types  */}
              <form
                action="javascript:void(0)"
                
                onSubmit={getDatatypes}
              >
                <h1 className="font-bold text-2xl">
                  <i
                    class="fa-solid fa-folder-open "
                    style={{ color: "#036EFD", fontSize: "20px" }}
                  ></i>{" "}
                  &nbsp;Get coloumn data types{" "}
                </h1>

                <button
                  type="submit"
                  className="bg-white px-3 py-2 rounded-full text-blue-600 font-bold"
                >
                  <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Get
                  Coloumn Data Types
                </button>
              </form>
              <br /> <br />
              {/* Drop rows without target  */}
              <form
                className="mb-6"
                action="javascript:void(0)"
                
                onSubmit={dropColWithoutTarget}
              >
                <h1 className="font-bold text-2xl">
                  <i
                    class="fa-solid fa-layer-group"
                    style={{ color: "#036EFD", fontSize: "20px" }}
                  ></i>
                  &nbsp;&nbsp;Drop rows without target{" "}
                </h1>
                <div class="mb-3">
                  <label htmlFor="">Enter Target Columns to Drop</label>
                  <input
                    className="bg-gray-700 text-white font-semibold px-3 py-2 placeholder:text-gray-500 w-full focus:outline-none"
                    type="text"
                    class="w-full font-semibold text-black px-3 py-2 placeholder:text-gray-500"
                    name="dropColWOTarget"
                    placeholder="Enter Value"
                    style={{ borderRadius: "20px" }}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white px-3 py-2 rounded-full text-blue-600 font-bold"
                >
                  <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp;Drop
                  rows without target
                </button>
              </form>
              <Link
                to={"/app/RunModels"}
                className="bg-white text-xl px-4 py-2 m-5 rounded-full "
              >
                <button className="bg-gradient-to-tr from-blue-400 to-green-500 font-bold bg-clip-text text-transparent">
                  Continue
                </button>
              </Link>
            </div>
          </div>

          {/* Table div Starts Here */}
          <div className="table-primary rounded-lg shadow-lg h-[80vh] bg-[#171717] text-white  rounded-r-2xl">
            <div className="w-auto h-full flex flex-col justify-center align-middle">
              <h1 style={{ fontSize: "30px", fontWeight: "bolder" }}>
                {" "}
                <i
                  className="fa-solid fa-file-csv p-4"
                  style={{ color: "#036EFD" }}
                ></i>
                {""}
                &nbsp; Uploaded Dataset
              </h1>
              <div className="flex w-full h-full overflow-scroll ">
                <table className=" h-5/6 overflow-scroll table-auto bg-transparent max-w-5/6 max-h-5/6 border-separate">
                  <thead
                    className="font-bold text-white bg-gray-800 p-2"
                    dangerouslySetInnerHTML={{ __html: tableHeader }}
                  ></thead>
                  <tbody
                    className="p-2"
                    dangerouslySetInnerHTML={{ __html: tableBody }}
                  ></tbody>
                </table>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTransform;
