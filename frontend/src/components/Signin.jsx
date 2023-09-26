import React from 'react';

function SignIn() {
  const handleSignIn = (e) => {
    e.preventDefault();
    // Add your sign-in logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-6">Sign In</h2>
        <form onSubmit={handleSignIn}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Sign In Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Sign In
            </button>
          </div>

          {/* Sign Up Now Button */}
          <div>
            <p>
              Not registered yet?{' '}
              <a href="/signup" className="text-blue-500">Sign Up Now</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
