import './cart.css';
import { Layout } from '../../components/layout/layout'
import { Card } from '../../components/UI'
import { useDispatch, useSelector } from 'react-redux';
import { IAppStore } from '../../store';
import { CartItem } from './cart-item/cart-item';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { decreaseCartItemQty, increaseCartItemQty } from '../../slices/cart-slice';

export const Cart = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { cartItems } = useSelector((state: IAppStore) => state.cartReducer);

  const handleQuantityIncrease = (_id: string) => {
    dispatch(increaseCartItemQty(_id));
  }

  const handleQuantityDecrease = (_id: string) => {
    dispatch(decreaseCartItemQty(_id));
  }

  return (
    <Layout>
      <div className='cartContainer' style={{ alignItems: "flex-start" }}>
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
      </div>
    </Layout>
  )
}