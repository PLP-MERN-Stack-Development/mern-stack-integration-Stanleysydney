import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { postsService } from '@/services/api'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, Eye, Edit, Trash2, User } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useUser()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      const data = await postsService.getPost(id)
      setPost(data.post)
    } catch (error) {
      toast.error('Failed to load post')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsService.deletePost(id)
        toast.success('Post deleted successfully')
        navigate('/')
      } catch (error) {
        toast.error('Failed to delete post')
      }
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (!post) return <div className="text-center py-12">Post not found</div>

  const isAuthor = user && post.author._id === user.id

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        {post.featuredImage && (
          <img
            src={`http://localhost:5000${post.featuredImage}`}
            alt={post.title}
            className="w-full h-96 object-cover rounded-t-lg"
          />
        )}
        
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories?.map((cat) => (
              <Badge key={cat._id}>{cat.name}</Badge>
            ))}
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author.name}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.createdAt)}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {post.views} views
              </div>
            </div>

            {isAuthor && (
              <div className="flex gap-2">
                <Link to={`/edit-post/${post._id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <Separator className="mb-6" />
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline">#{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default PostDetail