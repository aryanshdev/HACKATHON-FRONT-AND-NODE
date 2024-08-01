import React, { useState } from 'react';
import InnerNav from './InnerNav';
import Models from './Models';

const DataTransfer = () => {
  const [tableHead, setTableHead]= useState("");
  const [tableData, setTableData]= useState("");
  document.addEventListener("DOMContentLoaded", ()=>{
    setTableHead(getCookie("tableHead"));
    setTableData(getCookie("tableBody"));
  })

  function getCookie(cookieName) {
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
  return (
    <div className="relative bg-black h-auto w-screen">
      <InnerNav />
      <Models />
      <div
        style={{ display: "flex",justifyContent: "space-between", backgroundImage: "url('/images/bg1.jpg')" }}
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
            overflow:"scroll"
          }}
        >
          {/* Left form div Stands here */}


          {/* Clean columns */}
          <br />
          <h1 style={{ fontSize: "30px", fontWeight: "bolder" }}> <i className="fa-solid fa-file-zipper" style={{ color: "#036EFD" }}></i> &nbsp; Data Transformation</h1><br/><br/>
          <form>
            <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}><i class="fa-solid fa-broom" style={{color:"#036EFD", fontSize:"20px"}}></i> &nbsp;Clean Coloumns </h1>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
            <i class="fa-solid fa-arrow-up-from-bracket"></i>&nbsp; Clean Coloumns
            </button>
          </form>
          {/* Remove Duplicates , buttons */}

          <br />
          <br />
          <form>
             <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}><i class="fa-solid fa-eraser" style={{color:"#036EFD", fontSize:"20px"}}></i> &nbsp;Remove Duplicates </h1>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
            <i class="fa-solid fa-arrow-up-from-bracket"></i>&nbsp; Remove Duplicates
            </button>
          </form>
          <br />
          <br />

          {/* Check missing value */}

          <br />
          <form>
             <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}> <i class="fa-solid fa-circle-check" style={{color:"#036EFD", fontSize:"20px"}}></i> &nbsp;Check Missing Values</h1>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
            <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Check Missing Values
            </button>
          </form>
          <br />
          <br />
          {/* Handle non numeric (fill) */}

          <form>
             <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}><i class="fa-solid fa-gears" style={{color:"#036EFD", fontSize:"20px"}}></i> &nbsp; Handle non numeric (fill)</h1>
            <div class="mb-3"> 
              <input type="text" class="form-control" id="exampleInputPassword1" placeholder='Enter string value' style={{borderRadius:"20px"}} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
            <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Handle non numeric (fill)
            </button>
          </form>
          <br />
          <br />
          {/* Handle non numeric drop  */}

          <form>
             <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}><i class="fa-solid fa-angle-down" style={{color:"#036EFD", fontSize:"20px"}}></i> &nbsp; Handle non numeric drop </h1>
            <br />
            <div class="mb-3">
              
             <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter String Value"  style={{borderRadius:"20px"}}/>
            </div>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle my-2" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{borderRadius:"20px", width:"40vh"}}>
                Dropdown button
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
             <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Handle non numeric drop
            </button>
          </form>
          <br />
          <br />
          {/* Handle numeric data median  */}

          <form>
             <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}> <i class="fa-solid fa-bars" style={{color:"#036EFD", fontSize:"20px"}}></i> &nbsp;Handle numeric data median </h1>
            <br />
            <div class="mb-3">
              
             <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter String Value"  style={{borderRadius:"20px"}}/>
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
             <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Handle numeric data median
            </button>
          </form>
          <br />
          <br />

          {/* Convert to numeric  */}
          <form>
             <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}><i class="fa-solid fa-wand-magic-sparkles" style={{color:"#036EFD", fontSize:"20px"}}></i> &nbsp;Convert to numeric </h1>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
             <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Covert to numeric
            </button>
          </form>
          <br />
          <br />
          {/* Normalize date coloumn  */}
          <form>  <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}><i class="fa-solid fa-bolt" style={{color:"#036EFD", fontSize:"20px"}}></i> &nbsp;Normalize date coloumn </h1>
            <div class="mb-3">
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter String Value"  style={{borderRadius:"20px"}}/>
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
             <i class="fa-solid fa-arrow-up-from-bracket"></i> Normalize date coloumn
            </button>
            </form>
          <br />
          <br />

          {/* One hot encoding */}
          <form>  <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}><i class="fa-solid fa-fire" style={{color:"#036EFD", fontSize:"20px"}}></i> &nbsp;One hot encoding</h1>
            <div class="mb-3">
             <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter String Value"  style={{borderRadius:"20px"}}/>
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
             <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; &nbsp; Normalize date coloumn
            </button>
            </form>
          <br />
          <br />
          {/* Get  column data types  */}

          <form>
          <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}><i class="fa-solid fa-folder-open "style={{color:"#036EFD", fontSize:"20px"}}></i> &nbsp;Get coloumn data types </h1>

            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
             <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Get coloumn data types
            </button>
          </form>
          <br />  <br />
          {/* Drop rows without target  */}
          <form>
             <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}><i class="fa-solid fa-layer-group" style={{color:"#036EFD", fontSize:"20px"}}></i>&nbsp;&nbsp;Drop rows without target </h1>
            <div class="mb-3">
             <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter String Value"  style={{borderRadius:"20px"}}/>
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
             <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp;Drop rows without target
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
              backgroundImage:"url('/images/grad1 copy.png')" ,
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
           
           <h1 style={{ fontSize: "30px", fontWeight: "bolder" }}> <i className="fa-solid fa-file-csv" style={{ color: "#036EFD" }}></i> &nbsp; Uploaded Dataset</h1><br/>
          </div>
          <br />
          <table
              className="table overflow-scroll"
              style={{
                backgroundColor: "#FCD571",
                width: "100%",
                borderRadius: "10px",
              }}
            >
              <thead className="font-bold" dangerouslySetInnerHTML={{ __html: tableHead}}></thead>
              <tbody dangerouslySetInnerHTML={{ __html: tableData }}></tbody>
            </table>
        </div>
      </div>

    </div>
  );
};

export default DataTransfer;