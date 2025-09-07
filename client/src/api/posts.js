import axios from 'axios';

export const fetchPosts = (page = 1, limit = 10) =>
  axios.get(`/api/posts?limit=${limit}&page=${page}`).then(r => r.data);

export const createPost = (payload) => axios.post('/api/posts', payload).then(r => r.data);

export const likePost = (id) => axios.post(`/api/posts/${id}/like`).then(r => r.data);

export const commentPost = (id, text) => axios.post(`/api/posts/${id}/comment`, { text }).then(r => r.data);
