import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const EditCustomer = () => {
  const [customer, setcustomer] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    Axios.get(`http://localhost:3001/customer/${id}`).then((response) => {
      setcustomer(response.data);
      console.log(customer?.name);
    });
  }, []);

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await Axios.put(
        `http://localhost:3001/editcustomers/${id}`,
        {
          name: data.name,
          email: data.email,
          address: data.address,
        }
      );

      console.log(response.data.message);
      reset();
      navigate("/customers");
    } catch (error) {
      console.error(error);
      setMessage("Error updating");
    }
  };

  return (
   <div className="Background">
    <div className="myComponent">
    <div className="container-fluid bg-whitesmoke">
      <div className="container mt-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <h5 className="text-center">EDIT - CUSTOMER</h5>
          </div>
          <div className="mb-3">
            <input
              {...register("name", { required: true })}
              className="form-control"
              placeholder="Name"
              defaultValue={customer?.name}
              error={Boolean(errors.name)}
            />
            {errors.name && (
              <span className="text-danger">Name is required</span>
            )}
          </div>
          <div className="mb-3">
            <input
              {...register("email", { required: true })}
              className="form-control"
              placeholder="Email"
              defaultValue={customer?.email}
              error={Boolean(errors.email)}
            />
            {errors.email && (
              <span className="text-danger">Email is required</span>
            )}
          </div>
          <div className="mb-3">
            <input
              {...register("address", { required: true })}
              className="form-control"
              placeholder="Address"
              defaultValue={customer?.address}
              error={Boolean(errors.address)}
            />
            {errors.address && (
              <span className="text-danger">Address is required</span>
            )}
          </div>
          <button type="submit" className="btn btn-primary ">
            UPDATE
          </button>
        </form>
      </div>
    </div>
    </div>
   </div>
  );
};

export default EditCustomer;
