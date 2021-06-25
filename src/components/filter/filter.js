import React, { useEffect, useRef, useState } from "react";
import CompanyCard from "../CompanyCard/CompanyCard";
import "./Filter.css";
import Topbar from "../../elements/topbar/Topbar";
import { db } from "../../services/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import SliderContainer from "./SliderContainer";

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 300,
  },
});

const useStyles2 = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "80%",
    height: "60%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const URL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&symbols=ZBH,ZBRA,ZION,ZTS`;

const Filter = () => {
  const [financeData, setFinanceData] = useState([]);
  const classes = useStyles();
  const classes2 = useStyles2();
  const [value, setValue] = React.useState([20, 37]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    db.collection("finance").onSnapshot((snapShot) => {
      setFinanceData(snapShot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="outer-container">
      <Topbar />
      <div>
        <button onClick={() => setOpen(true)}>open modal</button>
      </div>
      <div className="container">
        <CompanyCard companyName="AAPL" width={1000} />
        <CompanyCard companyName="MSFT" width={1000} />
        <CompanyCard companyName="GOOGL" width={1000} />
        <CompanyCard companyName="AMD" width={1000} />
        {/* <button onClick={callApi}>call API</button> */}
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={classes2.modal}
      >
        <div className={classes2.paper}>
          <h2>All filters</h2>
          <div className="filter-container">
            <SliderContainer
              value={value}
              handleChange={handleChange}
              name={"Hello"}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Filter;
