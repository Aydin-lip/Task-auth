'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) router.push('/dashboard');
  }, [router]);

  return children
}
