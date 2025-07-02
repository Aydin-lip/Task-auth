'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';
import styles from "@/styles/dashboard.module.scss"

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    picture: any;
    username: any;
    email: any;
    token: any;
  } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      router.push('/auth/login');
    } else {
      setUser(JSON.parse(stored));
    }
  }, [router]);

  if (!user) return null;

  const logoutHandler = () => {
    localStorage.removeItem('user')
    router.push('/auth/login');
  }

  return (
    <div className={styles.dashboard}>
      <h1>Welcome, {user.name} 🎉</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <Button text="Logout" style={{ marginTop: "auto", borderRadius: "0px" }} onClick={logoutHandler} />
    </div>
  );
}