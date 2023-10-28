import './sub-header.css';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { _getCategories } from '../../slices/category-slice';
import { message } from 'antd';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';
import { IAppStore } from '../../store';
import { ICategory } from '../../types/category-types';

export const SubHeader = () => {
  const { categories } = useSelector((state: IAppStore) => state.categoryReducer);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [messageApi, contextHolder] = message.useMessage();

  const fetchCategories = async () => {
    try {
      await dispatch(_getCategories()).unwrap();
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderCategories = (categories: ICategory[]) => {
    let transformedCategories = [];
    for (const category of categories) {
      transformedCategories.push(
        <li key={category.name}>
          {
            category.parentId ? <a href={category.slug}> {category.name} </a> :
              <span> {category.name} </span>
          }
          {category.subCategories.length > 0 ? (
            <ul>
              {renderCategories(category.subCategories)}
            </ul>
          ) : null}
        </li>
      )
    }
    return transformedCategories;
  }

  return (
    <div className='subHeader'>
      <ul>
        {categories && categories.length > 0 ? renderCategories(categories) : null}
      </ul>
    </div>
  )
}