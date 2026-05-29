
import React, { useEffect, useState } from "react";

import { getMyOrders } from "../services/orderService";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("auth_user") || "{}"
  );

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const res = await getMyOrders(user.id);

      if (res.status) {

        setOrders(res.orders);

      }

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="container mt-4">

      <h2 className="mb-4">
        My Orders
      </h2>

      {orders.length === 0 && (

        <p>No Orders Found</p>

      )}

      {orders.map((order) => (

        <div
          key={order.id}
          className="card p-3 mb-4 shadow-sm"
        >

          <div className="d-flex justify-content-between">

            <h5>
              {order.invoice_no}
            </h5>

            <span className="badge bg-success">
              {order.payment_status}
            </span>

          </div>

          <p className="mb-1">
            Total : ₹{order.total_amount}
          </p>

          <p className="mb-1">
            Paid : ₹{order.paid_amount}
          </p>

          <p className="mb-1">
            Balance : ₹{order.balance_amount}
          </p>

          <p className="mb-2">
            Payment : {order.payment_method}
          </p>

          <hr />

          <h6>Products</h6>

          {order.products?.map(
            (item, index) => (

              <div
                key={index}
                className="border rounded p-2 mb-2"
              >

                <p className="mb-1">
                  Product :
                  {item.product_name}
                </p>

                <p className="mb-1">
                  Qty :
                  {item.qty}
                </p>

                <p className="mb-0">
                  Price :
                  ₹{item.price}
                </p>

              </div>
            )
          )}

          <small className="text-muted">
            Ordered On :
            {order.created_at}
          </small>

        </div>
      ))}
    </div>
  );
};

export default Orders;