import './cart-item.css'
import React, { FC } from 'react';
import { IItem } from '../../../types/cart-types'

interface ICartItemProps {
  cartItem: IItem;
}

export const CartItem: FC<ICartItemProps> = ({ cartItem }) => {
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
          <button>-</button>
          <input value={cartItem.quantity} readOnly />
          <button>+</button>
        </div>
        <button className='cartActionBtn'>Save for later</button>
        <button className='cartActionBtn'>Remove</button>
      </div>
    </div>
  )
}