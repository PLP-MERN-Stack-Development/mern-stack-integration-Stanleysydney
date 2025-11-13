export default function TestPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold text-primary-600 mb-4">Tailwind + Auth Context Test</h1>
        <input type="email" placeholder="Email" className="input mb-3" />
        <input type="password" placeholder="Password" className="input mb-3" />
        <button className="btn btn-primary w-full">Login</button>
      </div>
    </div>
  );
}
