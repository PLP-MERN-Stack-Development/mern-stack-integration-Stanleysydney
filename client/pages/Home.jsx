import { useState, useEffect } from 'react'
import { postsService, categoriesService } from '@/services/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import { Calendar, Eye, Search } from 'lucide-react'
import { formatDate, truncateText, stripHtml } from '@/lib/utils'
import toast from 'react-hot-toast'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    fetchData()
  }, [search, category])

  const fetchData = async () => {
    try {
      const [postsData, categoriesData] = await Promise.all([
        postsService.getPosts({ search, category }),
        categoriesService.getCategories()
      ])
      setPosts(postsData.posts)
      setCategories(categoriesData.categories)
    } catch (error) {
      toast.error('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg p-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to BlogApp</h1>
        <p className="text-xl opacity-90">Discover amazing stories and share your thoughts</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </Select>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="text-center py-12">Loading posts...</div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post._id} to={`/posts/${post._id}`}>
              <Card className="hover:shadow-lg transition-shadow h-full">
                {post.featuredImage && (
                  <img
                    src={`http://localhost:5000${post.featuredImage}`}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.categories?.map((cat) => (
                      <Badge key={cat._id} variant="secondary">{cat.name}</Badge>
                    ))}
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {truncateText(stripHtml(post.content), 120)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {post.views}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No posts found</p>
        </div>
      )}
    </div>
  )
}

export default Home