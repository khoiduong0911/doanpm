import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Revenue.css'; 

const Revenue = () => {
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/revenue/total');
        setRevenueData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  const renderLoading = () => <p>Loading...</p>;

  const renderError = () => <p className="error-message">Error: {error}</p>;

  const renderRevenueData = () => (
    <div className="revenue-container">
      <h2 className="header">Quản lí Doanh thu</h2>
      <table className="revenue-table">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Giá tiền sản phẩm</th>
            <th>Ngày Đặt</th>
          </tr>
        </thead>
        <tbody>
          {revenueData.orders && revenueData.orders.length > 0 ? (
            revenueData.orders.map((order) => (
              <tr key={order.orderID}>
                <td>{order.orderID}</td>
                <td>{order.totalAmount}đ</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Revenue Data Available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="summary">
        <p><strong>Tổng sản phẩm:</strong> {revenueData?.totalRecords || 0} </p>
        <p><strong>Tổng tiền sản phẩm:</strong> {revenueData?.totalRevenue || 0}đ</p>
      </div>
    </div>
  );

  return (
    <>
      {loading ? renderLoading() : error ? renderError() : renderRevenueData()}
    </>
  );
};

export default Revenue;
