import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import Sidemenus from "./Dashboard";
const PaymentsRecievded = () => {
  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState();
  const [data, setData] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const cdate = currentDate.toLocaleString();
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/saleslist").then((response) => {
      setItems(response.data);
      console.log(response.data);
    });
  }, []);

  const fetchCustomerName = (cid) => {
    Axios.get(`http://localhost:3001/customer/${cid}`).then((response) => {
      setCustomer(response.data);
      console.log(response.data);
    });
  };

  const fetchItemName = (id) => {
    Axios.get(`http://localhost:3001/allitems/${id}`).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  };

  return (
   <div className="Background">
    <div className="myComponent">
    <Box
      sx={{ display: "flex", backgroundColor: "whitesmoke", height: 900}}
    >
      {/* <Sidemenus /> */}
      <Grid item xs={10} p={3}>
        <Typography variant="h6" align="center" gutterBottom>
          CUSTOMER - PAYMENTS
        </Typography>
      </Grid>
      <Grid item xs={10} mt={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>CUSTOMER NAME</TableCell>
                <TableCell>ADDRESS</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>ITEM NAME</TableCell>
                <TableCell>UNIT</TableCell>
                <TableCell>PRICE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  {fetchCustomerName(item.cid)}
                  <TableCell>{customer?.name}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.customername}</TableCell>
                  {fetchItemName(item.itemname)}
                  <TableCell>{data?.itemName}</TableCell>
                  <TableCell>{item.squantity}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Box>
    </div>
   </div>
  );
};

export default PaymentsRecievded;
