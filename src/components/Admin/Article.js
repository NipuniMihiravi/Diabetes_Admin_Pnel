import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirection
import './App.css';

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    category: '',
    topic: '',
    description: '',
    link: '',
    image: null,
  });
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isEditing, setIsEditing] = useState(false);
   const [user, setUser] = useState(null); // Store session user

  const navigate = useNavigate(); // For redirecting

    useEffect(() => {
      const loggedInUser = sessionStorage.getItem("user");
      if (!loggedInUser) {
        navigate("/adminlogin"); // Redirect to login if not authenticated
      } else {
        setUser(JSON.parse(loggedInUser)); // Set user details from session
      }
      fetchArticles();
    }, [categoryFilter]);


  const fetchArticles = () => {
    axios
      .get('/api/articles')
      .then((response) => {
        if (categoryFilter) {
          setArticles(response.data.filter((article) => article.category === categoryFilter));
        } else {
          setArticles(response.data);
        }
      })
      .catch((error) => console.error('Error fetching articles:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleAdd = () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    axios
      .post('/api/articles', data)
      .then(() => {
        fetchArticles();
        resetForm();
      })
      .catch((error) => console.error('Error adding article:', error));
  };

  const handleEdit = (article) => {
    setFormData({
      id: article.id,
      category: article.category,
      topic: article.topic,
      description: article.description,
      link: article.link,
      image: null,
    });
    setIsEditing(true);
  };

  const handleUpdate = () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== 'image' || formData[key]) {
        data.append(key, formData[key]);
      }
    });

    axios
      .put(`/api/articles/${formData.id}`, data)
      .then(() => {
        fetchArticles();
        resetForm();
      })
      .catch((error) => console.error('Error updating article:', error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/articles/${id}`)
      .then(() => fetchArticles())
      .catch((error) => console.error('Error deleting article:', error));
  };

  const resetForm = () => {
    setFormData({
      id: '',
      category: '',
      topic: '',
      description: '',
      link: '',
      image: null,
    });
    setIsEditing(false);
  };

  return (
    <div className="article-panel">
      <div className="article-form">
        <h1>Article Writer</h1>

        <div className="form">
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="About Type 2 Diabetes">About Type 2 Diabetes</option>
            <option value="Relationship between Meal and Exercise">Relationship between Meal and Exercise</option>
            <option value="Meal Guideline">Meal Guideline</option>
            <option value="Exercise Guideline">Exercise Guideline</option>
          </select>

          <input
            type="text"
            name="topic"
            placeholder="Topic"
            value={formData.topic}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="link"
            placeholder="Link"
            value={formData.link}
            onChange={handleInputChange}
          />
          <input type="file" name="image" onChange={handleImageChange} />

          {isEditing ? (
            <button onClick={handleUpdate}>Update Article</button>
          ) : (
            <button onClick={handleAdd}>Add Article</button>
          )}

          {isEditing && <button onClick={resetForm}>Cancel Edit</button>}
        </div>
      </div>

      <div className="category-filter">
        <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
          <option value="">Filter by Category</option>
          <option value="About Type 2 Diabetes">About Type 2 Diabetes</option>
          <option value="Relationship between Meal and Exercise">Relationship between Meal and Exercise</option>
          <option value="Meal Guideline">Meal Guideline</option>
          <option value="Exercise Guideline">Exercise Guideline</option>
        </select>
      </div>

      <div className="articles">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Topic</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>{article.category}</td>
                <td>{article.topic}</td>
                <td>{article.description}</td>
                <td>
                <div className="article-actions">
                  <button onClick={() => handleEdit(article)}>Edit</button>
                  <button onClick={() => handleDelete(article.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Article;
