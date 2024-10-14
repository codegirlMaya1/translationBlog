import axios from 'axios';

export const fetchBlogs = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

export const createBlog = async (newBlog) => {
  const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', newBlog);
  return data;
};

export const updateBlog = async (updatedBlog) => {
  const { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${updatedBlog.id}`, updatedBlog);
  return data;
};

export const deleteBlog = async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
};
