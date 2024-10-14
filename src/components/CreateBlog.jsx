import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CreateBlog = ({ onBlogCreated }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = { id: Date.now(), title, body, timestamp: new Date() };
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    localStorage.setItem('blogs', JSON.stringify([newBlog, ...blogs]));
    onBlogCreated(newBlog);
    setTitle('');
    setBody('');
    navigate('/blogs');
  };

  return (
    <div className="container">
      <h2>{t('Create Blog')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">{t('Title')}</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">{t('Content')}</label>
          <textarea className="form-control" id="body" rows="3" value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">{t('Post Blog')}</button>
      </form>
    </div>
  );
};

export default CreateBlog;
