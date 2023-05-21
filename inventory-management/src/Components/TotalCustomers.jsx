import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

const TotalCustomers = () => {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/allcustomers").then((response) => {
      setCustomer(response.data);
      console.log(response.data);
    });
  }, []);

  const handleDelete = (_id) => {
    Axios.delete(`http://localhost:3001/customer/${_id}`).then(() => {
      getData();
    });
  };

  const getData = () => {
    Axios.get("http://localhost:3001/allcustomers").then((getData) => {
      setCustomer(getData.data);
    });
  };

  return (
  <div className="Background">
     <div className="myComponent">
     <div className="container-fluid">
      <div className="bg-whitesmoke p-5">
        <h5 className="text">ALL - CUSTOMERS</h5>
        <br />
        <table className="table table-bordered table-responsive">
          <thead>
            <tr>
              <th>CUSTOMER NAME</th>
              <th>EMAIL</th>
              <th>ADDRESS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {customer.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>
                  <Link to={`/editcustomer/${item._id}`} className="btn btn-link">
                    Edit
                  </Link>{" "}
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   </div>
  </div>
  );
};

export default TotalCustomers;
