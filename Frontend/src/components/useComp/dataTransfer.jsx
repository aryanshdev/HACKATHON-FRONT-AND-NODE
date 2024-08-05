import React, { useState } from "react";
import InsideNav from "./InsideNav";
import Models from "./Models";
import toast from "react-hot-toast";

const DataTransfer = () => {
  const [tableHeader, setHeader] = useState("");
  const [tableBody, setBody] = useState("Upload Dataset");
  const getCookie = (cookieName) => {
    var cookiesArray = document.cookie.split("; ");
    for (var i = 0; i < cookiesArray.length; i++) {
      var cookie = cookiesArray[i];
      var cookieParts = cookie.split("=");
      if (cookieParts[0] === cookieName) {
        return cookieParts[1];
      }
    }
    return null;
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
    const formData = new FormData();
    formData.append("code", getCookie("ssid"));

    fetch("http://127.0.0.1:5000/cleanColumnNames", {
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

  const checkMissingValuesForColumns = () => {
    const formData = new FormData();
    formData.append("code", getCookie("ssid"));
    fetch("http://127.0.0.1:5000/checkMissing", {
      method: "POST",
      body: formData,
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
    var formData = new FormData();
    var col = document.querySelector("input[name='handleNonNum']").value;
    formData.append("code", getCookie("ssid"));
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

  const handleNumericMissing = () => {
    var formData = new FormData();
    var code = getCookie("ssid");
    var col = document.querySelector(
      "input[name='handleNumericMissing']"
    ).value;
    formData.append("col", col);
    formData.append("code", code);
    fetch("http://127.0.0.1:5000/handle_Numeric_Missing", {
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
    var formData = new FormData();
    var code = getCookie("ssid");
    var col = document.querySelector("input[name='dropColumnName']").value;
    formData.append("col", col);
    formData.append("code", code);
    fetch("http://127.0.0.1:5000/dropColumn", {
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

  const showManipulatedDataFromServer = () => {
    const formData = new FormData();
    formData.append("code", getCookie("ssid"));
    fetch("http://127.0.0.1:5000/cleanColumnNames", {
      method: "GET",
      body: formData, // Include this line if you need to send cookies with the request
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        toast.success("Table Now Visible");
        setTableCompletely(response);
      })
      .catch((err) => {
        toast.error("Error Fetching Table");
        console.log(err);
      });
  };

  const convertNumeric = () => {
    var formData = new FormData();
    formData.append("code", getCookie("ssid"));
    var col = document.querySelector("input[name='convertNumeric']").value;
    formData.append("col", col);
    fetch("http://127.0.0.1:5000/convertNumeric", {
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
    var formData = new FormData();
    formData.append("code", getCookie("ssid"));
    formData.append(
      "col",
      document.querySelector("input[name='dateColName']").value
    );
    fetch("http://127.0.0.1:5000/normalizeDate", {
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
    var formData = new FormData();
    formData.append("code", getCookie("ssid"));
    formData.append(
      "col",
      document.querySelector("input[name='onehotColNum']").value
    );
    fetch("http://127.0.0.1:5000/oneHot", {
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
    var formData = new FormData();
    formData.append("code", getCookie("ssid"));
    formData.append(
      "col",
      document.querySelector("input[name='dateColName']").value
    );
    fetch("http://127.0.0.1:5000/get_Col_Datatypes", {
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
    var formData = new FormData();
    formData.append("code", getCookie("ssid"));
    formData.append(
      "col",
      document.querySelector("input[name='dropColWOTarget']").value
    );
    fetch("http://127.0.0.1:5000/drop_Rows_WO_Target", {
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

  const setTableFromCookie = () => {
    fetch("http://");
    setHeader();
    setBody();
  };
  return (
    <div
      className="relative bg-gray-900 h-auto w-screen"
      onLoad={setTableFromCookie}
    >
      <InsideNav />
      <div className="text-white flex flex-row justify-center items-center w-screen p-10 bg-black">
        <div className="grid grid-cols-2 gap-4 py-10">
          <div className="h-full"></div>

          {/* Table div Starts Here */}
          <div className="table-primary rounded-lg shadow-lg h-[80vh] bg-[#171717] text-white p-5 rounded-r-2xl">
            <br />
            <div className="w-auto h-full flex flex-col ">
              <h1 style={{ fontSize: "30px", fontWeight: "bolder" }}>
                {" "}
                <i
                  className="fa-solid fa-file-csv"
                  style={{ color: "#036EFD" }}
                ></i>{" "}
                &nbsp; Uploaded Dataset
              </h1>
              <br />
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

export default DataTransfer;
