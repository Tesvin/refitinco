import { useSelector } from 'react-redux';
import { useState } from 'react';
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signOutUserStart,
  } from '../redux/user/userSlice';
  import { useDispatch } from 'react-redux';
  import { Link } from 'react-router-dom';  

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_API_URL;
    try {
      dispatch(updateUserStart());
      const res = await fetch(`${url}/api/user/update/${currentUser.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  

  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
    
    <input
        type='text'
        placeholder='firstname'
        defaultValue={currentUser.firstname}
        id='firstname'
        className='border p-3 rounded-lg'
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='lastname'
        defaultValue={currentUser.lastname}
        id='lastname'
        className='border p-3 rounded-lg'
        onChange={handleChange}
      />
      <input
        type='email'
        placeholder='email'
        id='email'
        defaultValue={currentUser.email}
        className='border p-3 rounded-lg'
        onChange={handleChange}
      />
      <input
        type='password'
        placeholder='password'
        onChange={handleChange}
        id='password'
        className='border p-3 rounded-lg'
      />
      <button
        disabled={loading}
        className='bg-green-800 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
      >
        {loading ? 'Loading...' : 'Update'}
      </button>
    
    </form>
    <div className='flex justify-between mt-5'>
      <span
        onClick={handleDeleteUser}
        className='text-red-700 cursor-pointer'
      >
        Delete account
      </span>
      <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
        Sign out
      </span>
    </div>

    <p className='text-red-700 mt-5'>{error ? error : ''}</p>
    <p className='text-white mt-5'>
      {updateSuccess ? 'User is updated successfully!' : ''}
    </p>
    
    </div>
  )
}
