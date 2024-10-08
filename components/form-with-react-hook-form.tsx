'use client';

import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { type } from 'node:os';

export const FormWithReactHookForm = () => {
  const {
    register,
    handleSubmit, // will default handle e.preventDefault();
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  // Set default value:
  // type FormFields = {
  //   email: string;
  //   password: string;
  //   confirmPassword: string;
  // };
  // const {
  //   register,
  //   handleSubmit, // will default handle e.preventDefault();
  //   formState: { errors, isSubmitting },
  //   reset,
  //   getValues,
  // } = useForm<FormFields>({
  //   defaultValues: {
  //     email: 'test@email.com',
  //     password: '',
  //     confirmPassword: '',
  //   },
  // });

  // You will not get any data from onSubmit call if the field doesn't pass validation
  const onSubmit = async (data: FieldValues) => {
    // TODO: submit to server
    // ...
    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-2'>
      <input
        {...register('email', { required: 'Email is required' })}
        type='email'
        placeholder='Email'
        className='px-4 py-2 rounded'
      />
      {errors.email && (
        <p className='text-red-500'>{`${errors.email.message}`}</p>
      )}
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
      {errors.password && (
        <p className='text-red-500'>{`${errors.password.message}`}</p>
      )}
      <input
        {...register('confirmPassword', {
          required: 'Confirm password is required',
          // validate: (value) => {
          //   if (value !== 'password') {
          //     return 'Passwords must match';
          //   }
          //   return true;
          // },
          validate: (value) => value === 'password' || 'Passwords must match', // short cut, false || 'Password must match' => 'Password must match'
        })}
        type='password'
        placeholder='Confirm password'
        className='px-4 py-2 rounded'
      />
      {errors.confirmPassword && (
        <p className='text-red-500'>{`${errors.confirmPassword.message}`}</p>
      )}

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
