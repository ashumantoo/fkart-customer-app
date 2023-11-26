import {
  CreateOrderApiResponse,
  CreateUserAddressApiResponse,
  GetOrderApiResponse,
  GetOrdersApiResponse,
  GetUserAddressApiResponse,
  GetUserAddressesApiResponse,
  IOrderInput,
  IUserAddress
} from '../types/user-types';
import axios from '../utils/axios';

export default {
  addUserAddress: (data: IUserAddress) => axios.post<CreateUserAddressApiResponse>('/consumer/address', { address: data }),
  getUserAddresses: () => axios.get<GetUserAddressesApiResponse>('/consumer/address'),
  getUserAddress: (addressId: string) => axios.get<GetUserAddressApiResponse>(`/consumer/address/${addressId}`),
  updateUserAddress: (addressId: string, data: IUserAddress) => axios.put<GetUserAddressApiResponse>(`/consumer/address/${addressId}`, { address: data }),
  deleteUserAddress: (addressId: string) => axios.delete<GetUserAddressesApiResponse>(`/consumer/address/${addressId}`),

  createOrder: (data: IOrderInput) => axios.post<CreateOrderApiResponse>('/consumer/order', data),
  getOrders: () => axios.get<GetOrdersApiResponse>('/consumer/order'),
  getOrder: (orderId: string) => axios.get<GetOrderApiResponse>(`/consumer/order/${orderId}`),
}