import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const {url,token} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
    }

    // Function to update order status to delivered
    const updateOrderStatus = async (orderId) => {
        try {
            await axios.post(url+"/api/order/status", {
                orderId,
                status: "Delivered"
            }, {headers:{token}});
            // Refresh orders after status update
            fetchOrders();
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    }

    useEffect(()=>{
        if (token) {
            fetchOrders();
        }
    },[token])

    // Effect to automatically mark orders as delivered after 20 seconds
    useEffect(() => {
        if (data.length > 0) {
            const timers = data.map(order => {
                // Only set timer for orders that aren't already delivered
                if (order.status !== "Delivered") {
                    return setTimeout(() => {
                        updateOrderStatus(order._id);
                    }, 30000); // 30 seconds
                }
                return null;
            });

            // Cleanup timers on component unmount or when data changes
            return () => {
                timers.forEach(timer => {
                    if (timer) clearTimeout(timer);
                });
            };
        }
    }, [data]);

  return (
    <div className='my-orders'>
        <h2 className='myordersp'>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return (
                    <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if (index === order.items.length-1) {
                                return item.name+" x "+item.quantity
                            }
                            else{
                                return item.name+" x "+item.quantity+","
                            }
                        })}</p>
                        <p>₹{order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrders