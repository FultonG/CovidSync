import {baseRequest} from './index';

const jobs = {
  createPost: (data) => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    return baseRequest.post('/api/jobs/create', data, { headers: {'x-access-token': token}});
  },
  getAllJobs: () => {
    return baseRequest.get('/api/jobs/')
  },
  getJob: (id) => {
    return baseRequest.get(`/api/jobs/${id}`);
  },
  apply: (data) => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    return baseRequest.post('/api/jobs/apply', data, {header: {'x-access-token': token}})
  }
}

export default jobs;