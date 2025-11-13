import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsService, categoriesService } from '../services/api';
import PostForm from '../components/Posts/PostForm';
import toast from 'react-hot-toast';

const CreatePost = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoriesService.getCategories();
      setCategories(data.categories);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const data = await postsService.createPost(formData);
      toast.success('Post created successfully!');
      navigate(`/posts/${data.post._id}`);
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <p className="text-gray-600 mt-2">Share your story with the world</p>
      </div>

      <PostForm
        categories={categories}
        onSubmit={handleSubmit}
        loading={loading}
        submitButtonText="Publish Post"
      />
    </div>
  );
};

export default CreatePost;