import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import InsideNav from "./InsideNav";
import Models from "./Models";
import { Link, useNavigate } from "react-router-dom";
import DataTransfer from "./dataTransfer";
import AnimatedGridPattern from "../magicui/animated-grid-pattern";
import { cn } from "../../lib/utils";

export const UploadData = () => {
  const [tableHeader, setHeader] = useState("");
  const [tableBody, setBody] = useState("Upload Dataset");
  const [showButtons, setShowButtons] = useState(false);
  const handleSubmit = () => {
    var formData = new FormData();
    var file = document.getElementById("uploadFile").files[0];
    formData.append("uploadFile", file);
    fetch("/app/uploadFile", {
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
        toast.success("File Uploaded Successfully");
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
        setShowButtons(true);
        document.cookie = "tbodyData=" + bodyString;
        document.cookie = "theadData=" + headerString;
        document.cookie = "ssid=" + window.location.pathname.split("/")[window.location.pathname.split("/").length-1];
      })
      .catch((err) => {
        toast.error("Error Uploading File");
        console.log(err);
      });
  };
  const reqDeleteFile = async () => {};
  return (
    <div className="relative bg-black h-auto min-h-screen w-screen p-6">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.6}
        duration={1}
        repeatDelay={1}
        className={cn("inset-x-0 inset-y-[-30%] h-[200%] skew-y-12")}
      />

    
      <InsideNav currentPage="Uploads"></InsideNav>
      <div className="relative z-50">
        <InsideNav currentPage="Uploads" />
        <br />

        <br />
        <div className="grid grid-cols-2 justify-center items-center h-full gap-4 p-5">
          <div className="form rounded-l-2xl bg-[#171717] text-white shadow-lg p-5 h-[80vh] ">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              action="javascript:void(0)"
              className="flex flex-col h-full justify-evenly align-middle items-center"
            >
              <div className="mb-3 flex flex-col h-full justify-evenly ">
                <br />
                <br />
                <h1 style={{ fontSize: "30px", fontWeight: "bolder" }}>
                  {" "}
                  <i
                    className="fa-solid fa-microchip"
                    style={{ color: "#036EFD" }}
                  ></i>{" "}
                  &nbsp; Upload your Dataset file
                </h1>

                <input
                 required
                  class=" rounded-xl block w-1/2 text-sm  border cursor-pointer  text-white focus:outline-none bg-gradient-to-tr from-blue-600 to-green-700 dark:placeholder-gray-300 file:p-2 file:m-0 file:rounded-xl file:outline-none file:border-none file:mr-2"
                  accept=".csv,.xlsx,.xls"
                  id="uploadFile"
                  type="file"
                />
                <div className="form-text">
                  Upload your file to train your model &nbsp;
                  <i className="fa-solid fa-file-import"></i>
                </div>
                <br />
                <br />
                <button type="submit" className="m-auto bg-">
                  <i className="fa-solid fa-cloud-arrow-up"></i> &nbsp; Upload
                  File
                </button>
              </div>
            </form>
            <div className={showButtons ? "block" : "hidden"}>
              <button
                onClick={reqDeleteFile}
                className="btn btn-primary"
                style={{
                  borderRadius: "20px",
                  background:
                    "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)",
                  color: "white",
                  borderColor: "#EFF2FF",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <i class="fa-sharp fa-solid fa-trash"></i> &nbsp; Delete File
              </button>
              <Link to={`/app/transformData/}`}>
                {" "}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    borderRadius: "20px",
                    background:
                      "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)",
                    color: "white",
                    borderColor: "#EFF2FF",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Continue &nbsp; <i class="fa-solid fa-arrow-right"></i>
                </button>
              </Link>
            </div>
          </div>
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
           <table
                className=" h-5/6 overflow-scroll table-auto bg-transparent max-w-5/6 max-h-5/6 border-separate"
               
              >
                <thead
                  className="font-bold text-white"
                  dangerouslySetInnerHTML={{ __html: tableHeader }}
                ></thead>
                <tbody dangerouslySetInnerHTML={{ __html: tableBody }}></tbody>
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

export default UploadData;
