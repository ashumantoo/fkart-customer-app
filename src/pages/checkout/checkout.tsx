import './checkout.css';
import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { Layout } from '../../components/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { IAppStore } from '../../store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { _getUserAddresses, initialUserState } from '../../slices/user-slice';
import { Divider, message } from 'antd';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';
import { Anchor, Card, MaterialButton, MaterialInput } from '../../components/UI';
import AddressForm from './address-form';
import { IFormattedAddress, IUserAddress } from '../../types/user-types';
import { PriceDetails } from '../../components/price-details/price-details';
import { _getCartItems } from '../../slices/cart-slice';
import { Cart } from '../cart/cart';

interface ICheckoutStepProps {
  active: boolean;
  stepNumber: string;
  stepTitle: string;
  body?: ReactNode;
  onClick?: () => void;
}

const CheckoutSteps: FC<ICheckoutStepProps> = ({ active, stepNumber, stepTitle, body, onClick }) => {
  return (
    <div onClick={onClick} className='checkoutStep'>
      <div className={`checkoutHeader ${active && 'active'}`}>
        <div>
          <span className='stepNumber'> {stepNumber} </span>
          <span className='stepTitle'> {stepTitle} </span>
        </div>
      </div>
      {body && body}
    </div>
  )
}

interface IAddressStepBodyProps {
  address: IFormattedAddress;
  handleAddressSelection: (address: IFormattedAddress) => void;
  enableAddressEditForm: (address: IFormattedAddress) => void;
  onAddressSubmit: (address: IFormattedAddress) => void;
  confirmDeliveryAddress: (address: IFormattedAddress) => void;
}

const AddressStepBody: FC<IAddressStepBodyProps> = ({
  address,
  handleAddressSelection,
  enableAddressEditForm,
  onAddressSubmit,
  confirmDeliveryAddress
}) => {
  return (
    <div className='flexRow addressContainer' key={address._id}>
      <div>
        <input
          name='address'
          type='radio'
          onClick={() => handleAddressSelection(address)}
        />
      </div>
      {/* <div className={`flexRow sb addressinfo`} style={{ justifyContent: "space-between" }}>
            <div>
              <div>
                <span> {address.name} </span>
                <span> {address.addressType} </span>
                <span> {address.mobileNumber} </span>
              </div>
              <div>
                <span>{`${address.buildingAndStreet} ${address.cityTown} ${address.locality} ${address.cityTown} ${address.state} ${address.pincode}`}</span>
              </div>
              {
                address.selected && <MaterialButton
                  title='DELIVERY HERE'
                  style={{ width: '250px' }}
                  onClick={() => confirmDeliveryAddress(address)}
                />
              }
            </div>
            {address.selected && <div>Edit</div>}
          </div> */}

      <div className="flexRow sb addressinfo">
        {!address.editable ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{address.name}</span>
                <span className="addressType">{address.addressType}</span>
                <span className="addressMobileNumber">{address.mobileNumber}</span>
              </div>
              {address.selected && (
                <Anchor
                  name="EDIT"
                  onClick={() => enableAddressEditForm(address)}
                  style={{
                    fontWeight: "500",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {address.buildingAndStreet} <br /> {`${address.state} - ${address.pincode}`}
            </div>
            {address.selected && (
              <MaterialButton
                title="DELIVERY HERE"
                onClick={() => confirmDeliveryAddress(address)}
                style={{
                  width: "200px",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={address}
            onCancel={() => { }}
          />
        )}
      </div>
    </div>
  )
}

export const Checkout: FC = () => {
  const { user, authenticated } = useSelector((state: IAppStore) => state.authReducer);
  const { shippingAddresses } = useSelector((state: IAppStore) => state.userReducer);
  const { cartItems } = useSelector((state: IAppStore) => state.cartReducer);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [messageApi, contextHolder] = message.useMessage();
  const [newAddress, setNewAddress] = useState(false);
  const [formattedAddresses, setFormattedAddresses] = useState<IFormattedAddress[]>([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<IFormattedAddress>();
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);

  const fetchUserAddresses = useCallback(async () => {
    try {
      await dispatch(_getUserAddresses()).unwrap();
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }, [dispatch]);

  const handleAddressSelection = (address: IFormattedAddress) => {
    const updatedAddresses = formattedAddresses.map((faddress) => faddress._id === address._id ?
      ({ ...faddress, selected: true, editable: false }) : ({ ...faddress, selected: false, editable: false }));
    setFormattedAddresses(updatedAddresses);
  }

  const confirmDeliveryAddress = (address: IFormattedAddress) => {
    setConfirmAddress(true);
    setSelectedAddress(address);
    setOrderSummary(true);
  }

  const onAddressSubmit = (address: IFormattedAddress) => {
    setConfirmAddress(true);
    setSelectedAddress(address);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (address: IFormattedAddress) => {
    const updatedAddress = formattedAddresses.map((adr) =>
      adr._id === address._id ? { ...adr, editable: true } : { ...adr, editable: false }
    );
    setFormattedAddresses(updatedAddress);
  };

  const onOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true)
  }

  const onOrderConfirm = () => {
    setConfirmOrder(true);
  }

  useEffect(() => {
    if (authenticated) {
      fetchUserAddresses();
    }
  }, [fetchUserAddresses, authenticated]);

  useEffect(() => {
    if (shippingAddresses && shippingAddresses.length) {
      const updatedAddreses = shippingAddresses.map((address) => ({ ...address, selected: false, editable: false }));
      setFormattedAddresses(updatedAddreses);
    }
  }, [shippingAddresses]);

  if (confirmOrder) {
    return (
      <Layout>
        <div>Thankyou, You order has been palced successfully</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='cartContainer' style={{ alignItems: 'flex-start' }}>
        <div className='checkoutContainer'>
          {/* check if user logged in or not */}
          <CheckoutSteps
            stepNumber='1'
            stepTitle='LOGIN'
            active={!authenticated}
            body={
              authenticated ? (
                <div className='loggedInId'>
                  <span style={{ fontWeight: 500 }}> {`${user.firstName} ${user.lastName}`} </span>
                  <span style={{ margin: '0 5px' }}> {user.email} </span>
                </div>
              ) : (
                <div>
                  <MaterialInput
                    label='Email'
                    value={""}
                    type='email'
                    onChange={() => { }}
                  />
                  <MaterialInput
                    label='Password'
                    value={""}
                    type='password'
                    onChange={() => { }}
                  />
                </div>
              )
            }
          />

          <CheckoutSteps
            stepNumber='2'
            stepTitle='DELIVERY ADDRESS'
            active={!confirmAddress && authenticated}
            body={
              <>
                {
                  confirmAddress ? (
                    <div className='stepCompleted'>
                      {`${selectedAddress?.name} - ${selectedAddress?.buildingAndStreet} ${selectedAddress?.cityTown} ${selectedAddress?.landmark} ${selectedAddress?.state} - ${selectedAddress?.pincode}`}
                    </div>
                  ) :
                    formattedAddresses.map((address, index) => (
                      <AddressStepBody
                        key={index}
                        address={address}
                        handleAddressSelection={handleAddressSelection}
                        confirmDeliveryAddress={confirmDeliveryAddress}
                        onAddressSubmit={onAddressSubmit}
                        enableAddressEditForm={enableAddressEditForm}
                      />
                    ))
                }
              </>
            }
          />

          {confirmAddress ? null :
            newAddress ? (
              <AddressForm
                initialData={{
                  ...initialUserState.shippingAddress,
                  selected: false,
                  editable: false
                }}
                onSubmitForm={() => { }}
                onCancel={() => { }}
              />
            ) : (
              <CheckoutSteps
                stepNumber='+'
                stepTitle='Add New Address'
                active={false}
                onClick={() => {
                  setNewAddress(!newAddress)
                }}
              />
            )}
          <CheckoutSteps
            stepNumber='3'
            stepTitle='ORDER SUMMERY'
            active={orderSummary}
            body={
              orderSummary ? <Cart
                onlyCartItem={true}
              /> : orderConfirmation ? (
                <div className='stepCompleted'>
                  {cartItems.length} Items
                </div>
              ) : null
            }
          />

          {orderSummary && (
            <Card
              styles={{ margin: '10px 0' }}
            >
              <div
                className='flexRow sb'
                style={{
                  justifyContent: "space-between",
                  padding: '10px 20px',
                  alignItems: "center"
                }}
              >
                <p>Order confirmation email will be sent to <strong>{user.email}</strong></p>
                <MaterialButton
                  title='CONTINUE'
                  bgColor='#fb641b'
                  textColor='white'
                  style={{ width: 200 }}
                  onClick={onOrderConfirmation}
                />
              </div>
            </Card>
          )}
          <CheckoutSteps
            stepNumber='4'
            stepTitle='PAYMENT OPTIONS'
            active={paymentOption}
            body={
              paymentOption && (
                <div className='stepCompleted' style={{ marginTop: 20 }}>
                  <div
                    className='flexRow'
                    style={{
                      alignItems: "center",
                      // padding: 20
                    }}
                  >
                    <input type="radio" name='paymentOption' value="cod" />
                    <div>Cash on Delivery</div>
                  </div>
                  <MaterialButton
                    title='CONFIRM ORDER'
                    bgColor='#fb641b'
                    textColor='white'
                    style={{
                      width: '200px',
                      marginTop: 20
                    }}
                    onClick={onOrderConfirm}
                  />
                </div>
              )
            }
          />
        </div>
        <PriceDetails
          totalItems={cartItems.reduce((qty, currentItem) => {
            return qty + currentItem.quantity;
          }, 0)}
          totalPrice={cartItems.reduce((price, currentItem) => {
            return price + currentItem.sellingPrice;
          }, 0)}
        />
      </div>
    </Layout>
  )
}