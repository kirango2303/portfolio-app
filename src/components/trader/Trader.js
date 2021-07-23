import React, { useEffect, useState } from "react";
import Topbar from "../../elements/topbar/Topbar";
import { db } from "../../services/firebase";
import axios from "axios";
import "./Trader.css";
import { useHistory } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import { Button } from "@material-ui/core";

const URL = `https://cloud.iexapis.com/stable/stock/market/list/gainers?token=${process.env.REACT_APP_API_URL}`;
const Trader = () => {
  const [query, setQuery] = useState("");
  const [financeData, setFinanceData] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const history = useHistory();
  useEffect(() => {
    db.collection("finance").onSnapshot((snapShot) => {
      setFinanceData(snapShot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    const getTopGainers = async () => {
      const res = await axios.get(URL);
      console.log(res);
      setTopGainers(res.data);
    };
    getTopGainers();
  }, []);

  const handleCheckout = (data, id) => {
    history.push({
      pathname: `/trader/${data.symbol}`,
      state: { data: data, id: id },
    });
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 500,
      minHeight: "20%",
    },
    table2: {
      minWidth: 500,
      maxHeight: 300,
    },
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400,
      marginBottom: 20,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));
  const classes = useStyles();

  return (
    <div className="outer-container">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Topbar />
        <div
          className="container-stock"
          style={{ height: query ? "60%" : "15%" }}
        >
          <h1 style={{ marginTop: 20 }}>Search your stock</h1>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search a company"
              inputProps={{ "aria-label": "search google maps" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <IconButton className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          {query ? (
            <div className="search-container">
              <div className="search-content">
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table2}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Symbol</StyledTableCell>
                        <StyledTableCell align="left">
                          STOCK'S NAME
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {financeData &&
                      financeData.filter((data) =>
                        data.symbol.includes(query.trim().toUpperCase())
                      ).length ? (
                        financeData
                          .filter((data) =>
                            data.symbol.includes(query.trim().toUpperCase())
                          )
                          .map((data) => (
                            <StyledTableRow
                              key={data.symbol}
                              id="yahoo"
                              onClick={(e) => handleCheckout(data, e.target.id)}
                            >
                              <StyledTableCell component="th" scope="row">
                                {data.symbol}
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {data.shortName}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))
                      ) : (
                        <div>No stocks found according to your search</div>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          ) : null}
        </div>

        <div
          className="top-movers-container"
          style={{ height: query ? "30%" : "80%" }}
        >
          <h1 style={{ marginBottom: 20 }}>Top Movers Today</h1>
          <div className="top-movers">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Symbol</StyledTableCell>
                    <StyledTableCell align="right">PRICE($)</StyledTableCell>
                    <StyledTableCell align="right">MARKET CAP</StyledTableCell>
                    <StyledTableCell align="right">STATUS</StyledTableCell>
                    <StyledTableCell align="right">CHECKOUT</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topGainers.slice(0, 5).map((data) => (
                    <StyledTableRow key={data.symbol}>
                      <StyledTableCell component="th" scope="row">
                        {data.symbol}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {data.close || data.iexClose}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {data.marketCap}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        +${data.change}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button
                          id="iex"
                          onClick={(e) => handleCheckout(data, e.target.id)}
                          variant="contained"
                          color="secondary"
                          size="small"
                        >
                          Checkout
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trader;
