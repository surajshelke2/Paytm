import React from 'react';

const Signin = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="container max-auto max-w-96 px-4 mt-20 bg-white-100 p-5 flex flex-col border shadow-xl items-center">
        <h1 className="text-lg font-semibold py-2 font-Cambria">Sign In</h1>
        <p className="text-base mx-10 text-center text-gray-400">
          Enter your credentials to access your account
        </p>
        <form className="mt-4 flex flex-col">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 mb-1 text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="block w-full rounded-md border py-1.5 px-4 text-gray-900 border-gray-300 placeholder:text-gray-400 focus:ring-inset focus-indigo-600 sm:text-sm"
              placeholder="Email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 mb-1 text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full rounded-md border py-1.5 px-4 text-gray-900 border-gray-300 placeholder:text-gray-400 focus:ring-inset focus-indigo-600 sm:text-sm"
              placeholder="Password"
            />
          </div>

          <div className="mb-4 flex flex-col items-center">
            <button className="bg-black text-white p-2 rounded-md text-sm">
              Sign Up
            </button>
            <p className="font-medium mt-2">
              Don't have an account? <a href="#">Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
