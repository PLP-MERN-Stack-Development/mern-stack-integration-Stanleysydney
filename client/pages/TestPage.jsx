import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const TestPage = () => {
  const { user, isLoaded } = useUser()
  const [apiStatus, setApiStatus] = useState('checking')
  const [dbStatus, setDbStatus] = useState('checking')

  useEffect(() => {
    checkAPI()
  }, [])

  const checkAPI = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/health')
      const data = await response.json()
      
      if (data.status === 'OK') {
        setApiStatus('connected')
        setDbStatus('connected')
      } else {
        setApiStatus('error')
      }
    } catch (error) {
      setApiStatus('error')
      setDbStatus('error')
    }
  }

  const StatusBadge = ({ status, label }) => {
    const config = {
      connected: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
      error: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
      checking: { icon: AlertCircle, color: 'text-blue-600', bg: 'bg-blue-50' }
    }[status]

    const Icon = config.icon

    return (
      <div className={`${config.bg} p-4 rounded-lg flex items-center gap-3`}>
        <Icon className={`h-6 w-6 ${config.color}`} />
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground capitalize">{status}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatusBadge status={apiStatus} label="API Server" />
            <StatusBadge status={dbStatus} label="MongoDB" />
            <StatusBadge status={isLoaded && user ? 'connected' : 'checking'} label="Clerk Auth" />
          </div>

          <Button onClick={checkAPI} className="w-full">
            Recheck Status
          </Button>
        </CardContent>
      </Card>

      {user && (
        <Alert>
          <AlertTitle>User Information</AlertTitle>
          <AlertDescription>
            <p>Name: {user.fullName}</p>
            <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default TestPage