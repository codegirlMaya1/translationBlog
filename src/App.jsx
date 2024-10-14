import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import CreateBlog from './components/CreateBlog';
import MyNavbar from './components/Navbar';
import Home from './pages/Home';
import './i18n'; 
import './App.css'; 

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('en');

  const handleBlogCreated = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
  };

  return (
    <Router>
      <MyNavbar setSearchTerm={setSearchTerm} setLanguage={setLanguage} />
      <Routes>
        <Route path="/" element={<Home blogs={blogs} />} />
        <Route path="/create" element={<CreateBlog onBlogCreated={handleBlogCreated} />} />
        <Route path="/blogs" element={<BlogList blogs={blogs} setBlogs={setBlogs} searchTerm={searchTerm} language={language} />} />
      </Routes>
    </Router>
  );
};

export default App;
