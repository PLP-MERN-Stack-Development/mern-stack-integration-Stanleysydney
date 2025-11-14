import { SignUp } from '@clerk/clerk-react'

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md">
        <SignUp routing="path" path="/register" signInUrl="/login" afterSignUpUrl="/" />
      </div>
    </div>
  )
}

export default Register