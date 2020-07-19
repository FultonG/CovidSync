import axios from 'axios';

export async function get(endpoint) {
  try {
    const res = await axios.get(`http://localhost:8080${endpoint}`);
    if (res.statusText !== 'OK') {
      throw new Error(`GET request to ${endpoint} failed`);
    }
    return res.data;
  } catch (e) {
    return {};
  }
}

export async function post(endpoint, body = {}, options = {}) {
  try {
    const res = await axios.post(`http://localhost:8080${endpoint}`, body, options);
    if (res.statusText !== 'OK') {
      throw new Error(`POST request to ${endpoint} failed`);
    }
    return res.data;
  } catch (e) {
    return {error: e.message};
  }
}
