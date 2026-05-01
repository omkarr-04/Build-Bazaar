"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order: any, index: number) => (
            <li key={index} className="bg-gray-100 p-4 rounded mb-2">
              <p>Order #{order._id} - Total: ₹{order.total}</p>
              <ul>
                {order.items.map((item: any) => (
                  <li key={item.id}>
                    {item.name} (x{item.quantity})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
