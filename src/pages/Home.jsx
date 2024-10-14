import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const Home = ({ blogs }) => {
  const [localBlogs, setLocalBlogs] = useState([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setLocalBlogs(storedBlogs);
  }, []);

  useEffect(() => {
    setLocalBlogs(blogs);
  }, [blogs]);

  return (
    <div className="container">
      <h1>Welcome to My Blog App</h1>
      <div className="row">
        {localBlogs.map(blog => (
          <div className="col-md-6 mb-4" key={blog.id}>
            <Card>
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>{blog.body}</Card.Text>
                <Card.Footer>
                  <small className="text-muted">Posted on {new Date(blog.timestamp).toLocaleString()}</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
