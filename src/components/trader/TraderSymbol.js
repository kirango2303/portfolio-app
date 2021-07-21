import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Topbar from "../../elements/topbar/Topbar";
import { db } from "../../services/firebase";
import "./TraderSymbol.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CompanyCard from "../CompanyCard/CompanyCard";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import axios from "axios";

const useStyles2 = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "45%",
    height: "70%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    overflowY: "scroll",
    borderRadius: 10,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: 30,
  },
  formControl2: {
    margin: theme.spacing(1),
    width: 250,
  },
  margin: {
    margin: theme.spacing(1),
    width: 400,
  },
  btn: {
    margin: theme.spacing(1),
    width: "40%",
    color: "#2c40d0",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const TraderSymbol = (props) => {
  const { symbol } = useParams();
  const { location } = props;
  const data = location.state.data;
  // console.log(data);
  const { currentUser } = useAuth();
  const [invalidate, setInvalidate] = useState(true);
  const [docId, setDocId] = useState(""); //docId of user
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [action, setAction] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [regularMarketPrice, setRegularMarketPrice] = useState(0.1);
  const [stockData, setStockData] = useState([]);

  const classes = useStyles();
  const classes2 = useStyles2();
  const URL = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&symbols=${symbol}`;

  const handleShowMax = () => {
    if (action) {
      if (action == "buy") {
        setQuantity(maxQuantity);
      } else {
        if (symbol in currentUserInfo.stocks) {
          setQuantity(currentUserInfo.stocks[symbol].quantity);
        }
      }
    }
  };

  const handleChange = (event) => {
    setAction(event.target.value);
  };

  const handleChangeQuantity = (e) => {
    e.target.value = Math.min(e.target.value, maxQuantity);
    if (
      action == "sell" &&
      e.target.value > currentUserInfo.stocks[symbol].quantity
    ) {
      e.target.value = Math.min(
        e.target.value,
        currentUserInfo.stocks[symbol].quantity
      );
      alert("You can only sell a maximum of what you have");
    }
    setQuantity(e.target.value);
  };

  const getStockData = async () => {
    const res = await axios.get(URL, {
      headers: {
        "x-rapidapi-key": "8b18afce59msh40240d866aa4c6bp1a5a7ejsnbdd82173f217",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
    });
    // console.log(res.data.quoteResponse.result[0]);
    const stock = res.data.quoteResponse.result[0];
    setRegularMarketPrice(stock.regularMarketPrice.toFixed(2));
    setStockData(stock);
  };

  const memoizedCallback = useCallback(() => {
    getStockData();
  }, [URL]);

  useEffect(() => {
    memoizedCallback();
  }, []);

  useEffect(() => {
    if (invalidate) {
      db.collection("users")
        .where("uid", "==", currentUser.uid)
        .onSnapshot((snapShot) => {
          snapShot.docs.map((doc) => setDocId(doc.id));
        });
      setInvalidate(false);
    }
  }, [invalidate, currentUser]);

  useEffect(() => {
    if (docId) {
      db.collection("users")
        .doc(docId)
        .onSnapshot((doc) => {
          setCurrentUserInfo(doc.data());
        });
    }
  }, [docId]);

  useEffect(() => {
    if (action) {
      if (action == "buy") {
        setMaxQuantity(
          Math.floor(currentUserInfo.buying_power / regularMarketPrice)
        );
      } else {
        if (symbol in currentUserInfo.stocks) {
          setQuantity(currentUserInfo.stocks[symbol].quantity);
          setMaxQuantity(currentUserInfo.stocks[symbol].quantity);
        } else {
          setQuantity(0);
          setMaxQuantity(0);
        }
      }
    }
  }, [currentUserInfo, regularMarketPrice, action]);

  const handleClear = () => {
    setQuantity(0);
    setAction("");
  };

  const handleBuyStock = async () => {
    if (symbol in currentUserInfo.stocks) {
      await db
        .collection("users")
        .doc(docId)
        .update({
          [`stocks.${symbol}.cur_value`]:
            currentUserInfo.stocks[symbol].cur_value +
            regularMarketPrice * quantity,
          [`stocks.${symbol}.quantity`]:
            currentUserInfo.stocks[symbol].quantity * 1 + quantity * 1,
          [`stocks.${symbol}.average_price`]:
            Math.round(
              ((currentUserInfo.stocks[symbol].cur_value +
                regularMarketPrice * quantity) /
                (currentUserInfo.stocks[symbol].quantity * 1 + quantity * 1)) *
                100
            ) / 100,
        });
    } else {
      const newStocks = { ...currentUserInfo.stocks };
      newStocks[symbol] = {
        cur_value: regularMarketPrice * quantity,
        quantity: quantity * 1,
        average_price: regularMarketPrice,
      };
      await db.collection("users").doc(docId).update({
        stocks: newStocks,
      });
    }

    await db
      .collection("users")
      .doc(docId)
      .update({
        num_stocks: currentUserInfo.num_stocks * 1 + quantity * 1,
        long_stock: currentUserInfo.long_stock + regularMarketPrice * quantity,
        cash: currentUserInfo.cash - regularMarketPrice * quantity - 19.95,
      });
    let sum = 0;
    for (const [key, value] of Object.entries(currentUserInfo.stocks)) {
      sum += value.cur_value;
    }
    await db
      .collection("users")
      .doc(docId)
      .update({
        buying_power:
          currentUserInfo.cash -
          regularMarketPrice * quantity +
          currentUserInfo.long_stock / 2,
        total_value: currentUserInfo.cash - regularMarketPrice * quantity + sum,
      });
    let today_change =
      Math.round((data.iexRealtimePrice / stockData.regularMarketPrice) * 100) /
      100;
    let total_value_today =
      (Math.round(quantity * regularMarketPrice * 100) / 100) * today_change;
    await db.collection("trades").add({
      symbol: symbol,
      description: stockData.shortName,
      currentPrice: regularMarketPrice,
      createdAt: new Date(),
      todayChange: today_change,
      purchasePrice: regularMarketPrice,
      quantity: quantity,
      total_value: Math.round(quantity * regularMarketPrice * 100) / 100,
      total_gain_loss:
        total_value_today -
        Math.round(quantity * regularMarketPrice * 100) / 100,
      docId: docId,
      action: action,
    });
    setOpen(false);
    alert("Your trade was successful");
  };

  const handleSellStock = async () => {
    await db
      .collection("users")
      .doc(docId)
      .update({
        [`stocks.${symbol}.cur_value`]:
          currentUserInfo.stocks[symbol].cur_value -
          regularMarketPrice * quantity,
        [`stocks.${symbol}.quantity`]:
          currentUserInfo.stocks[symbol].quantity * 1 - quantity * 1,
        [`stocks.${symbol}.average_price`]:
          Math.round(
            ((currentUserInfo.stocks[symbol].cur_value -
              regularMarketPrice * quantity) /
              (currentUserInfo.stocks[symbol].quantity * 1 - quantity * 1)) *
              100
          ) / 100,
      });
    if (currentUserInfo.stocks[symbol].quantity <= quantity) {
      const deletedStock = { ...currentUserInfo.stocks };
      delete deletedStock[symbol];
      await db.collection("users").doc(docId).update({
        stocks: deletedStock,
      });
    }

    await db
      .collection("users")
      .doc(docId)
      .update({
        num_stocks: currentUserInfo.num_stocks * 1 - quantity * 1,
        long_stock:
          currentUserInfo.long_stock -
          currentUserInfo.stocks[symbol].average_price * quantity,
        cash: currentUserInfo.cash + regularMarketPrice * quantity - 19.95,
      });

    let sum = 0;
    for (const [key, value] of Object.entries(currentUserInfo.stocks)) {
      sum += value.cur_value;
    }
    await db
      .collection("users")
      .doc(docId)
      .update({
        buying_power:
          currentUserInfo.buying_power +
          regularMarketPrice * quantity -
          currentUserInfo.stocks[symbol].average_price * quantity,
        total_value: currentUserInfo.cash + sum,
      });
    let today_change =
      Math.round((data.iexRealtimePrice / stockData.regularMarketPrice) * 100) /
      100;
    let total_value_today =
      (Math.round(quantity * regularMarketPrice * 100) / 100) * today_change;
    await db.collection("trades").add({
      symbol: symbol,
      description: stockData.shortName,
      currentPrice: regularMarketPrice,
      createdAt: new Date(),
      todayChange: today_change,
      purchasePrice: regularMarketPrice,
      quantity: quantity,
      total_value: Math.round(quantity * regularMarketPrice * 100) / 100,
      total_gain_loss:
        total_value_today -
        Math.round(quantity * regularMarketPrice * 100) / 100,
      docId: docId,
      action: action,
    });
    setOpen(false);
    alert("Your trade was successful");
  };

  return (
    <div>
      <Topbar />
      <div className="outer-container">
        <div className="stock-overview">
          <CompanyCard companyName={symbol} width={1200} />
        </div>
        {/* stock info là 1 cụm 2 statistics */}
        <div className="stats-buy">
          <div className="stats">
            <h1>Key Statistics</h1>
            <div className="key-stats">
              <div className="stock-info">
                <div className="info">
                  <div>Open:</div>
                  <div>{stockData.regularMarketOpen}</div>
                </div>

                <div className="info">
                  <div>52 Week High:</div>
                  <div>{stockData.fiftyTwoWeekHigh}</div>
                </div>

                <div className="info">
                  <div>Market Cap:</div>
                  <div>{stockData.marketCap}</div>
                </div>
              </div>

              <div className="stock-info">
                <div className="info">
                  <div>Close:</div>
                  <div>{stockData.regularMarketPreviousClose}</div>
                </div>

                <div className="info">
                  <div>52 Week Low:</div>
                  <div>{stockData.fiftyTwoWeekLow}</div>
                </div>

                <div className="info">
                  <div>Volume:</div>
                  <div>{stockData.regularMarketVolume}</div>
                </div>
              </div>
            </div>
            <h1>Your account:</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
                height: "50%",
                alignItems: "flex-start",
              }}
            >
              <div className="account-val">
                <div className="account-name">ACCOUNT VALUE</div>
                <div className="account-number">
                  {currentUserInfo &&
                    Math.round(currentUserInfo.total_value * 100) / 100}
                </div>
              </div>
              <div className="account-val">
                <div className="account-name">BUYING POWER</div>
                <div className="account-number">
                  {currentUserInfo &&
                    Math.round(currentUserInfo.buying_power * 100) / 100}
                </div>
              </div>
              <div className="account-val">
                <div className="account-name">CASH</div>
                <div className="account-number">
                  {currentUserInfo &&
                    Math.round(currentUserInfo.cash * 100) / 100}
                </div>
              </div>
            </div>
          </div>

          <div className="buy">
            <h1>Actions</h1>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Action
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={action}
                onChange={handleChange}
                label="Action"
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                <MenuItem value={"buy"}>Buy</MenuItem>
                <MenuItem value={"sell"}>Sell</MenuItem>
              </Select>
            </FormControl>
            <div className="form-container">
              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Quantity
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={quantity}
                  onChange={handleChangeQuantity}
                  // startAdornment={
                  //   <InputAdornment position="start">$</InputAdornment>
                  // }
                  labelWidth={60}
                />
              </FormControl>

              <div className="max-quantity">
                <Button color="primary" size="large" onClick={handleShowMax}>
                  Show Max
                </Button>
              </div>
            </div>
            <div className="buy-btn-container">
              <div className="small-btn" onClick={handleClear}>
                CLEAR
              </div>
              <div className="small-btn-2" onClick={() => setOpen(true)}>
                PREVIEW ORDER
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={classes2.modal}
      >
        <div className={classes2.paper}>
          <h1>Preview Order</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div className="stock-preview">
              <div>
                <div>
                  Stock: {action == "buy" ? `Buy` : `Sell`} at Market Price
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
                  }}
                >
                  <strong>{symbol}</strong>
                </div>
              </div>

              <div>
                <div>Quantity</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
                  }}
                >
                  <strong style={{ fontSize: 16 }}>{quantity}</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="estimate-price">
            <div className="small-numbers">
              <div className="left">Estimated Price</div>
              <div className="left">${regularMarketPrice}</div>
            </div>
            <div className="small-numbers">
              <div className="left">Quantity</div>
              <div className="left">{quantity}</div>
            </div>
            <div className="small-numbers">
              <div className="left">Commission Price</div>
              <div className="left">$19.95</div>
            </div>
            <div className="small-numbers" style={{ borderBottom: 2 }}>
              <div className="left">Estimated Total</div>
              <div className="left">
                ${regularMarketPrice * quantity + 19.95}
              </div>
            </div>
          </div>
          <div className="confirm-btn">
            <Button
              className={classes.btn}
              size="large"
              onClick={() => setOpen(false)}
            >
              Clear Order
            </Button>
            <Button
              className={classes.btn}
              size="large"
              onClick={action == "buy" ? handleBuyStock : handleSellStock}
            >
              Submit Order
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TraderSymbol;
