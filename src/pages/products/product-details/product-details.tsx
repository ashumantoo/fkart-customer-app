import './product-details.css';

import { useParams } from 'react-router-dom';
import { Layout } from '../../../components/layout/layout';
import React, { FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IAppStore } from '../../../store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { message } from 'antd';
import { _getProductById } from '../../../slices/product-slice';
import { formatAxiosError } from '../../../utils/helper';
import { AxiosError } from 'axios';

export const ProductDetails: FC = () => {
  const params = useParams();
  const { product } = useSelector((state: IAppStore) => state.productsReducer);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [messageApi, contextHolder] = message.useMessage();

  const fetchProductById = useCallback(async (productId: string) => {
    try {
      await dispatch(_getProductById(productId)).unwrap();
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }, []);

  useEffect(() => {
    if (params && params.productId) {
      fetchProductById(params.productId);
    }
  }, [params]);
  return (
    <Layout>
      <div>
        <h1>
          {product.name}
        </h1>
      </div>
      <div>
        <p>{product.description}</p>
      </div>
    </Layout>
  )
}