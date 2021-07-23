import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Topbar from "../../elements/topbar/Topbar";
import { db } from "../../services/firebase";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./History.css";

const History = () => {
  const { currentUser } = useAuth();
  const [invalidate, setInvalidate] = useState(true);
  const [docId, setDocId] = useState(""); //docId of user
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [tradeData, setTradeData] = useState([]);
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
    const getRealTimeHistory = async () => {
      await db
        .collection("trades")
        .where("docId", "==", docId)
        .orderBy("createdAt", "asc")
        .onSnapshot((snapShot) => {
          setTradeData(snapShot.docs.map((doc) => doc.data()));
        });
    };
    getRealTimeHistory();
  }, [docId]);

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

  const useStyles = makeStyles({
    table: {
      minWidth: 200,
      minHeight: "20%",
    },
  });
  const classes = useStyles();
  return (
    <div>
      <Topbar />
      <div className="trade-history">
        <h1 style={{ marginTop: 20 }}>Trade History</h1>
        <div className="trade-container">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Symbol</StyledTableCell>
                  <StyledTableCell align="right">Description</StyledTableCell>
                  <StyledTableCell align="right">Current Price</StyledTableCell>
                  <StyledTableCell align="right">
                    Purchase Price
                  </StyledTableCell>
                  <StyledTableCell align="right">Quantity</StyledTableCell>
                  <StyledTableCell align="right">Total Value</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tradeData &&
                  tradeData.map((data) => (
                    <StyledTableRow key={data.symbol}>
                      <StyledTableCell component="th" scope="row">
                        {data.symbol}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {data.description}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {data.currentPrice}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {data.purchasePrice}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {data.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {data.total_value}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {data.action}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default History;
