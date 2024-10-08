'use client';

import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormData, signUpSchema, TSignUpSchema } from '@/lib/types';

export const FormWithReactHookFormAndZodAndServer = () => {
  const {
    register,
    handleSubmit, // will default handle e.preventDefault();
    formState: { errors, isSubmitting },
    reset,
    setError,
    getValues,
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });
  // } = useForm<FormData>({ resolver: zodResolver(signUpSchema) });

  // You will not get any data from onSubmit call if the field doesn't pass validation
  // const onSubmit = async (data: FieldValues) => {
  // const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {  // <-- this also works.
  const onSubmit = async (data: TSignUpSchema) => {
    // TODO: submit to server
    // ...
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      /*      // To test server side error, the following will display error of: Expected string, received number
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        // confirmPassword: data.confirmPassword,
        confirmPassword: 7390147301857,
      }),*/
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      //response status is not 2xx
      alert('Submitting form failed!');
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;
      if (errors.email) {
        setError('email', { type: 'server', message: errors.email });
      } else if (errors.password) {
        setError('password', { type: 'server', message: errors.password });
      } else if (errors.confirmPassword) {
        setError('confirmPassword', {
          type: 'server',
          message: errors.confirmPassword,
        });
      }

      // You can also set error in the root level:
      // setError('root', {message: 'This is the root error'}}
      // And then in the template, you can do
      // {errors.root && (
      //   <p className='text-red-500'>{`${errors.root.message}`}</p>
      // )}
    }

    // Should enable reset for the real project.
    // reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-2'>
      <input
        {...register('email')}
        type='email'
        placeholder='Email'
        className='px-4 py-2 rounded'
      />
      {errors.email && (
        <p className='text-red-500'>{`${errors.email.message}`}</p>
      )}

      {/* Explain how you can do it for number field and date field. */}
      {/*<input*/}
      {/*  {...register('age', {valueAsNumber: true})}*/}
      {/*  type='number'*/}
      {/*  placeholder='Age'*/}
      {/*  className='px-4 py-2 rounded'*/}
      {/*/>*/}
      {/*<input*/}
      {/*  {...register('birthday', {valueAsDate: true})}*/}
      {/*  type='string'*/}
      {/*  placeholder='Birthday'*/}
      {/*  className='px-4 py-2 rounded'*/}
      {/*/>*/}

      <input
        {...register('password')}
        type='password'
        placeholder='Password'
        className='px-4 py-2 rounded'
      />
      {errors.password && (
        <p className='text-red-500'>{`${errors.password.message}`}</p>
      )}
      <input
        {...register('confirmPassword')}
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
