import './product-list.css'
import React, { FC, useEffect, useState } from 'react'
import { Layout } from '../../../components/layout/layout'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IAppStore } from '../../../store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { message } from 'antd';
import { _getProductsBySlug } from '../../../slices/product-slice';
import { formatAxiosError } from '../../../utils/helper';
import { AxiosError } from 'axios';
import { Card } from '../../../components/UI';
import { Link } from 'react-router-dom';
import { BiRupee } from 'react-icons/bi';

export const ProductList: FC = () => {
  const params = useParams();
  const navigage = useNavigate();
  const { products } = useSelector((state: IAppStore) => state.productsReducer);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [messageApi, contextHolder] = message.useMessage();

  const fetchProductList = async (slug: string) => {
    try {
      await dispatch(_getProductsBySlug(slug)).unwrap();
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }

  useEffect(() => {
    if (params && params.slug) {
      fetchProductList(params.slug);
    }
  }, [params]);

  return (
    <div className='p-4' style={{backgroundColor:'#f1f3f6'}}>
      <Card
        styles={{
          boxSizing: 'border-box',
          padding: '10px',
          display: 'flex'
        }}
      >
        {products && products.map((product, index) => (
          <div
            className='caContainer'
            key={index}
          >
            <Link
              className='caImgContainer'
              to={`/${product.slug}/${product._id}/p`}
            >
              <img
                src={product.productImages.length > 0 ? `${product.productImages[0]}` : ""}
              />
            </Link>
            <div>
              <div className='caProductName'>
                {product.name}
              </div>
              <div className='caProductPrice'>
                <BiRupee />
                {product.sellingPrice}
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}