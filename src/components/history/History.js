import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Topbar from "../../elements/topbar/Topbar";
import { db } from "../../services/firebase";
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
  console.log(tradeData);
  return (
    <div>
      <Topbar />
      <div className="trade-history">
        <div className="trade-container">
          <div
            style={{
              width: "10%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            Symbol
          </div>
          <div
            style={{
              width: "25%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            Description
          </div>
          <div
            style={{
              width: "10%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            Current Price
          </div>
          <div
            style={{
              width: "10%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            Today's Change
          </div>
          <div
            style={{
              width: "10%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            Purchase Price
          </div>
          <div
            style={{
              width: "10%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            Quantity
          </div>
          <div
            style={{
              width: "15%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            Total Value
          </div>
          <div
            style={{
              width: "10%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            Total Gain/Loss
          </div>
        </div>
        {tradeData &&
          tradeData.map((data) => {
            return (
              <div className="trade-container">
                <div
                  style={{
                    width: "10%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {data.symbol}
                </div>
                <div
                  style={{
                    width: "25%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {data.description}
                </div>
                <div
                  style={{
                    width: "10%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {data.currentPrice}
                </div>
                <div
                  style={{
                    width: "10%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {data.todayChange}
                </div>
                <div
                  style={{
                    width: "10%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {data.purchasePrice}
                </div>
                <div
                  style={{
                    width: "10%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {data.quantity}
                </div>
                <div
                  style={{
                    width: "15%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {data.total_value}
                </div>
                <div
                  style={{
                    width: "10%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {data.total_gain_loss}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default History;
