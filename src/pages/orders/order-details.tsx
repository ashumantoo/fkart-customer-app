import './order-details.css';
import React, { FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IAppStore } from '../../store';
import { message } from 'antd';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import { _getOrder } from '../../slices/user-slice';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';
import { Layout } from '../../components/layout/layout';
import { Card } from '../../components/UI';

export const OrderDetails: FC = () => {
  const params = useParams();
  const { order } = useSelector((state: IAppStore) => state.userReducer);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const formatDate = (date: any) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  const formatDate2 = (date: any) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (date) {
      const d = new Date(date);
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  };

  const fetchOrder = useCallback(async (orderId: string) => {
    try {
      await dispatch(_getOrder(orderId)).unwrap();
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (params && params.orderId) {
      fetchOrder(params.orderId);
    }
  }, [fetchOrder, params]);

  if (!(order && order.address)) {
    return null;
  }

  return (
    <Layout>
      <div
        style={{
          width: "1160px",
          margin: "10px auto",
        }}
      >
        <Card
          styles={{
            margin: "10px 0",
          }}
        >
          <div className="delAdrContainer">
            <div className="delAdrDetails">
              <div className="delTitle">Delivery Address</div>
              <div className="delName">{order.address.name}</div>
              <div className="delAddress">{order.address.buildingAndStreet}</div>
              <div className="delPhoneNumber">
                Phone number {order.address.mobileNumber}
              </div>
            </div>
            <div className="delMoreActionContainer">
              <div className="delTitle">More Actions</div>
              <div className="delName">Download Invoice</div>
            </div>
          </div>
        </Card>

        {order.items.map((item, index) => (
          <Card
            styles={{ display: "flex", padding: "20px 0", margin: "10px 0" }}
          >
            <div className="flexRow">
              <div className="delItemImgContainer">
                <img src={item.product.productImages[0]} alt="" />
              </div>
              <div style={{ width: "250px" }}>
                <div className="delItemName">{item.product.name}</div>
                {/* <Price value={item.payablePrice} /> */}
                {item.payableAmount}
              </div>
            </div>
            <div style={{ padding: "25px 50px" }}>
              <div className="orderTrack">
                {order.orderStatus.map((status) => (
                  <div
                    className={`orderStatus ${status.isCompleted ? "active" : ""
                      }`}
                  >
                    <div
                      className={`point ${status.isCompleted ? "active" : ""}`}
                    ></div>
                    <div className="orderInfo">
                      <div className="status">{status.status}</div>
                      <div className="date">{formatDate(status.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ fontWeight: "500", fontSize: 14 }}>
              {order.orderStatus[3].isCompleted &&
                `Delivered on ${formatDate2(order.orderStatus[3].date)}`}
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  )
}