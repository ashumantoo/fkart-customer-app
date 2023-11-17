import React, { FC } from 'react'
import { Card } from '../UI'

interface IPriceDetailsProps {
  totalItems: number;
  totalPrice: number;
}

export const PriceDetails: FC<IPriceDetailsProps> = ({ totalItems, totalPrice }) => {
  return (
    <Card headerleft={'Price Details'} styles={{ maxWidth: "380px" }}>
      <div style={{
        padding: 20,
        boxSizing: 'border-box'
      }}>
        <div className='flexRow sb' style={{ margin: '10px 0', justifyContent: "space-between" }}>
          <div> Price ({totalItems}) items </div>
          <div> {totalPrice} </div>
        </div>

        <div className='flexRow sb' style={{ margin: '10px 0', justifyContent: "space-between" }}>
          <div> Delivery Charges </div>
          <div> Free </div>
        </div>
        <hr />
        <div className='flexRow sb' style={{ margin: '10px 0', justifyContent: "space-between" }}>
          <div> Total Amount </div>
          <div> {totalPrice} </div>
        </div>
      </div>
    </Card>
  )
}