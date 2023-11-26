import './cart-item.css'
import React, { FC, useCallback } from 'react';
import { ICartItem } from '../../../types/cart-types'
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { message } from 'antd';
import { _removeCartItem } from '../../../slices/cart-slice';
import { formatAxiosError } from '../../../utils/helper';
import { AxiosError } from 'axios';

interface ICartItemProps {
  cartItem: ICartItem;
  onQuantityIncrease: (_id: string) => void;
  onQuantityDecrease: (_id: string) => void;
}

export const CartItem: FC<ICartItemProps> = ({ cartItem, onQuantityIncrease, onQuantityDecrease }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [messageApi, contextHolder] = message.useMessage();

  const removeCartItem = useCallback(async (productId: string) => {
    try {
      const response = await dispatch(_removeCartItem(productId)).unwrap();
      if (response) {
        messageApi.open({
          type: 'success',
          content: "Item removed successfully",
        });
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }, [dispatch]);

  return (
    <div className='cartItemContainer'>
      {contextHolder}
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
        <button className='cartActionBtn' onClick={() => removeCartItem(cartItem._id)}>Remove</button>
      </div>
    </div>
  )
}