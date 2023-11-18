import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../components/layout/layout';
import './orders.css';
import React, { FC, useCallback, useEffect } from 'react';
import { IAppStore } from '../../store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Card, message } from 'antd';
import { _getOrders } from '../../slices/user-slice';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';

export const Orders: FC = () => {
  const { orders } = useSelector((state: IAppStore) => state.userReducer);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const fetchOrders = useCallback(async () => {
    try {
      await dispatch(_getOrders()).unwrap();
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }, [dispatch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders])

  return (
    <Layout>
      {orders && orders.length > 0 ? (
        orders.map((order, index) => {
          return order.items.map((item, index) => (
            <Card style={{ maxWidth: '1200px', margin: '5px auto' }}>
              <div className='orderItemContainer'>
                <div style={{
                  width: 80,
                  height: 80,
                  overflow: 'hidden',
                  textAlign: 'center'
                }}>
                  <img
                    src={item.product.productImages && item.product.productImages.length > 0 ? item.product.productImages[0] : ""}
                    alt=''
                    style={{
                      maxWidth: 80,
                      maxHeight: 80
                    }}
                  />
                </div>
                <div style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between"
                }}>
                  <div
                    style={{
                      width: 300
                    }}
                  >
                    {item.product.name}
                  </div>
                  <div>{item.payableAmount}</div>
                  <div>{order.paymentStatus}</div>
                </div>
              </div>
            </Card>
          ))
        })
      ) : (
        <div>
          No order found
        </div>
      )}

    </Layout>
  )
}