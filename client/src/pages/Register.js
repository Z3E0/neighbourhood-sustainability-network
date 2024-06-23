import React from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', data);
      console.log(res.data);
      const group = encodeURIComponent(res.data.group);
      localStorage.setItem('userGroup', group);
      localStorage.setItem('userId', res.data.user_id);
      localStorage.setItem('username', data.username);
      navigate(`/group-chat/${group}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  {...field}
                  placeholder="Username"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>}
              </div>
            )}
            rules={{ required: 'Username is required' }}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  {...field}
                  type="email"
                  placeholder="Email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
              </div>
            )}
            rules={{ required: 'Email is required' }}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  {...field}
                  type="password"
                  placeholder="Password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
              </div>
            )}
            rules={{ required: 'Password is required' }}
          />

          <Controller
            name="postal"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input
                  {...field}
                  type="text"
                  placeholder="542090"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.postal && <p className="text-red-600 text-sm mt-1">{errors.postal.message}</p>}
              </div>
            )}
            rules={{
              required: 'Postal code is required',
              pattern: { value: /^[0-9]{6}$/, message: 'Postal code must be 6 digits' }
            }}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-indigo-600 hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
