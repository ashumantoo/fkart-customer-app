import './cart.css';
import React from 'react';
import { Layout } from '../../components/layout/layout'
import { Card } from '../../components/UI'

export const Cart = () => {
  return (
    <Layout>
      <div className='cartContainer'>
        <Card
          headerLeft={"My Cart"}
          headerRight={<div>Delivery To</div>}
        >
          <div className='flexRow'>

          </div>
        </Card>
        <Card
          styles={{ width: '500px' }}
        >
          Price
        </Card>
      </div>
    </Layout>
  )
}