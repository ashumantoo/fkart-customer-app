import './cart.css';
import { Layout } from '../../components/layout/layout'
import { Card } from '../../components/UI'
import { useDispatch, useSelector } from 'react-redux';
import { IAppStore } from '../../store';
import { CartItem } from './cart-item/cart-item';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { _getCartItems, decreaseCartItemQty, increaseCartItemQty } from '../../slices/cart-slice';
import { useEffect } from 'react';
import { message } from 'antd';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';

export const Cart = () => {
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
            >
              {cartItems.length > 0 && cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  cartItem={item}
                  onQuantityIncrease={handleQuantityIncrease}
                  onQuantityDecrease={handleQuantityDecrease}
                />
              ))}

            </Card>
            <Card
              headerleft={'Price'}
              styles={{ width: '500px' }}
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