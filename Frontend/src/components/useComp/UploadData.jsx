import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import InsideNav from "./InsideNav";
import Models from "./Models";
import { Link, useNavigate } from "react-router-dom";
import DataTransfer from "./dataTransfer";

export const UploadData = () => {
  const [tableHeader, setHeader] = useState("");
  const [tableBody, setBody] = useState("Upload Dataset");
  const [showButtons, setShowButtons] = useState(false);
  const handleSubmit = async (e) => {
  };
  const reqDeleteFile = async () => {
  };
  return (
    <div className="relative bg-black h-auto w-screen">
      <Toaster />
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed blur-sm z-0"
        style={{ backgroundImage: "url('/images/bg1.jpg')" }}
      ></div>
      <div className="relative z-10">
        <InsideNav />
        <br />
        <Models />
        <br />
        <div
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
          className="w-screen p-5"
        >
          <div
            className="form rounded-lg shadow-lg p-5 h-[80vh]"
            style={{
              flex: 1,
              marginRight: "20px",
              backgroundColor: "#F4F1FD",
              height: "80vh",
              borderRadius: "20px",
            }}
          >
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              action="javascript:void"
            >
              <div className="mb-3">
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
                <br />
                <br />
                <br />
                <br />
                <br />
                <center>
                  <input
                    type="file"
                    className="form-control"
                    name="uploadFile"
                    id="fileUpload"
                    accept=".csv, .xlsx, .xls"
                    aria-describedby="Upload File"
                    style={{ borderRadius: "20px", width: "40vh" }}
                  />
                </center>
                <div id="emailHelp" className="form-text">
                  Upload your file to train your model &nbsp;
                  <i className="fa-solid fa-file-import"></i>
                </div>
                <br />
                <br />
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
          <div
            className="table-primary rounded-lg shadow-lg h-[80vh]  overflow-scroll"
            style={{
              flex: 1,
              marginLeft: "20px",
              backgroundColor: "whitesmoke",
              borderRadius: "20px",
              backgroundImage: "url('/images/grad1 copy.png')",
            }}
          >
            <br />
            <div className="w-auto h-[80vh] overflow-scroll flex flex-col ">
              <h1 style={{ fontSize: "30px", fontWeight: "bolder" }}>
                {" "}
                <i
                  className="fa-solid fa-file-csv"
                  style={{ color: "#036EFD" }}
                ></i>{" "}
                &nbsp; Uploaded Dataset
              </h1>
              <br />
              <table
                className="table overflow-scroll w-full h-5/6 bg-transparent"
                style={{
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
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadData;
