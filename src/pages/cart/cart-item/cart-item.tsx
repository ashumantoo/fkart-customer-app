import './cart-item.css'
import React, { FC } from 'react';
import { ICartItem } from '../../../types/cart-types'

interface ICartItemProps {
  cartItem: ICartItem;
  onQuantityIncrease: (_id: string) => void;
  onQuantityDecrease: (_id: string) => void;
}

export const CartItem: FC<ICartItemProps> = ({ cartItem, onQuantityIncrease, onQuantityDecrease }) => {
  return (
    <div className='cartItemContainer'>
      <div className='flexRow'>
        <div className='cartProImgContainer'>
          <img src={cartItem.image} alt="" />
        </div>
        <div className='cartItemDetails'>
          <div>
            <p>{cartItem.name}</p>
            <p>Rs. {cartItem.sellingPrice}</p>
          </div>
          <div>
            Delivery in 3 - 5 days
          </div>
        </div>
      </div>
      <div style={{
        display: "flex",
        margin: '5px 0'
      }}>
        <div className='quantityControl'>
          <button onClick={() => {
            if (cartItem.quantity <= 1) return;
            onQuantityDecrease(cartItem._id)
          }}>
            -
          </button>
          <input value={cartItem.quantity} readOnly />
          <button onClick={() => onQuantityIncrease(cartItem._id)}>+</button>
        </div>
        <button className='cartActionBtn'>Save for later</button>
        <button className='cartActionBtn'>Remove</button>
      </div>
    </div>
  )
}