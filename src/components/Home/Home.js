import React, { createRef, useCallback, useState } from "react";
import "./Home.scss";
import Customers from "../Database/Customers";
import Products from "../Database/Products";
import Suppliers from "../Database/Suppliers";
import alasql from "alasql";
import SnackBar from "../SnackBar/SnackBar";
import Result from "../Result/Result";

export default function Home() {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState([]);
  const scrollRef = createRef();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setsnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const onSubmit = useCallback(
    (e, query) => {
      try {
        e.preventDefault();
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
        setSnackbarMessage("Data fetched. :)");
        scrollRef.current.scrollTo(0, 0);
        return res;
      } catch (error) {
        console.error(error);
        var errorMessage = null;
        if (error.message.includes("Table does not exist")) {
          errorMessage = "Table doesn't exist.";
        } else {
          errorMessage = "Incorrect format";
        }
        setOpenSnackbar(true);
        setsnackbarSeverity("error");
        setSnackbarMessage(`Error - ${errorMessage}`);
      }
    },
    [scrollRef]
  );

  const predefinedSubmit = useCallback(
    (e, data) => {
      onSubmit(e, data);
    },
    [onSubmit]
  );

  const clearOutput = useCallback(() => {
    setOutput([]);
    setOpenSnackbar(true);
    setsnackbarSeverity("success");
    setSnackbarMessage("Plaground cleared.");
  }, []);

  return (
    <div className="home">
      <SnackBar
        setOpenSnackBar={setOpenSnackbar}
        openSnackBar={openSnackbar}
        snackBarSeverity={snackbarSeverity}
        snackBarMessage={snackbarMessage}
      />
      <Result output={output} clearOutput={clearOutput} scrollRef={scrollRef} />
      <form onSubmit={(e) => onSubmit(e, query)} className="home__content">
        <input
          required
          placeholder="Enter SQL query"
          className="home__content--input"
          onChange={(e) => onChange(e)}
        />
        <button className="home__content--btn" type="submit">
          Run Query
        </button>
        <p className="home__content--p">Predefined queries:</p>
        <button
          className="home__content--btn"
          onClick={(e) => predefinedSubmit(e, "SELECT * FROM customers")}
        >
          SELECT * FROM customers
        </button>
        <button
          className="home__content--btn"
          onClick={(e) => predefinedSubmit(e, "SELECT count(*) FROM customers")}
        >
          SELECT count(*) FROM customers
        </button>
        <button
          className="home__content--btn"
          onClick={(e) => predefinedSubmit(e, "SELECT * FROM products")}
        >
          SELECT * FROM products
        </button>
        <button
          className="home__content--btn"
          onClick={(e) => predefinedSubmit(e, "SELECT count(*) FROM products")}
        >
          SELECT count(*) FROM products
        </button>
        <button
          className="home__content--btn"
          onClick={(e) => predefinedSubmit(e, "SELECT * FROM suppliers")}
        >
          SELECT * FROM suppliers
        </button>
        <button
          className="home__content--btn"
          onClick={(e) => predefinedSubmit(e, "SELECT count(*) FROM suppliers")}
        >
          SELECT count(*) FROM suppliers
        </button>
      </form>
    </div>
  );
}
