import React, { FC } from 'react';
import { Layout } from '../../components/layout/layout';
import { ProductStore } from './product-store/product-store';
import { useLocation, useParams } from 'react-router-dom';
import { getQueryParams } from '../../utils/helper';
import { ProductPage } from './product-page/product-page';
import { ProductList } from './product-list/product-list';

export enum CATEGORY_TYPE {
  PAGE = 'PAGE',
  STORE = 'STORE',
  PRODUCT = 'PRODUCT'
}

const Products: FC = () => {
  const params = useParams();
  const location = useLocation();

  const renderProducts = () => {
    const formattedQueryParams = getQueryParams(location.search);
    let content = null;
    if (formattedQueryParams) {
      switch (formattedQueryParams.type) {
        case CATEGORY_TYPE.STORE.toLowerCase():
          content = <ProductStore />
          break;
        case CATEGORY_TYPE.PAGE.toLowerCase():
          content = <ProductPage />
          break;
        default:
          content = <ProductList />
      }
    }
    return content;
  }
  return (
    <Layout>
      {renderProducts()}
    </Layout>
  )
}

export default Products;