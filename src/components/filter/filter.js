import React, { useEffect, useState } from "react";
import CompanyCard from "../CompanyCard/CompanyCard";
import "./Filter.css";
import Topbar from "../../elements/topbar/Topbar";
import { db } from "../../services/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import SliderContainer from "./SliderContainer";

const useStyles2 = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "80%",
    height: "70%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    overflowY: "scroll",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Filter = () => {
  const [financeData, setFinanceData] = useState([]);
  const classes2 = useStyles2();
  //EPS
  const [eps, setEps] = React.useState([0, 500]);
  const handleChangeEPS = (event, newValue) => {
    setEps(newValue);
  };
  //TrailingPE
  const [trailingPE, setTrailingPE] = React.useState([0, 50]);
  const handleChangeTrailingPE = (event, newValue) => {
    setTrailingPE(newValue);
  };

  //PB
  const [PB, setPB] = React.useState([0, 4]);
  const handleChangePB = (event, newValue) => {
    setPB(newValue);
  };

  //beta
  const [beta, setBeta] = React.useState([0, 2]);
  const handleChangeBeta = (event, newValue) => {
    setBeta(newValue);
  };
  //regularPrice
  const [regularPrice, setRegularPrice] = React.useState([0, 700]);
  const handleChangeRegularPrice = (event, newValue) => {
    setRegularPrice(newValue);
  };
  //priceToSale
  const [priceToSale, setPriceToSale] = React.useState([0, 100]);
  const handleChangePriceToSale = (event, newValue) => {
    setPriceToSale(newValue);
  };

  const [open, setOpen] = useState(false);
  const [empty, setEmpty] = useState(false);
  useEffect(() => {
    db.collection("finance").onSnapshot((snapShot) => {
      setFinanceData(snapShot.docs.map((doc) => doc.data()));
    });
  }, [open]);

  const apply = () => {
    if (
      !financeData
        .filter(
          (data) =>
            data.epsTrailingTwelveMonths &&
            data.epsTrailingTwelveMonths <= eps[1] &&
            data.epsTrailingTwelveMonths >= eps[0]
        )
        .filter(
          (data) =>
            data.trailingPE &&
            data.trailingPE <= trailingPE[1] &&
            data.trailingPE >= trailingPE[0]
        )
        .filter(
          (data) =>
            data.priceToBook &&
            data.priceToBook <= PB[1] &&
            data.priceToBook >= PB[0]
        )
        .filter(
          (data) => data.beta && data.beta <= beta[1] && data.beta >= beta[0]
        )
        .filter(
          (data) =>
            data.regularMarketPrice &&
            data.regularMarketPrice <= regularPrice[1] &&
            data.regularMarketPrice >= regularPrice[0]
        )
        .filter(
          (data) =>
            data.priceToSales &&
            data.priceToSales <= priceToSale[1] &&
            data.priceToSales >= priceToSale[0]
        ).length
    ) {
      setEmpty(true);
    }
    setFinanceData([]);
    setOpen(false);
  };

  return (
    <div className="outer-container">
      <Topbar />
      <div className="button-container">
        <button className="button" onClick={() => setOpen(true)}>
          Filter
        </button>
      </div>
      <div className="container">
        {financeData &&
        financeData
          .filter(
            (data) =>
              data.epsTrailingTwelveMonths &&
              data.epsTrailingTwelveMonths <= eps[1] &&
              data.epsTrailingTwelveMonths >= eps[0]
          )
          .filter(
            (data) =>
              data.trailingPE &&
              data.trailingPE <= trailingPE[1] &&
              data.trailingPE >= trailingPE[0]
          )
          .filter(
            (data) =>
              data.priceToBook &&
              data.priceToBook <= PB[1] &&
              data.priceToBook >= PB[0]
          )
          .filter(
            (data) => data.beta && data.beta <= beta[1] && data.beta >= beta[0]
          )
          .filter(
            (data) =>
              data.regularMarketPrice &&
              data.regularMarketPrice <= regularPrice[1] &&
              data.regularMarketPrice >= regularPrice[0]
          )
          .filter(
            (data) =>
              data.priceToSales &&
              data.priceToSales <= priceToSale[1] &&
              data.priceToSales >= priceToSale[0]
          ).length ? (
          financeData
            .filter(
              (data) =>
                data.epsTrailingTwelveMonths &&
                data.epsTrailingTwelveMonths <= eps[1] &&
                data.epsTrailingTwelveMonths >= eps[0]
            )
            .filter(
              (data) =>
                data.trailingPE &&
                data.trailingPE <= trailingPE[1] &&
                data.trailingPE >= trailingPE[0]
            )
            .filter(
              (data) =>
                data.priceToBook &&
                data.priceToBook <= PB[1] &&
                data.priceToBook >= PB[0]
            )
            .filter(
              (data) =>
                data.beta && data.beta <= beta[1] && data.beta >= beta[0]
            )
            .filter(
              (data) =>
                data.regularMarketPrice &&
                data.regularMarketPrice <= regularPrice[1] &&
                data.regularMarketPrice >= regularPrice[0]
            )
            .filter(
              (data) =>
                data.priceToSales &&
                data.priceToSales <= priceToSale[1] &&
                data.priceToSales >= priceToSale[0]
            )
            .slice(0, 10)
            .map((data) => (
              <CompanyCard companyName={data.symbol} width={1000} />
            ))
        ) : (
          <div className="test-div">
            {empty ? "No results match your filter conditions" : null}
          </div>
        )}
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={classes2.modal}
      >
        <div className={classes2.paper}>
          <div className="header-container">
            <h2>All filters</h2>
          </div>
          <div className="button-modal-container">
            <button className="button" onClick={apply}>
              Filter
            </button>
          </div>
          <div className="filter-container">
            <SliderContainer
              value={eps}
              handleChange={handleChangeEPS}
              name={"Earnings Per Share (EPS)"}
              min={0}
              max={500}
            />

            <SliderContainer
              value={trailingPE}
              handleChange={handleChangeTrailingPE}
              name={"Price To Earnings Ratio (P/E)"}
              min={0}
              max={50}
            />

            <SliderContainer
              value={PB}
              handleChange={handleChangePB}
              name={"Price to Book Ratio"}
              min={0}
              max={4}
            />

            <SliderContainer
              value={beta}
              handleChange={handleChangeBeta}
              name={"Beta"}
              min={0}
              max={2}
            />

            <SliderContainer
              value={regularPrice}
              handleChange={handleChangeRegularPrice}
              name={"Regular Price"}
              min={0}
              max={700}
            />

            <SliderContainer
              value={priceToSale}
              handleChange={handleChangePriceToSale}
              name={"Price to Sales"}
              min={0}
              max={100}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Filter;
