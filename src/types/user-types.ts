import { IProduct } from "./product-types";

export interface IAuthState {
  user: IUser,
  token: string;
  authenticated: boolean;
}

export interface IUserState {
  shippingAddresses: IUserAddress[];
  shippingAddress: IUserAddress;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: Roles
  address: IAddress
}

export enum Roles {
  USER = "USER",
  ADMIN = "ADMIN"
}

export interface IAddress {
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string
}

//User Shipping addresses
// export interface IUserAddress {
//   addresses: IUserAddress[]
// }

export interface IOrderInput {
  address: string;
  totalAmount: number;
  items: IOrderItemInput[];
  paymentStatus: string;
}

export interface IOrderItemInput {
  product: string;
  payableAmount: number;
  purchaseQuantity: number;
}

export interface IOrder {
  _id: string;
  user: IUser;
  address: IUserAddress
  totalAmount: number;
  items: IOrderItem[];
}

export interface IOrderItem {
  product: IProduct;
  payableAmount: number;
  purchaseQuantity: number;
}

export interface IUserAddress {
  _id?: string;
  name: string;
  mobileNumber: string;
  pincode: string;
  locality: string;
  buildingAndStreet: string;
  cityTown: string;
  state: string;
  landmark: string;
  alternateMobile?: string
  addressType: UserAddressType
}

export interface IFormattedAddress extends IUserAddress {
  selected: boolean;
  editable: boolean;
}

export enum UserAddressType {
  HOME = 'HOME',
  WORK = 'WORK'
}

export type GetUserAddressesApiResponse = {
  success: boolean;
  addresses: IUserAddress[]
}

export type CreateUserAddressApiResponse = {
  success: boolean;
  addresses: IUserAddress[]
}

export type GetUserAddressApiResponse = {
  success: boolean;
  address: IUserAddress
}

export type CreateOrderApiResponse = {
  success: boolean;
  order: IOrder;
}

export enum statusEnum {
  PENDING = "PENDING",
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  DISPATCHED = 'DISPATCHED',
  DELIVERED = 'DELIVERED',
  REFUNDED = 'REFUNDED',
  COMPLETED = 'COMPLETED'
}

export enum AuthActionEnum {
  SIGNIN = "SIGNIN",
  SIGNUP = "SIGNUP"
}

export enum USER_ADDRESS_ACTION_ENUM {
  ADD_USER_ADDRESS = "ADD_USER_ADDRESS",
  GET_USER_ADDRESSES = "GET_USER_ADDRESSES",
  GET_USER_ADDRESS = "GET_USER_ADDRESS",
  UPDATE_USER_ADDRESS = "UPDATE_USER_ADDRESS",
  DELETE_USER_ADDRESS = "DELETE_USER_ADDRESS",
  CREATE_ORDER = "CREATE_ORDER"
}