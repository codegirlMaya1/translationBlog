import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const updateBlog = async (updatedBlog) => {
  const { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${updatedBlog.id}`, updatedBlog);
  return data;
};

const UpdateBlog = ({ blog }) => {
  const [title, setTitle] = useState(blog.title);
  const [body, setBody] = useState(blog.body);
  const queryClient = useQueryClient();
  const mutation = useMutation(updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ ...blog, title, body });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">{t('Title')}</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">{t('Body')}</label>
        <textarea
          className="form-control"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">{t('Update Blog')}</button>
    </form>
  );
};

export default UpdateBlog;
