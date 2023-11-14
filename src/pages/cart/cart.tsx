import './cart.css';
import { Layout } from '../../components/layout/layout'
import { Card, MaterialButton } from '../../components/UI'
import { useDispatch, useSelector } from 'react-redux';
import { IAppStore } from '../../store';
import { CartItem } from './cart-item/cart-item';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { _getCartItems, decreaseCartItemQty, increaseCartItemQty } from '../../slices/cart-slice';
import { useEffect } from 'react';
import { message } from 'antd';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [messageApi, contextHolder] = message.useMessage();
  const { cartItems } = useSelector((state: IAppStore) => state.cartReducer);
  const { authenticated } = useSelector((state: IAppStore) => state.authReducer);

  const handleQuantityIncrease = (_id: string) => {
    dispatch(increaseCartItemQty(_id));
  }

  const handleQuantityDecrease = (_id: string) => {
    dispatch(decreaseCartItemQty(_id));
  }

  const fetchCartItems = async () => {
    try {
      await dispatch(_getCartItems()).unwrap();
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetchCartItems();
    }
  }, [authenticated]);

  return (
    <Layout>
      <div className='cartContainer' style={{ alignItems: "flex-start" }}>
        {cartItems && cartItems.length > 0 ? (
          <>
            <Card
              headerleft={"My Cart"}
              headerright={<div>Delivery To</div>}
              styles={{ width: 'calc(100%-400)', overflow: "hidden" }}
            >
              {cartItems.length > 0 && cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  cartItem={item}
                  onQuantityIncrease={handleQuantityIncrease}
                  onQuantityDecrease={handleQuantityDecrease}
                />
              ))}
              <div style={{
                width: '100%',
                display: 'flex',
                backgroundColor: "#fff",
                justifyContent: "flex-end",
                boxShadow: `0 0 10px 10px #eee`,
                padding: '10px 0',
                boxSizing: 'border-box'
              }}>
                <div style={{ width: '250px' }}>
                  <MaterialButton
                    title='PLACE ORDER'
                    onClick={() => navigate('/checkout')}
                    bgColor='#fb641b'
                    textColor='white'
                  />
                </div>
              </div>
            </Card>
            <Card
              headerleft={'Price'}
              styles={{ width: '380px' }}
            >

            </Card>
          </>
        ) : (
          <div>
            Your cart is empty!
          </div>
        )}
      </div>
    </Layout>
  )
}