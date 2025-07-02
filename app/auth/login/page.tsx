'use client';

import React from 'react';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import styles from '@/styles/auth/login.module.scss';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type FormData = {
  username: string;
  password: string;
};

const validation = {
  username: {
    required: 'Username is required',
    minLength: {
      value: 5,
      message: 'Username must be at least 5 characters',
    },
    pattern: {
      value: /^[a-zA-Z][a-zA-Z0-9._]*$/i,
      message: 'Structure is faild'
    }
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  },
}

export default function LoginPage() {
  const methods = useForm<FormData>();

  const router = useRouter()

  const onSubmit = (data: FormData) => {
    axios.get("https://randomuser.me/api/?results=1&nat=us")
      .then((res: any) => {
        const result = res.data.results[0]
        const user = {
          name: `${result.name.first} ${result.name.last}`,
          picture: result.picture.thumbnail,
          username: result.login.username,
          email: result.email,
          token: result.login.uuid,
        }
        localStorage.setItem('user', JSON.stringify(user))
        router.push('/dashboard')
      })
      .catch((err: any) => {
        console.error('Error fetching user:', err);
        alert('Failed to login');
      })
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2>LOGIN</h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <Input
              label="Username"
              type="text"
              name="username"
              validations={validation.username}
            />
            <Input
              label="Password"
              type="password"
              name='password'
              validations={validation.password}
            />
            <Button text="Login" type='submit' />
          </form>
          <span>
            Don't have an account?
            <Link href={"register"}>
              Register
            </Link>
          </span>
        </FormProvider>
      </div>
    </div>
  );
}