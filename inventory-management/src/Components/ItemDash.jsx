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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Sidemenus from "./Dashboard";

const Editsdash = () => {
  const [name, setName] = useState([]);
  const [button, setButton] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/allitems").then((response) => {
      setName(response.data);
      console.log(response.data);
    });
    Axios.get("http://localhost:3001/inventory").then((response) => {
      setButton(response.data);
      console.log(response.data);
    });
  }, []);

  return (
   <div className="Background">
    <div className="myComponent">
    <Box sx={{ display: "flex", backgroundColor: "whitsmoke", height: 900, mt:"3%"}}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            ALL-I T E M S
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ITEM NAME</TableCell>
                  <TableCell>SELLING PRICE</TableCell>
                  <TableCell>MANUFACTURER</TableCell>
                  <TableCell>BRAND</TableCell>
                  <TableCell>QUANTITY</TableCell>
                  <TableCell>CATEGORY</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {name.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell>{item.sellingPrice}</TableCell>
                    <TableCell>{item.manufacturer}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <Link to={`/Inventory/${item._id}`}>Edit</Link>
                    </TableCell>
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

export default Editsdash;
