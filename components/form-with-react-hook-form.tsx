'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const FormWithReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  return (
    <form className='flex flex-col gap-y-2'>
      <input
        {...register('email', { required: 'Email is required' })}
        type='email'
        required
        placeholder='Email'
        className='px-4 py-2 rounded'
      />
      <input
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 10,
            message: 'Password must be at least 10 characters',
          },
        })}
        type='password'
        required
        placeholder='Password'
        className='px-4 py-2 rounded'
      />
      <input
        {...register('confirmPassword', {
          required: 'Confirm password is required',
        })}
        type='password'
        required
        placeholder='Confirm password'
        className='px-4 py-2 rounded'
      />

      <button
        type='submit'
        className='bg-blue-500 disabled:bg-gray-500 py-2 rounded'
      >
        Submit
      </button>
    </form>
  );
};
