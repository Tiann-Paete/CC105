import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Import Eye and EyeOff icons

const Home = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await axios.post('http://localhost:8000/signin', { username, password });
      if (response.data.success) {
        router.push('/Pin'); // Redirect to the pin page
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:border dark:border-gray-700">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-4">
          Admin Panel Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4" action="#">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <div className="flex items-center">
              <input type={showPassword ? 'text' : 'password'} name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
              <button type="button" className="flex items-center px-3 text-gray-400" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full text-white bg-black hover:bg-gray-900 focus:ring focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-gray-900 dark:focus:ring-primary-800">Sign in</button>
        </form>
      </div>
    </section>
  );
};

export default Home;
