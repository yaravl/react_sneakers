import { Card } from "../components";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const ordersResp = await axios.get(
          "https://62a63067430ba53411d2342d.mockapi.io/orders"
        );

        setOrders(ordersResp.data);
        setIsLoading(false);
      } catch (e) {
        alert("Ошибка при запросе заказов");
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">{isLoading ? "Загрузка..." : "Мои заказы"}</h1>
      </div>

      <div className="d-flex flex-wrap">
        {orders &&
          orders.map(({ idOrder, items }, index) => (
            <React.Fragment key={index}>
              <h2 className="flex">Заказ №{idOrder}</h2>
              <div className="d-flex" style={{ width: "100%" }}>
                {items.map((card, i) => (
                  <Card key={i} loading={isLoading} hideBtn {...card} />
                ))}
              </div>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default Orders;
