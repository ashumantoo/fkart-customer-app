import React, { FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IAppStore } from '../../../store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, message } from 'antd';
import { _getCategoryPage } from '../../../slices/product-slice';
import { formatAxiosError, getQueryParams } from '../../../utils/helper';
import { AxiosError } from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { IPageContent } from '../../../types/product-types';

export const ProductPage: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const { categoryPage } = useSelector((state: IAppStore) => state.productsReducer);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchCategoryPage = useCallback(async (category: string, type: string) => {
    try {
      await dispatch(_getCategoryPage({ category, type })).unwrap();
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }, []);

  useEffect(() => {
    if (location && location.search) {
      const formatedParams = getQueryParams(location.search);
      fetchCategoryPage(formatedParams.cid, formatedParams.type);
    }
  }, [fetchCategoryPage, location]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  };

  return (
    <div className='p-2'>
      <h2 className='text-lg font-medium py-4'> {categoryPage.title} </h2>
      <Carousel
        responsive={responsive}
        ssr={true}
      >
        {categoryPage.banners.map((banner: IPageContent, index: number) => {
          return (
            <a
              key={index}
              className='block'
              href={banner.navigateTo}
            >
              <img
                src={banner.imgUrl}
                style={{ width: "100%", height: "100%" }}
              />
            </a>
          )
        })}
      </Carousel>
      <h3 className='text-lg font-medium py-4 mt-4'>Popular products</h3>
      <div className='flex mb-8'>
        {categoryPage.products && categoryPage.products.length > 0 && categoryPage.products.map((product, index) => {
          return (
            <Card
              hoverable={true}
              style={{ width: 200 }}
              className='m-2'
              key={index}
            >
              <a href={product.navigateTo}>
                <img src={product.imgUrl} style={{ height: "100%", width: 140 }} />
              </a>
            </Card>
          )
        })}
      </div>
    </div>
  )
}