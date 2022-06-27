import React, { useCallback, useState } from "react";
import "./Home.scss";
import Customers from "../Database/Customers";
import Products from "../Database/Products";
import Suppliers from "../Database/Suppliers";
import alasql from "alasql";
import SnackBar from "../SnackBar/SnackBar";

export default function Home() {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState([]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setsnackbarSeverity] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const onClick = useCallback(() => {
    try {
      var queryName = null;
      var table = null;

      if (query.includes("customers")) {
        queryName = "customers";
        table = Customers;
      } else if (query.includes("products")) {
        queryName = "products";
        table = Products;
      } else if (query.includes("suppliers")) {
        queryName = "suppliers";
        table = Suppliers;
      }

      let updatedQuery = query.replace(queryName, "?");
      let res = alasql(updatedQuery, [table]);
      setOutput(res);
      setOpenSnackbar(true);
      setsnackbarSeverity("success");
      setSnackbarMessage("Data fetched! :)");
      return res;
    } catch (error) {
      setOpenSnackbar(true);
      setsnackbarSeverity("error");
      setSnackbarMessage("Oops Error");
      console.error(error);
    }
  }, [query]);

  return (
    <div className="home">
      <SnackBar
        setOpenSnackBar={setOpenSnackbar}
        openSnackBar={openSnackbar}
        snackBarSeverity={snackbarSeverity}
        snackBarMessage={snackbarMessage}
      />
      <h1 className="home__h1">home</h1>
      <input
        type="text"
        className="home__input"
        onChange={(e) => onChange(e)}
      />
      <button onClick={() => onClick()}>output</button>
      <br />
      {output.map((item) => (
        <tr key={item.id}>
          {Object.values(item).map((val) => (
            <td style={{ border: "1px solid black", padding: "5px" }}>{val}</td>
          ))}
        </tr>
      ))}
    </div>
  );
}
