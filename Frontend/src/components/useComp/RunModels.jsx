import React, { useState } from 'react';
import InnerNav from './InnerNav';
import Models from './Models';

const RunModels = () => {
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


          {/* Model Training */}
          <br />
          <h1 style={{ fontSize: "30px", fontWeight: "bolder" }}> <i className="fa-solid fa-file-zipper" style={{ color: "#036EFD" }}></i> &nbsp; Model Training</h1><br/><br/>
          
          <br />
            {/* SVM Model */}
          <form>
             <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}><i class="fa-solid fa-gears" style={{color:"#036EFD", fontSize:"20px"}}></i> &nbsp;SVM Model</h1>
            <div class="mb-3"> <label htmlFor="exampleInputPassword1">Enter numeric value</label>
              <input type="text" class="form-control" id="c-SVM" name="c-SVM" placeholder='Enter numeric value' value={1} style={{borderRadius:"20px"}} />
            </div>
            <input type="text" class="form-control" id="KernelSVM" name="KernelSVM" placeholder="Enter String Value"  style={{borderRadius:"20px"}}/>
             <br />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
            <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Run SVM Model
            </button>
          </form>
          <br />
          <br />
          {/* Random Forest  */}

          <form>
             <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}><i class="fa-solid fa-angle-down" style={{color:"#036EFD", fontSize:"20px"}}></i> &nbsp; Random Forest </h1>
            <br />
            <div class="mb-3">
              
             <input type="text" class="form-control" id="nestimatorsRF" name="nestimatorsRF" placeholder="Enter Numeric Value"  style={{borderRadius:"20px"}}/>
             <br />
             <input type="text" class="form-control" id="maxdepthRF" name="maxdepthRF" placeholder="Enter Numeric Value"  style={{borderRadius:"20px"}}/>
            </div>
            <div class="dropdown">
              <select name="minSampleSplitRF" id="minSampleSplitRF" style={{borderRadius:"20px", width:"20vh"}}>
                <option value="0.2">2</option>
                <option value="0.2">3</option>
                <option value="0.2">4</option>
                <option value="0.2">5</option>
                <option value="0.2">6</option>
              </select>
            </div>
            <br />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
             <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Run Random Forest
            </button>
          </form>
          <br />
          <br />
          {/* XGBoost  */}

          <form>
             <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}> <i class="fa-solid fa-bars" style={{color:"#036EFD", fontSize:"20px"}}></i> &nbsp;XGBoost </h1>
            <br />
            <div class="mb-3">
              
             <input type="text" class="form-control" id="nestimatorXGB" name="nestimatorXGB" placeholder="Enter Numeric Value"  style={{borderRadius:"20px"}}/>
             <br />
             <input type="text" class="form-control" id="LearningRateXGB" name="LearningRateXGB" placeholder="Enter Numeric Value"  style={{borderRadius:"20px"}}/>
             <br />
             <input type="text" class="form-control" id="MaxDepthXGB" name="MaxDepthXGB" placeholder="Enter Numeric Value"  style={{borderRadius:"20px"}}/>
             <br />
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
             <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Run XGBoost
            </button>
          </form>
          <br />
          <br />

          {/* Decision Tree  */}
          <form>
             <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}><i class="fa-solid fa-wand-magic-sparkles" style={{color:"#036EFD", fontSize:"20px"}}></i> &nbsp;Decision Tree </h1>
            <br />
             <input type="text" class="form-control" id="CriterionDtree" name="CriterionDtree" placeholder="Enter String Value"  style={{borderRadius:"20px"}}/>
             <br />
             <input type="text" class="form-control" id="MaxDepthDtree" name="MaxDepthDtree" placeholder="Enter Numeric Value"  style={{borderRadius:"20px"}}/>
             <br />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
             <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; Run Decision Tree
            </button>
          </form>
          <br />
          <br />
          {/* Bagging  */}
          <form>  <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}><i class="fa-solid fa-bolt" style={{color:"#036EFD", fontSize:"20px"}}></i> &nbsp;Bagging </h1>
            <div class="mb-3">
            <br />
             <input type="text" class="form-control" id="CriterionBaging" name="CriterionBaging" placeholder="Enter String Value"  style={{borderRadius:"20px"}}/>
             <br />
             <input type="text" class="form-control" id="MaxDepthDtree" name="MaxDepthDtree" placeholder="Enter Numeric Value"  style={{borderRadius:"20px"}}/>
             <br />
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
             <i class="fa-solid fa-arrow-up-from-bracket"></i> Run Bagging
            </button>
            </form>
          <br />
          <br />

          {/* Tpot */}
          <form>  <h1 style={{ fontSize: "25px", fontWeight: "bolder", color:"grey" }}><i class="fa-solid fa-fire" style={{color:"#036EFD", fontSize:"20px"}}></i> &nbsp;Tpot autoML</h1>
          <br />
            <div class="mb-3">
             <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter String Value"  style={{borderRadius:"20px"}}/>
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px",width:"40vh" ,background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", }}>
             <i class="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; &nbsp; Normalize date column
            </button>
            </form>
          <br />
          <br />
          
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

export default RunModels;