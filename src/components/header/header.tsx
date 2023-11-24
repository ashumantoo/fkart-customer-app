import React, { useState } from 'react'
import './header.css';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import { DropdownMenu, MaterialButton, MaterialInput, Modal } from '../UI';
import { useSelector, useDispatch } from 'react-redux';
import { IAppStore } from '../../store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { _signIn, _signUp, signout } from '../../slices/auth-slice';
import { message } from 'antd';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';
import { resetCartItems } from '../../slices/cart-slice';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state: IAppStore) => state.authReducer);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [messageApi, contextHolder] = message.useMessage();

  const userLogin = async () => {
    try {
      await dispatch(_signIn({
        email,
        password
      })).unwrap();
      messageApi.open({
        type: 'success',
        content: "Login success",
      });
      setLoginModal(false);
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }

  const userSignup = async () => {
    try {
      await dispatch(_signUp({
        firstName,
        lastName,
        email,
        mobile,
        password
      })).unwrap();
      messageApi.open({
        type: 'success',
        content: "Signup success. Please login now",
      });
      setLoginModal(false);
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }

  const userLogout = () => {
    dispatch(resetCartItems());
    dispatch(signout());
  }

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a className='username'>
            {auth.user ? `${auth.user.firstName} ${auth.user.lastName}` : ""}
          </a>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "Supercoin Zone", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "Coupons", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
          { label: "Notifications", href: "", icon: null },
          { label: "Logout", href: "", icon: null, onClick: userLogout },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className="loginButton"
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
          >
            Login
          </a>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              !auth.authenticated && setLoginModal(true)
            }
          },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span className='text-blue-500'>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{ color: "#2874f0" }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    );
  };

  return (
    <div className='header'>
      {contextHolder}
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <div className="loginInputContainer">
                {signup && (
                  <MaterialInput
                    type="text"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                )}

                <MaterialInput
                  type="text"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Mobile(Optional)"
                    value={mobile}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                )}
                <MaterialInput
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                // rightElement={<a href="#">Forgot?</a>}
                />
                <MaterialButton
                  title={signup ? "Register" : "Login"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    margin: "40px 0 20px 0",
                  }}
                  onClick={signup ? userSignup : userLogin}
                />
                <p style={{ textAlign: "center" }}>OR</p>
                <MaterialButton
                  title="Request OTP"
                  bgColor="#ffffff"
                  textColor="#2874f0"
                  style={{
                    margin: "20px 0",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className='header_container'>
        <div className='header_container_right'>
          <div
            className='logo'
            onClick={() => navigate('/')}
          >
            <img
              src={require('../../assets/images/fk-plus_3.png')}
              alt='flipkart logo'
            />
          </div>
          <div className='search_container'>
            <input
              className='search_input'
              placeholder='Search for products, branchs and more'
            />
            <div className='search_icon_container'>
              <IoIosSearch
                size={24}
                style={{
                  color: "#2874f0",
                }} />
            </div>
          </div>
        </div>
        <div className='header_container_left'>
          <div className='auth_container'>
            {auth.authenticated ? renderLoggedInMenu() : renderNonLoggedInMenu()}
          </div>
          <div className='seller_container'>
            <h1>Become a Seller</h1>
          </div>
          <div className='more_container'>
            <DropdownMenu
              menu={
                <a className="more">
                  <span>More</span>
                  <IoIosArrowDown />
                </a>
              }
              menus={[
                { label: "Notification Preference", href: "", icon: null },
                { label: "Sell on flipkart", href: "", icon: null },
                { label: "24x7 Customer Care", href: "", icon: null },
                { label: "Advertise", href: "", icon: null },
                { label: "Download App", href: "", icon: null },
              ]}
            />
          </div>
          <div className='cart_container'>
            <a href={`/cart`} className="cart">
              <IoIosCart />
              <span style={{ margin: "0 10px" }}>Cart</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}