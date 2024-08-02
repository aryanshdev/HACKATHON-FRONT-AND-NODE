import React, { useState } from "react";
import InnerNav from "./InnerNav";
import Models from "./Models";
import toast from "react-hot-toast";

const DataTransfer = () => {
  const [tableHeader, setHeader] = useState("");
  const [tableBody, setBody] = useState("Upload Dataset");
  const getCookie=(cookieName) =>{
    var cookiesArray = document.cookie.split("; ");
    for (var i = 0; i < cookiesArray.length; i++) {
      var cookie = cookiesArray[i];
      var cookieParts = cookie.split("=");
      if (cookieParts[0] === cookieName) {
        return cookieParts[1];
      }
    }
    return null;
  }
  function setTableCompletely(response) {
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
    const formData = new FormData();
    formData.append("code", getCookie("ssid"));
  
    fetch("http://127.0.0.1:5000/cleanColumns", {
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
    const formData = new FormData();
    formData.append("code", getCookie("ssid"));
  
    fetch("http://127.0.0.1:5000/removeDuplicates", {
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
  

  const checkMissing = () => {
    const formData = new FormData();
    formData.append("code", getCookie("ssid"));
  
    fetch("http://127.0.0.1:5000/checkMissing", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        toast.success(response["message"]);
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
    var formData = new FormData();
    var col = document.querySelector("input[name='handleNonNum']").value;
    formData.append("col", col);
    formData.append("code", getCookie("ssid"));
    fetch("http://127.0.0.1:5000/handle_NonNumeric_Fill", {
      method: "POST",
      body: formData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }) .then((response) => {
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
    var formData = new FormData();
    var col = document.querySelector("input[name='handleNonNum']").value;
    formData.append("col", col);
    fetch("http://127.0.0.1:5000/handle_NonNumeric_Drop", {
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
    var formData = new FormData();
    var code = getCookie("ssid");
    fetch("http://127.0.0.1:5000/convertNumeric", {
      method: "POST",
     
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
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
    fetch("http://127.0.0.1:5000/normalizeDate", {
      method: "POST",
     
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
    fetch("http://127.0.0.1:5000/oneHot", {
      method: "POST",
     
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
        toast.error("Error One Hot Encoding");
        console.log(err);
      });
  };
  const getDatatypes = () => {
    fetch("http://127.0.0.1:5000/get_Col_Datatypes", {
      method: "POST",
     
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
        toast.error("Error Get Column Data Types");
        console.log(err);
      });
  };
  const dropColWithoutTarget = () => {
    fetch("http://127.0.0.1:5000/drop_Rows_WO_Target", {
      method: "POST",
     
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

const setTableFromCookie = () => {

  setHeader(getCookie("theadData"));
  setBody(getCookie("tbodyData"));

}
  return (
    <div className="relative bg-black h-auto w-screen" onLoad={setTableFromCookie}>
      <InnerNav />
      <Models />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundImage: "url('/images/bg1.jpg')",
        }}
        className="p-5"
      >
        <div
          className="form rounded-lg shadow-lg p-5"
          style={{
            flex: 1,
            marginRight: "20px",
            backgroundColor: "#F4F1FD",
            height: "80vh",
            borderRadius: "20px",
            overflowY: "auto",
            overflow: "scroll",
          }}
        >
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
          <form action="javascript:void" encType="multipart/form-data"  onSubmit={cleanColumns} >
            <h1
              style={{ fontSize: "25px", fontWeight: "bolder", color: "grey" }}
            >
              <i
                class="fa-solid fa-broom"
                style={{ color: "#036EFD", fontSize: "20px" }}
              ></i>{" "}
              &nbsp;Clean Columns{" "}
            </h1>
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
              <i class="fa-solid fa-arrow-up-from-bracket"></i>&nbsp; Clean
              Columns
            </button>
          </form>
          {/* Remove Duplicates , buttons */}
          <br />
          <br />
          <form action="javascript:void" encType="multipart/form-data"  onSubmit={deleteDuplicates}>
            <h1
              style={{ fontSize: "25px", fontWeight: "bolder", color: "grey" }}
            >
              <i
                class="fa-solid fa-eraser"
                style={{ color: "#036EFD", fontSize: "20px" }}
              ></i>{" "}
              &nbsp;Remove Duplicates{" "}
            </h1>
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
              <i class="fa-solid fa-arrow-up-from-bracket"></i>&nbsp; Remove
              Duplicates
            </button>
          </form>
          <br />
          <br />
          {/* Check missing value */}
          <br />
          <form action="javascript:void" encType="multipart/form-data"  onSubmit={checkMissing}>
            <h1
              style={{ fontSize: "25px", fontWeight: "bolder", color: "grey" }}
            >
              {" "}
              <i
                class="fa-solid fa-circle-check"
                style={{ color: "#036EFD", fontSize: "20px" }}
              ></i>{" "}
              &nbsp;Check Missing Values
            </h1>
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
              <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Check
              Missing Values
            </button>
          </form>
          <br />
          <br />
          {/* Handle non numeric */}
          <form action="javascript:void" encType="multipart/form-data"  onSubmit={handleNonNumericSelection}>
            <h1
              style={{ fontSize: "25px", fontWeight: "bolder", color: "grey" }}
            >
              <i
                class="fa-solid fa-angle-down"
                style={{ color: "#036EFD", fontSize: "20px" }}
              ></i>{" "}
              &nbsp; Handle Non Numeric{" "}
            </h1>
            <br />
            <div class="mb-1">
              <label htmlFor="">
                Enter Non Numeric Column Names, Comma Separated
              </label>
              <input
                type="text"
                class="form-control mb-2 pb-2"
                name="handleNonNum"
                placeholder="Enter Column Names"
                style={{ borderRadius: "20px" }}
              />
            </div>
            <div class="dropdown mt-2 p-0">
              <select
                name="handleNonNum"
                id="handleNonNum"
                className="w-64 my-2 p-2 rounded-2xl"
              >
                <option value="fill">Fill</option>
                <option value="fill" selected>
                  Drop
                </option>
              </select>
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
              <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Handle
              Non Numeric
            </button>
          </form>
          <br />
          <br />
          {/* Handle numeric data   */}
          <form action="javascript:void" encType="multipart/form-data" >
            <h1
              style={{ fontSize: "25px", fontWeight: "bolder", color: "grey" }}
            >
              {" "}
              <i
                class="fa-solid fa-bars"
                style={{ color: "#036EFD", fontSize: "20px" }}
              ></i>{" "}
              &nbsp;Handle numeric data{" "}
            </h1>
            <br />
            <div class="mb-3">
              <label htmlFor="">
                Enter Numeric Column Names To Be Filled By Median Values
              </label>
              <input
                type="number"
                class="form-control"
                placeholder="Enter Median Value"
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
              <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Handle
              numeric data median
            </button>
          </form>
          <br />
          <br />
          {/* Convert to numeric  */}
          <form action="javascript:void" encType="multipart/form-data"  onSubmit={convertNumeric}>
            <h1
              style={{ fontSize: "25px", fontWeight: "bolder", color: "grey" }}
            >
              <i
                class="fa-solid fa-wand-magic-sparkles"
                style={{ color: "#036EFD", fontSize: "20px" }}
              ></i>{" "}
              &nbsp;Convert to numeric{" "}
            </h1>
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
              <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Covert to
              numeric
            </button>
          </form>
          <br />
          <br />
          {/* Normalize date coloumn  */}
          <form action="javascript:void" encType="multipart/form-data"  onSubmit={normalizeDate}>
            {" "}
            <h1
              style={{ fontSize: "25px", fontWeight: "bolder", color: "grey" }}
            >
              <i
                class="fa-solid fa-bolt"
                style={{ color: "#036EFD", fontSize: "20px" }}
              ></i>{" "}
              &nbsp;Normalize date coloumn{" "}
            </h1>
            <div class="mb-3">
              <label htmlFor="">Enter Date Column Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Date Column Name"
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
              <i class="fa-solid fa-arrow-up-from-bracket"></i> Normalize date
              coloumn
            </button>
          </form>
          <br />
          <br />
          {/* One hot encoding */}
          <form action="javascript:void" encType="multipart/form-data"  onSubmit={oneHot}>
            {" "}
            <h1
              style={{ fontSize: "25px", fontWeight: "bolder", color: "grey" }}
            >
              <i
                class="fa-solid fa-fire"
                style={{ color: "#036EFD", fontSize: "20px" }}
              ></i>{" "}
              &nbsp;One hot encoding
            </h1>
            <div class="mb-3">
              <label htmlFor="">Enter Target Column Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Column Name"
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
              <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; &nbsp;
              One Hot
            </button>
          </form>
          <br />
          <br />
          {/* Get  column data types  */}
          <form action="javascript:void" encType="multipart/form-data"  onSubmit={getDatatypes}>
            <h1
              style={{ fontSize: "25px", fontWeight: "bolder", color: "grey" }}
            >
              <i
                class="fa-solid fa-folder-open "
                style={{ color: "#036EFD", fontSize: "20px" }}
              ></i>{" "}
              &nbsp;Get coloumn data types{" "}
            </h1>

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
              <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Get
              Coloumn Data Types
            </button>
          </form>
          <br /> <br />
          {/* Drop rows without target  */}
          <form action="javascript:void" encType="multipart/form-data"  onSubmit={dropColWithoutTarget}>
            <h1
              style={{ fontSize: "25px", fontWeight: "bolder", color: "grey" }}
            >
              <i
                class="fa-solid fa-layer-group"
                style={{ color: "#036EFD", fontSize: "20px" }}
              ></i>
              &nbsp;&nbsp;Drop rows without target{" "}
            </h1>
            <div class="mb-3">
              <label htmlFor="">Enter Target Value</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Value"
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
              <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp;Drop rows
              without target
            </button>
          </form>
        </div>

        {/* Table div Starts Here */}
        <div
          className="table-primary rounded-lg shadow-lg p-5 "
          style={{
            flex: 1,
            marginLeft: "20px",
            backgroundColor: "whitesmoke",
            borderRadius: "20px",
            backgroundImage: "url('/images/grad1 copy.png')",
          }}
        >
          <br />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h1 style={{ fontSize: "30px", fontWeight: "bolder" }}>
              {" "}
              <i
                className="fa-solid fa-file-csv"
                style={{ color: "#036EFD" }}
              ></i>{" "}
              &nbsp; Uploaded Dataset
            </h1>
            <br />
          </div>
          <br />
          <table
            className="table overflow-scroll w-full h-5/6 "
            style={{
              backgroundColor: "#FCD571",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <thead
              className="font-bold"
              dangerouslySetInnerHTML={{ __html: tableHeader }}
            ></thead>
            <tbody dangerouslySetInnerHTML={{ __html: tableBody }}></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTransfer;
