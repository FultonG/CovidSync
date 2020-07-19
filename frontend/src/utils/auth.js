import {baseRequest} from './index';

const auth = {
  createAccount: (data) => {
    return baseRequest.post('/api/auth/create', data);
  },
  authenticateAccount: (data) => {
    return baseRequest.post('/api/auth/login', data)
  }
}

export default auth;