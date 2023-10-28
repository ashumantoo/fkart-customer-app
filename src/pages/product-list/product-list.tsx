import './product-list.css';
import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layout/layout'
import { message } from 'antd';
import { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { _getCategories } from '../../slices/category-slice';
import { IAppStore } from '../../store';
import { formatAxiosError } from '../../utils/helper';
import { _getProductsBySlug } from '../../slices/product-list-slice';
import { useParams } from 'react-router';
import { IProduce } from 'immer/dist/internal';
import { IProduct } from '../../types/product-types';

export const ProductList = () => {
  const params = useParams();
  const { products, productsByPrice } = useSelector((state: IAppStore) => state.productsReducer);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [messageApi, contextHolder] = message.useMessage();
  const [priceRanges, setPriceRanges] = useState<any>({
    "under5k": 5000,
    "under10k": 10000,
    "under15k": 15000,
    "under20k": 20000,
    "under30k": 30000
  })

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
    <Layout>
      {
        productsByPrice && Object.keys(productsByPrice).map((key, index) => {
          return (
            <div className='card'>
              <div className='card_header'>
                <h3> {params.slug} mobiles under ₹{priceRanges[key].toLocaleString()}</h3>
                <button>View All</button>
              </div>
              <div className='card_container'>
                {productsByPrice[key].map((product: IProduct, index: number) => {
                  return (
                    <div className='product_container'>
                      <div className='product_img_container'>
                        <img src={product.productImages && product.productImages.length > 0 ? product.productImages[0] : ""} />
                      </div>
                      <div className='product_info'>
                        <div style={{ margin: "5px 0" }}>{product.name}</div>
                        <div>
                          <span>4.3</span>  &nbsp;
                          <span>45,999</span>
                        </div>
                        <div className='product_price'>₹{product.sellingPrice.toLocaleString()}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })
      }
    </Layout>
  )
}