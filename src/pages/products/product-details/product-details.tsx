import './product-details.css';

import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../../../components/layout/layout';
import React, { FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IAppStore } from '../../../store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { message } from 'antd';
import { _getProductById } from '../../../slices/product-slice';
import { formatAxiosError } from '../../../utils/helper';
import { AxiosError } from 'axios';
import { IoIosArrowForward, IoIosStar, IoMdCart } from 'react-icons/io';
import { BiRupee } from 'react-icons/bi';
import { AiFillThunderbolt } from 'react-icons/ai';
import { MaterialButton } from '../../../components/UI';
import { _addToCart, addToCart } from '../../../slices/cart-slice';
import { ICartItem } from '../../../types/cart-types';

export const ProductDetails: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { product } = useSelector((state: IAppStore) => state.productsReducer);
  const { authenticated } = useSelector((state: IAppStore) => state.authReducer);
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

  const saveCartItems = async (data: ICartItem) => {
    try {
      await dispatch(_addToCart([data])).unwrap();
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }

  const _addToCartHandler = async () => {
    const payload = {
      _id: product._id,
      name: product.name,
      image: product.productImages[0],
      sellingPrice: typeof product.sellingPrice === 'string' ? parseInt(product.sellingPrice) : product.sellingPrice,
      maxRetailPrice: typeof product.maxRetailPrice === 'string' ? parseInt(product.maxRetailPrice) : product.maxRetailPrice,
      quantity: 1
    }
    if (authenticated) {
      saveCartItems(payload);
    } else {
      dispatch(addToCart(payload));
    }
    navigate('/cart');
  };

  useEffect(() => {
    if (params && params.productId) {
      fetchProductById(params.productId);
    }
  }, [params]);

  if (Object.keys(product).length === 0) {
    return null;
  }

  return (
    <Layout>
      <div className='productDescriptionContainer'>
        <div className="flexRow">
          <div className="verticalImageStack">
            {
              product.productImages.map((imgUrl, index) =>
                <div className="thumbnail" key={index}>
                  <img src={imgUrl} alt={imgUrl} />
                </div>
              )
            }
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img src={product.productImages[0]} alt={`${product.productImages[0]}`} />
            </div>

            {/* action buttons */}
            <div className="flexRow">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: '5px'
                }}
                onClick={() => _addToCartHandler()}
              // icon={<IoMdCart />}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: '5px'
                }}
              // icon={<AiFillThunderbolt />}
              />
            </div>
          </div>
        </div>
        <div>

          {/* home > category > subCategory > productName */}
          <div className="breed">
            <ul>
              <li><a href="#">Home</a><IoIosArrowForward /></li>
              <li><a href="#">Mobiles</a><IoIosArrowForward /></li>
              <li><a href="#">Samsung</a><IoIosArrowForward /></li>
              <li><a href="#">{product.name}</a></li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
            <p className="productTitle">{product.name}</p>
            <div>
              <span className="ratingCount">4.3 <IoIosStar /></span>
              <span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews</span>
            </div>
            <div className="extraOffer">Extra <BiRupee />4500 off </div>
            <div className="flexRow priceContainer">
              <span className="price"><BiRupee />{product.sellingPrice}</span>
              <span className="discount" style={{ margin: '0 10px' }}>22% off</span>
              {/* <span>i</span> */}
            </div>
            <div>
              <p style={{
                color: '#212121',
                fontSize: '14px',
                fontWeight: '600'
              }}>Available Offers</p>
              <p style={{ display: 'flex' }}>
                <span style={{
                  width: '100px',
                  fontSize: '12px',
                  color: '#878787',
                  fontWeight: '600',
                  marginRight: '20px'
                }}>Description</span>
                <span style={{
                  fontSize: '12px',
                  color: '#212121',
                }}>{product.description}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}