import axios from '../utils/axios';

export default {
  signin: (data: object) => axios.post('/signin', data),
  signUp: (data: object) => axios.post('/signup', data)
}