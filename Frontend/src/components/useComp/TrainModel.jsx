import React, { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import InnerNav from './InnerNav';
import Models from './Models';

export const TrainModel = () => {
  useEffect(() => {
    toast.success("User Logged In", {
      duration: 3000, // Duration in milliseconds
    });
  }, []);

  return (
    <div className="relative bg-black h-auto w-screen">
      <div className="absolute inset-0 bg-cover bg-center bg-fixed blur-sm z-0" style={{ backgroundImage: "url('/images/bg1.jpg')" }}></div>
      <div className="relative z-10">
        <InnerNav />
        <br/>
        <Models />
        <br/>
        <div style={{ display: "flex", justifyContent: "space-between" }} className="p-5">
          <div className="form rounded-lg shadow-lg p-5" style={{ flex: 1, marginRight: "20px", backgroundColor: "#F4F1FD", height: "80vh", borderRadius: "20px" }}>
            <form>
              <div className="mb-3">
                <br /><br />
                <label htmlFor="exampleInputEmail1" className="form-label" style={{ fontSize: "30px", fontWeight: "bolder" }}>
                  <i className="fa-solid fa-microchip"></i> &nbsp;Upload your Dataset file
                </label>
                <br /><br /><br /><br />
                <center>
                  <input type="file" className="form-control" name='file' id="email" aria-describedby="emailHelp" style={{ borderRadius: "20px", width: "40vh" }} />
                </center>
                <div id="emailHelp" className="form-text">
                  Upload your file to train your model <i className="fa-solid fa-file-import"></i>
                </div>
                <br /><br />
                <button type="submit" className="btn btn-primary" style={{ borderRadius: "20px", background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)", color: "white", borderColor: "#EFF2FF", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                  <i className="fa-solid fa-cloud-arrow-up"></i> &nbsp; Upload File
                </button>
              </div>
            </form>
          </div>
          <div className="table-primary bg-yellow-200 rounded-lg shadow-lg p-5" style={{ flex: 1, marginLeft: "20px", backgroundColor: "#FCD571", borderRadius: "20px" }}>
            <br/>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <i className="fa-solid fa-database" style={{ color: '#EC7A6F' }}></i>
              &nbsp;&nbsp; <h1 style={{ fontSize: "30px", fontWeight: "bolder" }}>Uploaded Dataset</h1>
            </div>
            <br/>
            <table className="table" style={{ backgroundColor: "#FCD571", width: "100%", borderRadius: "10px" }}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" style={{ backgroundColor: "yellow" }}>1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colSpan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default TrainModel;
