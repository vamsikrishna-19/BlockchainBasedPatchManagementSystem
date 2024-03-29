import { useState, useEffect } from "react"
import React from 'react';
import Axios from "axios";
// import Web3Contract3 from "./Web3Contract3";
import Web3Contract2 from "./Web3Contract2";
import ConnectMetaMask from "./ConnectMetaMask";
const AdmingetsDownloadHistory = () => {
  // const Web3 = Web3Contract3();
  // const contract3 = Web3[0];
  const Web3Contract = Web3Contract2();
  const contract2 = Web3Contract[0];
  const Account = ConnectMetaMask();
  const account = Account[0];
  console.log(contract2);
  // console.log(contract3);
  const [Flag, setFlag] = useState(false);
  const [myselect, setMyselect] = useState("");
  const [DataArray, setDataArray] = useState([]);
  const [DataArray2, setDataArray2] = useState([]);
  async function recievepatchdata() {
    contract2.methods.getdetails().call().then((result) => {
      console.log(result);
      setDataArray(result);
    })
  }
  const getData = () => {
    console.log(myselect);
  }
  const setTime = (timestamp) => {
    const milliseconds = timestamp * 1000;
    const dateObject = new Date(milliseconds);
    const formattedTime = dateObject.toLocaleString();
    return (`${formattedTime}`);
  }
  const formatDate = (value) => {

    const transactionTimeString = value; // Assuming data.TransactionTime is a string representing the transaction time
    const transactionTime = new Date(transactionTimeString);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };

    return transactionTime.toLocaleDateString('en-US', options);
  }
  const function1 = async (value) => {
    try {
      console.log(value);
      const res = await Axios.get("http://localhost:3001/getdownloadHistory/patchname", {
        params: {
          Patchname: value
        }
      })
      console.log(res.data);
      setDataArray2(res.data);
      setFlag(false);
    }
    catch (error) {
      console.log(error);
      setFlag(true);
      setDataArray2([]);
    }
  }
  useEffect(() => {
    if (contract2) {
      recievepatchdata();
    }
  }, [contract2]);

  return (
    <div>
      <div className="my-5 d-flex justify-content-center ">
        <select name="selectPatch" value={myselect} id="myselect" className="col-4 form-control-lg" onChange={(e) => {
          // let value = e.target.value;
          setMyselect(e.target.value);
          function1(e.target.value);
        }}>
          <option >Select Patch</option>
          {
            DataArray.map((data, dataIndex) => {
              if (data.deploymentstatus == "Deployed") {
                return (
                  <>
                    <option key={data.patchname} value={data.patchname}>{data.patchname}</option>
                  </>
                )
              }
            })
          }
        </select>
      </div>
      {Flag == true &&
        (
          <>
            <div className="row d-flex justify-content-center">
              <div className="col-7">
                <div className="alert alert-warning container-fluid" role="alert">
                  <b>
                    No one has downloaded the patch yet
                  </b>
                </div>
              </div>
            </div>
          </>
        )
      }
      {DataArray2.map((data, dataIndex) => {
        return (
          <>
          <div className=" d-flex justify-content-center">

          <div className="col-md-10">

            <li className="form-control">
              <span className="text-success mx-1" style={{}}>
                <b>

                  {data.Username}
                </b>
              </span>
              has downloaded the patch on
              <span className="text-primary mx-2">
                <b>
                  {formatDate(data.Date)}
                </b>

              </span>
            </li>
            <br />
          </div>
          </div>
          </>
        )
      })
      }
    </div>
  )
}

export default AdmingetsDownloadHistory

