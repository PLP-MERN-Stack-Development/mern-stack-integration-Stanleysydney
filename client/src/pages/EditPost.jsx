import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postsService, categoriesService } from '../services/api';
import PostForm from '../components/Posts/PostForm';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import toast from 'react-hot-toast';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [postData, categoriesData] = await Promise.all([
        postsService.getPost(id),
        categoriesService.getCategories()
      ]);
      setPost(postData.post);
      setCategories(categoriesData.categories);
    } catch (error) {
      toast.error('Failed to fetch post');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const data = await postsService.updatePost(id, formData);
      toast.success('Post updated successfully!');
      navigate(`/posts/${data.post._id}`);
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Post not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Post</h1>
        <p className="text-gray-600 mt-2">Update your story</p>
      </div>

      <PostForm
        initialData={post}
        categories={categories}
        onSubmit={handleSubmit}
        loading={submitting}
        submitButtonText="Update Post"
      />
    </div>
  );
};

export default EditPost;