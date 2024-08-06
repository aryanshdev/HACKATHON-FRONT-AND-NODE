import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import InsideNav from "./InsideNav";
import Models from "./Models";
import { Link, useNavigate } from "react-router-dom";
import DataTransform from "./DataTransform";
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
        console.log(response);
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
      })
      .catch((err) => {
        toast.error("Error Uploading File");
      });
  };
  const reqDeleteFile = async () => {};
  return (
    <div className="overflow-hidden rounded-lg w-screen md:shadow-xl">
      <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.6}
        duration={1}
        repeatDelay={1}
        className={cn(" h-full fill-white")}
      />

      <div className="relative z-50 pt-5">
        <InsideNav currentPage="Uploads" />
        <br />

        <br />
        <div className="grid grid-flow-row md:grid-flow-row grid-cols-1 md:grid-cols-2 justify-center items-center h-full gap-4 p-2 md:p-5">
          <div className="form rounded-l-2xl bg-[#171717] text-white shadow-lg p-5 h-[85vh] ">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              action="javascript:void(0)"
              className="flex flex-col h-full justify-evenly align-middle items-center"
            >
              <div className="mb-3 flex flex-col h-full justify-around align-center items-center ">
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
                  class=" rounded-xl block w-3/4 text-sm  border cursor-pointer  text-white focus:outline-none bg-gradient-to-tr from-blue-600 to-green-700 dark:placeholder-gray-300 file:p-2 file:m-0 file:rounded-xl file:outline-none file:border-none file:mr-2 file:rounded-r-none font-semibold"
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
                <div className="bg-white px-4 py-2 w-fit rounded-full">
                  <button
                    type="submit"
                    className="mx-auto bg-gradient-to-bl from-blue-700 to-green-500 bg-clip-text text-transparent font-bold"
                  >
                    <i className="fa-solid fa-cloud-arrow-up"></i> &nbsp; Upload
                    File
                  </button>
                </div>
                <div className="h-auto">
                  <div
                    className={
                      "h-full flex gap-10 flex-row " +
                      (showButtons ? "block" : "hidden")
                    }
                  >
                    <div className="bg-white px-4 py-2 w-fit rounded-full">
                      <button
                        onClick={reqDeleteFile}
                        className="mx-auto bg-gradient-to-bl from-blue-700 to-green-500 bg-clip-text text-transparent font-bold"
                      >
                        <i class="fa-sharp fa-solid fa-trash"></i> &nbsp; Delete
                        File
                      </button>
                    </div>
                    <Link to={`/app/TransformData/`}>
                      {" "}
                      <div className="bg-white px-4 py-2 w-fit rounded-full">
                        <button
                          onClick={reqDeleteFile}
                          className="mx-auto bg-gradient-to-bl from-blue-700 to-green-500 bg-clip-text text-transparent font-bold"
                        >
                          Continue &nbsp;{" "}
                          <i class="fa-solid fa-arrow-right"></i>
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="table-primary rounded-lg shadow-lg h-[85vh] bg-[#171717] text-white  rounded-r-2xl">
            <div className="w-auto h-full flex flex-col justify-center align-middle p-2">
              <h1 style={{ fontSize: "30px", fontWeight: "bolder" , }} className="px-2">
                {" "}
                <i
                  className="fa-solid fa-file-csv"
                  style={{ color: "#036EFD" }}
                ></i>{" "}
                &nbsp; Uploaded Dataset
              </h1>
              <div className="flex w-full h-full overflow-auto ">
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

export default UploadData;
