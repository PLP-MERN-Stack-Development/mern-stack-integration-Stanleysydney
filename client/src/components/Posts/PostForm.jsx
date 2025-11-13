import { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Upload, X } from 'lucide-react';

const PostForm = ({
  initialData = null,
  categories = [],
  onSubmit,
  loading = false,
  submitButtonText = 'Submit'
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    categories: initialData?.categories?.map(c => c._id) || [],
    tags: initialData?.tags?.join(', ') || '',
    status: initialData?.status || 'draft'
  });

  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    initialData?.featuredImage ? `http://localhost:5000${initialData.featuredImage}` : null
  );
  const fileInputRef = useRef(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, categories: options });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFeaturedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!formData.content.trim()) {
      alert('Please enter content');
      return;
    }

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('content', formData.content);
    submitData.append('excerpt', formData.excerpt);
    submitData.append('status', formData.status);
    submitData.append('tags', formData.tags);

    formData.categories.forEach(categoryId => {
      submitData.append('categories', categoryId);
    });

    if (featuredImage) {
      submitData.append('featuredImage', featuredImage);
    }

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-lg p-8">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input"
          placeholder="Enter post title"
          required
        />
      </div>

      {/* Featured Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Featured Image
        </label>
        
        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 transition"
          >
            <Upload className="mx-auto mb-2 text-gray-400" size={48} />
            <p className="text-gray-600">Click to upload image</p>
            <p className="text-sm text-gray-500 mt-1">Max size: 5MB</p>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Content Editor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content *
        </label>
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
          modules={modules}
          placeholder="Write your post content..."
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Excerpt
        </label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows="3"
          className="input resize-none"
          placeholder="Brief summary of your post (optional)"
        />
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categories
        </label>
        <select
          multiple
          value={formData.categories}
          onChange={handleCategoryChange}
          className="input"
          size="4"
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="input"
          placeholder="tag1, tag2, tag3"
        />
        <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="input"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="btn btn-secondary"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Saving...' : submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default PostForm;