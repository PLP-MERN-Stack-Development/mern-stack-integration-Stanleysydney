import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md">
        <SignIn routing="path" path="/login" signUpUrl="/register" afterSignInUrl="/" />
      </div>
    </div>
  )
}