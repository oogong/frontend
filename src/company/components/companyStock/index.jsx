import React, { useEffect, useState } from "react";
import "./../styles/companyStock.css";
import { connectSocket, joinRoom } from "../../service/stockPrice";
import {
  disconnectSocket,
  requestCurrentPrice,
} from "../../service/stockPrice";

export default function CompanyStock(props) {
  const [stockCompare, setStockCompare] = useState(0);
  const [compare, setCompare] = useState(0);
  const [stockPrice, setStockPrice] = useState(props.price);
  const [color, setColor] = useState("red");

  const handlePrice = (loadedPrice) => {
    setStockPrice(loadedPrice);
  };

  const handleCompare = (loadedCompare) => {
    setStockCompare(loadedCompare);
  };

  useEffect(() => {
    console.log("code: ", props.code);
    connectSocket();

    joinRoom(props.code, handlePrice, handleCompare)
      .then((price) => {
        console.log("Price loaded:", price);
      })
      .catch((error) => {
        console.error("Error joining price room:", error);
      });

    requestCurrentPrice(props.code, handlePrice, handleCompare);

    return () => {
      disconnectSocket();
    };
  }, [props.code]);
  return (
    <div className="company-stock">
      <p className="name">{props.name}</p>
      <p className="code">{props.code}</p>
      <p className="price" style={{ color: color }}>
        {stockPrice}
      </p>
      <div className="up-and-down">
        <img
          src={color === "#FF0000" ? "up-icon.svg" : "down-icon.svg"}
          alt="up-and-down"
          style={{ width: "15px", height: "15px" }}
        />
        <p className="compare" style={{ color: color }}>
          {compare}
        </p>
      </div>
    </div>
  );
}
