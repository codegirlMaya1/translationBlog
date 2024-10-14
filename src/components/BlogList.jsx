import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BlogList = ({ blogs, setBlogs, searchTerm, language }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState({});

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
    const storedComments = JSON.parse(localStorage.getItem('comments')) || {};
    setComments(storedComments);
  }, [setBlogs]);

  const handleDelete = useCallback((id) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);
  }, [blogs, setBlogs]);

  const handleComment = (blog) => {
    setSelectedBlog(blog);
    setShow(true);
  };

  const handleSaveComment = () => {
    const updatedComments = {
      ...comments,
      [selectedBlog.id]: [...(comments[selectedBlog.id] || []), comment]
    };
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    setComments(updatedComments);
    setComment('');
    setShow(false);
  };

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [blogs, searchTerm]);

  return (
    <div>
      <div className="row">
        {filteredBlogs.map(blog => (
          <div className="col-md-6 mb-4" key={blog.id}>
            <Card>
              <Card.Body>
                <Card.Title>{t(blog.title)}</Card.Title>
                <Card.Text>{blog.body}</Card.Text>
                <Card.Footer>
                  <small className="text-muted">{t('Posted on')} {new Date(blog.timestamp).toLocaleString()}</small>
                </Card.Footer>
                <Button variant="danger" onClick={() => handleDelete(blog.id)}>{t('Delete')}</Button>
                <Button variant="secondary" className="ms-2" onClick={() => handleComment(blog)}>{t('Comment')}</Button>
                {comments[blog.id] && comments[blog.id].map((comment, index) => (
                  <div key={index} className="mt-2">
                    <Card.Text>{comment}</Card.Text>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </div>
        ))}
        <div className="col-md-6 mb-4">
          <Link to="/create">
            <Button variant="primary">{t('Add New Blog')}</Button>
          </Link>
        </div>
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Add Comment')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="comment">
              <Form.Label>{t('Comment')}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            {t('Close')}
          </Button>
          <Button variant="primary" onClick={handleSaveComment}>
            {t('Save Comment')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlogList;
