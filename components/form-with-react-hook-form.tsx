'use client';

import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

export const FormWithReactHookForm = () => {
  const {
    register,
    handleSubmit, // will default handle e.preventDefault();
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  // You will not get any data from onSubmit call if the field doesn't pass validation
  const onSubmit = async (data: FieldValues) => {
    // TODO: submit to server
    // ...
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-2'>
      <input
        {...register('email', { required: 'Email is required' })}
        type='email'
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
        placeholder='Password'
        className='px-4 py-2 rounded'
      />
      <input
        {...register('confirmPassword', {
          required: 'Confirm password is required',
        })}
        type='password'
        placeholder='Confirm password'
        className='px-4 py-2 rounded'
      />

      <button
        disabled={isSubmitting}
        type='submit'
        className='bg-blue-500 disabled:bg-gray-500 py-2 rounded'
      >
        Submit
      </button>
    </form>
  );
};
