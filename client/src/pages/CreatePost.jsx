import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { postsService, categoriesService } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Upload } from 'lucide-react'
import toast from 'react-hot-toast'

const CreatePost = () => {
  const navigate = useNavigate()
  const { user, isLoaded } = useUser()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    categories: [],
    tags: '',
    status: 'draft'
  })
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (!isLoaded || !user) {
      navigate('/login')
      return
    }
    fetchCategories()
  }, [isLoaded, user])

  const fetchCategories = async () => {
    try {
      const data = await categoriesService.getCategories()
      setCategories(data.categories)
    } catch (error) {
      toast.error('Failed to load categories')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('content', formData.content)
      formDataToSend.append('excerpt', formData.excerpt)
      formDataToSend.append('tags', formData.tags)
      formDataToSend.append('status', formData.status)
      
      formData.categories.forEach(cat => {
        formDataToSend.append('categories', cat)
      })

      if (image) {
        formDataToSend.append('featuredImage', image)
      }

      const data = await postsService.createPost(formDataToSend)
      toast.success('Post created successfully!')
      navigate(`/posts/${data.post._id}`)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter post title"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Featured Image</label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Content *</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your post content..."
                rows={10}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Excerpt</label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief summary..."
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Categories</label>
              <Select
                multiple
                value={formData.categories}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value)
                  setFormData({ ...formData, categories: selected })
                }}
                size="4"
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Tags</label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="tag1, tag2, tag3"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Select>
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Post'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreatePost
