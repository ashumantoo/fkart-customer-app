import './cart.css';
import React from 'react';
import { Layout } from '../../components/layout/layout'
import { Card } from '../../components/UI'
import { useSelector } from 'react-redux';
import { IAppStore } from '../../store';
import { CartItem } from './cart-item/cart-item';

export const Cart = () => {
  const { cartItems } = useSelector((state: IAppStore) => state.cartReducer);
  return (
    <Layout>
      <div className='cartContainer'>
        <Card
          headerLeft={"My Cart"}
          headerRight={<div>Delivery To</div>}
        >
          {cartItems && Object.keys(cartItems).map((key, index) => (
            // <div className='flexRow' key={index}>
            //   <div className='cartProductContainer'>
            //     <img src="" alt="" />
            //   </div>
            //   <div className='cartItemDetails'>
            //     <div>
            //       {cartItems[key].name}
            //     </div>
            //     <div>Delivery in 3-5days</div>
            //   </div>
            // </div>
            <CartItem
              key={index}
              cartItem={cartItems[key]}
            />
          ))}

        </Card>
        <Card
          styles={{ width: '500px' }}
        >
          Price
        </Card>
      </div>
    </Layout>
  )
}